import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';
import emailjs from '@emailjs/browser';

export interface ContributionData {
  polygonId: number;
  districtId: number;
  title: string;
  type: string;
  tenure: string;
  yearOfReview: string;
  reviewBy: string;
  content: string;
  images: File[];
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
  const allText = Object.values(data).join(' ');
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

  if (!VALIDATION_PATTERNS.content.test(data.content)) {
    console.warn('Invalid content');
    return false;
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

export const submitContribution = async (data: ContributionData): Promise<boolean> => {
  const { images, ...textData } = data;

  // Sanitize reviewBy
  const sanitizedReviewBy = sanitizeReviewBy(data.reviewBy);
  const sanitizedTextData = { ...textData, reviewBy: sanitizedReviewBy };

  // Validate text data
  if (!validateContribution(sanitizedTextData)) {
    // Silently fail - don't tell malicious actors
    return true; // Return true to show "success" message
  }

  try {
    // Upload images to Firebase Storage
    const imageUrls: string[] = [];
    for (const image of images) {
      const timestamp = Date.now();
      const sanitizedName = image.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storagePath = `contributions/${data.districtId}/${timestamp}_${sanitizedName}`;
      const storageRef = ref(storage, storagePath);
      
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }

    // Build content with images
    let content = '';
    imageUrls.forEach(url => {
      content += `<img src="${url}" style="width:85%; height:auto;" />\n`;
    });
    content += data.content;

    // Save to Firestore writeups collection with isActive: false
    await addDoc(collection(db, 'writeups'), {
      id: data.polygonId,
      districtId: data.districtId,
      title: data.title,
      type: data.type,
      tenure: data.tenure,
      yearOfReview: data.yearOfReview,
      reviewBy: sanitizedReviewBy, // Use sanitized name
      content: content,
      isActive: false, // Requires manual approval
      createdAt: Timestamp.now(),
    });

    // Send email notification
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: 'taypanghing@gmail.com',
          title: data.title,
          type: data.type,
          tenure: data.tenure,
          yearOfReview: data.yearOfReview,
          reviewBy: sanitizedReviewBy, // Use sanitized name
          content: data.content.substring(0, 1000),
          districtId: data.districtId,
          polygonId: data.polygonId,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    } catch (emailError) {
      console.error('Email failed:', emailError);
      // Continue even if email fails
    }

    return true;
  } catch (error) {
    console.error('Failed to submit contribution:', error);
    return false;
  }
};
