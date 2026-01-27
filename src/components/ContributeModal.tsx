import React, { useState } from 'react';
import { submitContribution, ContributionData } from '../firebase/contributionService';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  polygonId: number;
  districtId: number;
  polygonName: string;
  onSuccess: () => void;
}

interface SectionData {
  text: string;
  images: File[];
}

const ContributeModal: React.FC<ContributeModalProps> = ({
  isOpen,
  onClose,
  polygonId,
  districtId,
  polygonName,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    type: '',
    tenure: '',
    yearOfReview: new Date().getFullYear().toString(),
    reviewBy: '',
  });
  
  const [sections, setSections] = useState<{
    introduction: SectionData;
    vibesAmenities: SectionData;
    livabilityCosts: SectionData;
  }>({
    introduction: { text: '', images: [] },
    vibesAmenities: { text: '', images: [] },
    livabilityCosts: { text: '', images: [] },
  });
  
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionTextChange = (section: keyof typeof sections, value: string) => {
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], text: value },
    }));
  };

  const handleSectionImageChange = (section: keyof typeof sections, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      // Limit to 2 images per section, max 5MB each
      const validFiles = fileArray.filter(file => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large. Max size is 5MB.`);
          return false;
        }
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} is not an image.`);
          return false;
        }
        return true;
      }).slice(0, 2);
      
      setSections(prev => ({
        ...prev,
        [section]: { ...prev[section], images: validFiles },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Collect all images with their section info for proper naming/ordering
    const allImages: File[] = [
      ...sections.introduction.images,
      ...sections.vibesAmenities.images,
      ...sections.livabilityCosts.images,
    ];

    // Build the content structure with section headers
    const sectionConfig = [
      { key: 'introduction' as const, title: 'Introduction', data: sections.introduction },
      { key: 'vibesAmenities' as const, title: 'Vibes & Amenities', data: sections.vibesAmenities },
      { key: 'livabilityCosts' as const, title: 'Livability & Costs', data: sections.livabilityCosts },
    ];

    const contributionData: ContributionData = {
      polygonId,
      districtId,
      title: polygonName,
      ...formData,
      images: allImages,
      sections: sectionConfig.map(({ title, data }) => ({
        title,
        text: data.text,
        imageCount: data.images.length,
      })),
    };

    await submitContribution(contributionData);
    
    setSubmitting(false);
    onSuccess();
    onClose();
    
    // Reset form
    setFormData({
      type: '',
      tenure: '',
      yearOfReview: new Date().getFullYear().toString(),
      reviewBy: '',
    });
    setSections({
      introduction: { text: '', images: [] },
      vibesAmenities: { text: '', images: [] },
      livabilityCosts: { text: '', images: [] },
    });
  };

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    textAlign: 'left',
  };

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    textAlign: 'left',
  };

  const renderSection = (
    sectionKey: keyof typeof sections,
    title: string,
    placeholder: string
  ) => (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={sectionHeaderStyle}>{title}</h3>
      
      <label style={labelStyle}>{title} Content *</label>
      <textarea
        value={sections[sectionKey].text}
        onChange={(e) => handleSectionTextChange(sectionKey, e.target.value)}
        style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
        required
        maxLength={2000}
        placeholder={placeholder}
      />

      <label style={labelStyle}>Images for {title} (max 2, up to 5MB each)</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleSectionImageChange(sectionKey, e)}
        style={{ ...inputStyle, padding: '8px' }}
      />
      {sections[sectionKey].images.length > 0 && (
        <p style={{ fontSize: '12px', color: '#666', marginTop: '-10px' }}>
          {sections[sectionKey].images.length} image(s) selected
        </p>
      )}
    </div>
  );

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1500,
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          maxWidth: '600px',
          maxHeight: '90vh',
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          zIndex: 1600,
          overflow: 'auto',
          color: 'black',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          &times;
        </button>

        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Contribute Review</h2>
        <p style={{ marginBottom: '20px', textAlign: 'center', color: '#666' }}>
          For: {polygonName}
        </p>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            style={inputStyle}
            required
          >
            <option value="">Select type...</option>
            <option value="Condominium">Condominium</option>
            <option value="HDB">HDB</option>
            <option value="Landed">Landed</option>
            <option value="Mixed Development">Mixed Development</option>
            <option value="Shophouse">Shophouse</option>
            <option value="Commercial">Commercial</option>
          </select>

          <label style={labelStyle}>Tenure *</label>
          <input
            type="text"
            name="tenure"
            value={formData.tenure}
            onChange={handleInputChange}
            style={inputStyle}
            required
            maxLength={50}
            placeholder="e.g., Freehold, 99 Years from 2020"
          />

          <label style={labelStyle}>Year of Review *</label>
          <input
            type="text"
            name="yearOfReview"
            value={formData.yearOfReview}
            onChange={handleInputChange}
            style={inputStyle}
            required
            maxLength={4}
            pattern="[0-9]{4}"
            placeholder="e.g., 2025"
          />

          <label style={labelStyle}>Your Name *</label>
          <input
            type="text"
            name="reviewBy"
            value={formData.reviewBy}
            onChange={handleInputChange}
            style={inputStyle}
            required
            maxLength={50}
            placeholder="Your name"
          />

          <hr style={{ margin: '25px 0', border: 'none', borderTop: '2px solid #eee' }} />

          {renderSection(
            'introduction',
            'Introduction',
            'Introduce the property - location, overview, first impressions...'
          )}

          {renderSection(
            'vibesAmenities',
            'Vibes & Amenities',
            'Describe the atmosphere, nearby amenities, facilities...'
          )}

          {renderSection(
            'livabilityCosts',
            'Livability & Costs',
            'Share about living experience, maintenance fees, value for money...'
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: submitting ? '#ccc' : '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              marginTop: '10px',
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ContributeModal;
