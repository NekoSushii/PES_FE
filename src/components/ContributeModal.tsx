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
    content: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      // Limit to 5 images, max 5MB each
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
      }).slice(0, 5);
      setImages(validFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const contributionData: ContributionData = {
      polygonId,
      districtId,
      title: polygonName, // Use polygon name as title
      ...formData,
      images,
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
      content: '',
    });
    setImages([]);
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
          maxWidth: '500px',
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

          <label style={labelStyle}>Review Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
            required
            maxLength={5000}
            placeholder="Share your thoughts about this property..."
          />

          <label style={labelStyle}>Images (max 5, up to 5MB each)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ ...inputStyle, padding: '8px' }}
          />
          {images.length > 0 && (
            <p style={{ fontSize: '12px', color: '#666', marginTop: '-10px' }}>
              {images.length} image(s) selected
            </p>
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
