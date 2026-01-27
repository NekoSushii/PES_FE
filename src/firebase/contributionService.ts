import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

export interface SectionInfo {
  title: string;
  text: string;
  imageCount: number;
}

export interface ContributionData {
  polygonId: number;
  districtId: number;
  title: string;
  type: string;
  tenure: string;
  yearOfReview: string;
  reviewBy: string;
  images: File[];
  sections: SectionInfo[];
}

// Validation regex patterns
const VALIDATION_PATTERNS = {
  // Alphanumeric with spaces, hyphens, apostrophes, @, and common punctuation
  title: /^[a-zA-Z0-9\s\-'@.,()&]+$/,
  // Property types
  type: /^[a-zA-Z\s-]+$/,
  // Tenure format (e.g., "Freehold", "99 Years from 2020", "Leasehold - 99 years")
  tenure: /^[a-zA-Z0-9\s-]+$/,
  // Year format (4 digits)
  yearOfReview: /^[0-9]{4}$/,
  // Name with letters, spaces, and common characters
  reviewBy: /^[a-zA-Z\s\-'.]+$/,
  // Content - more permissive but no script tags or dangerous patterns
  content: /^(?!.*<script)(?!.*javascript:)(?!.*on\w+=)[^]*$/i,
};

// Dangerous patterns to block
const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /eval\s*\(/gi,
  /expression\s*\(/gi,
];

export const validateContribution = (data: Omit<ContributionData, 'images' | 'polygonId' | 'districtId'>): boolean => {
  // Check for dangerous patterns in all fields
  const allText = [
    data.title,
    data.type,
    data.tenure,
    data.yearOfReview,
    data.reviewBy,
    ...data.sections.map(s => s.text),
  ].join(' ');
  
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(allText)) {
      console.warn('Dangerous pattern detected');
      return false;
    }
  }

  // Validate each field
  if (!VALIDATION_PATTERNS.title.test(data.title) || data.title.length < 2 || data.title.length > 100) {
    console.warn('Invalid title');
    return false;
  }

  if (!VALIDATION_PATTERNS.type.test(data.type) || data.type.length < 2 || data.type.length > 50) {
    console.warn('Invalid type');
    return false;
  }

  if (!VALIDATION_PATTERNS.tenure.test(data.tenure) || data.tenure.length < 2 || data.tenure.length > 50) {
    console.warn('Invalid tenure');
    return false;
  }

  if (!VALIDATION_PATTERNS.yearOfReview.test(data.yearOfReview)) {
    console.warn('Invalid year');
    return false;
  }

  if (!VALIDATION_PATTERNS.reviewBy.test(data.reviewBy) || data.reviewBy.length < 2 || data.reviewBy.length > 50) {
    console.warn('Invalid reviewer name');
    return false;
  }

  // Validate section texts
  for (const section of data.sections) {
    if (!VALIDATION_PATTERNS.content.test(section.text)) {
      console.warn(`Invalid content in section: ${section.title}`);
      return false;
    }
  }

  return true;
};

// Sanitize reviewBy field
const sanitizeReviewBy = (name: string): string => {
  if (name.toLowerCase().includes('admin')) {
    return 'Anonymous';
  }
  return name;
};

export const submitContribution = async (data: ContributionData): Promise<void> => {
  try {
    const imageUrls: string[] = [];
    
    // Upload all images to Firebase Storage
    for (let i = 0; i < data.images.length; i++) {
      const file = data.images[i];
      const fileName = `contributions/${data.districtId}/${data.polygonId}_${Date.now()}_${i}.${file.name.split('.').pop()}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }

    // Build HTML content with sections and images
    let content = '';
    let imageIndex = 0;
    
    for (const section of data.sections) {
      content += `<h2>${section.title}</h2>`;
      content += `<p>${section.text.replace(/\n/g, '<br/>')}</p>`;
      
      // Add images for this section
      for (let i = 0; i < section.imageCount; i++) {
        if (imageIndex < imageUrls.length) {
          content += `<img src="${imageUrls[imageIndex]}" style="width:85%; height:auto; margin: 10px 0;" />`;
          imageIndex++;
        }
      }
    }

    // Save to Firestore
    await addDoc(collection(db, 'writeups'), {
      id: data.polygonId,
      districtId: data.districtId,
      title: data.title,
      type: data.type,
      tenure: data.tenure,
      yearOfReview: data.yearOfReview,
      reviewBy: sanitizeReviewBy(data.reviewBy),
      content: content,
      isActive: false,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error submitting contribution:', error);
    throw error;
  }
};
