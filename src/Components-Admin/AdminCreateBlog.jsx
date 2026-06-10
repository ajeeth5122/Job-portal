import React, { useState } from 'react';
import './AdminCreateBlog.css';
import { AdminHeader } from './AdminHeader';
import { useJobs } from '../JobContext';
 
// const initialCategories = [
//   { id: 'featured', label: 'Featured Blogs' },
//   { id: 'careers', label: 'Careers' },
//   { id: 'tech', label: 'Technology Blogs' }
// ];


 
export const AdminCreateBlog = ({ setmode }) => {

  const { publishedBlogs, setPublishedBlogs } = useJobs();

  const initialCategories = Object.keys(publishedBlogs).map((catName) => ({
  id: catName,
  label: catName
  }));
  
  const [categories, setCategories] = useState(initialCategories);
 
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  
 
  const [formData, setFormData] = useState({
    blogTitle: '',
    blogDescription: '',
    selectedCategory: '',
    thumbnail: null,
    previewUrl: '',
    modalHeading: '',
    modalDescription: ''
  });
 
  const [pointsList, setPointsList] = useState([]);
 
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };
 
  const openModal = () => setIsModalOpen(true);
 
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData((prev) => ({
      ...prev,
      modalHeading: '',
      modalDescription: ''
    }));
  };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        previewUrl: URL.createObjectURL(file)
      }));
    }
  };
 
  const handleSavePoints = (e) => {
    e.preventDefault();
    const { modalHeading, modalDescription } = formData;
 
    if (modalHeading.trim() !== '' && modalDescription.trim() !== '') {
      const bulletPoints = modalDescription
        .split('\n')
        .filter(item => item.trim() !== '');
 
      const newPoint = {
        title: modalHeading.trim(),
        content: bulletPoints
      };
 
      setPointsList([...pointsList, newPoint]);
      closeModal();
    }
  };
 
  const handleDeletePoint = (indexToRemove) => {
    setPointsList(pointsList.filter((_, index) => index !== indexToRemove));
  };
 
  const handleAddNewCategory = () => {
    const formattedName = newCategoryName.trim();
    if (formattedName !== '') {
      const isDuplicate = categories.some(
        (cat) => cat.label.toLowerCase() === formattedName.toLowerCase()
      );
 
      if (isDuplicate) {
        alert("This category name already exists! Please choose a different name.");
        return;
      }
 
      setCategories([
        ...categories,
        { id: Date.now().toString(), label: formattedName }
      ]);
      setNewCategoryName('');
      setIsAdding(false);
    }
  };
 
  // const handleSaveDraft = () => {
  //   const { selectedCategory, blogTitle, blogDescription, previewUrl } = formData;
  //   const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
 
  //   const fullCategoryName = selectedCategoryObj ? selectedCategoryObj.label : "Unknown";
 
  //   const options = {month: "short", day: "2-digit", year: "numeric"};
  //   const formattedDate = new Date().toLocaleDateString("en-US", options).replace(/,/g, "");
 
  //   setPublishedBlogs((prevStorage) => {
  //     const existingCategoryBlogs = prevStorage[fullCategoryName] || [];
  //     const nextId = `cat-${existingCategoryBlogs.length + 1}`;
 
  //     const draftBlog = {
  //       id: nextId,
  //       title: blogTitle.trim(),
  //       Thumbnail: previewUrl,
  //       date: formattedDate,
  //       desc: blogDescription.trim(),
  //       points: pointsList,
  //       Status: "Draft"
  //     };
  //     return {
  //       ...prevStorage,
  //       [fullCategoryName]: [...existingCategoryBlogs,draftBlog]
  //     };
  //   });
  //   alert("Draft saved successfully!");
  // };
 

  const handleSaveDraft = () => {
    const { selectedCategory, blogTitle, blogDescription, previewUrl } = formData;

    const hasCategory = selectedCategory !== '';
    const hasTitle = blogTitle.trim() !== '';
    const hasDesc = blogDescription.trim() !== '';
    const hasThumbnail = previewUrl !== '';
    const hasPoints = pointsList.length > 0;

    const isAnyFieldFilled = hasCategory || hasTitle || hasDesc || hasThumbnail || hasPoints;

    if (!isAnyFieldFilled) {
      alert("No content filled to save as a draft!.");
      setmode('list'); 
      return;
    }

    const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
    const fullCategoryName = selectedCategoryObj ? selectedCategoryObj.label : "Unknown";

    const options = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = new Date().toLocaleDateString("en-US", options).replace(/,/g, "");

    setPublishedBlogs((prevStorage) => {
      const existingCategoryBlogs = prevStorage[fullCategoryName] || [];
      const nextId = `cat-${existingCategoryBlogs.length + 1}`;

      const draftBlog = {
        id: nextId,
        title: blogTitle.trim(),
        Thumbnail: previewUrl,
        date: formattedDate,
        desc: blogDescription.trim(),
        points: pointsList,
        Status: "Draft"
      };
      return {
        ...prevStorage,
        [fullCategoryName]: [...existingCategoryBlogs, draftBlog]
      };
    });

    alert("Draft saved successfully!");
    setmode('list');
  };
  const handlePublishPost = () => {
    const { selectedCategory, blogTitle, blogDescription, previewUrl } = formData;
 
    if (!selectedCategory) {
      alert("Please select a category first before publishing!");
      return;
    }
    if (!blogTitle.trim() || !blogDescription.trim()) {
      alert("Blog title and description are mandatory fields!");
      return;
    }
 
    const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
    const fullCategoryName = selectedCategoryObj ? selectedCategoryObj.label : 'Unknown';
 
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options).replace(/,/g, '');
 
    setPublishedBlogs((prevStorage) => {
      const existingCategoryBlogs = prevStorage[fullCategoryName] || [];
      const nextId = `cat-${existingCategoryBlogs.length + 1}`;
 
      const newBlogData = {
        id: nextId,
        title: blogTitle.trim(),
        Thumbnail: previewUrl,
        date: formattedDate,
        desc: blogDescription.trim(),
        points: pointsList,
        Status: "Published"
      };
 
      return {
        ...prevStorage,
        [fullCategoryName]: [...existingCategoryBlogs, newBlogData]
      };
    });
    setFormData({
      blogTitle: '',
      blogDescription: '',
      selectedCategory: '',
      thumbnail: null,
      previewUrl: '',
      modalHeading: '',
      modalDescription: ''
    });
    setPointsList([]);
 
    alert("Post published successfully!");
  };
 
  return (
    <>
      <div className="Admin-Blog-Cr-page-title-div">
        {/* <button type="button" onClick={() => { setmode('list') }} className="Admin-Blog-back-btn">Back to List</button> */}
        <div style={{ display: "flex", justifyContent: "space-between",alignItems:"center" }}>
          <h2 style={{ margin: "0" }} >Create New Blog</h2>
          <button type="button" onClick={() => { setmode('list') }} className="Admin-Blog-back-btn">Back to List</button>
        </div>
        <p>Add a new blog post. Fill in the details below and publish your post.</p>
      </div>
 
      <div className="Admin-Blog-Cr-content-grid">
        <div className="Admin-Blog-Cr-form-column">
          <div className="Admin-Blog-Cr-card-panel">
 
            <div className="Admin-Blog-Cr-form-group">
              <label htmlFor="blogTitle">Blog Title<span className="Admin-Blog-Cr-required">*</span></label>
              <input
                type="text"
                id="blogTitle"
                placeholder="Enter blog title"
                value={formData.blogTitle}
                onChange={handleInputChange}
              />
            </div>
 
            <div className="Admin-Blog-Cr-form-group">
              <label htmlFor="blogDescription">Description<span className="Admin-Blog-Cr-required">*</span></label>
              <div className="Admin-Blog-Cr-text-editor-container">
                <textarea
                  id="blogDescription"
                  placeholder="Enter your blog content here..."
                  rows="10"
                  value={formData.blogDescription}
                  onChange={handleInputChange}
                ></textarea>
                <div className="Admin-Blog-Cr-editor-footer">
                  <span>Word count: {formData.blogDescription.split(/\s+/).filter(Boolean).length}</span>
                  <span>Draft saved status</span>
                </div>
              </div>
            </div>
 
            {/* Points Section */}
            <div className="Admin-Blog-Cr-form-group Admin-Blog-Cr-points-group" style={{ fontFamily: 'Arial, sans-serif' }}>
              <div style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>
                Points<span className="Admin-Blog-Cr-required" style={{ color: 'red', marginLeft: '4px' }}>*</span>
              </div>
 
              <button
                type="button"
                onClick={openModal}
                style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '15px' }}
              >
                + Add Heading & Description
              </button>
 
              {pointsList.length > 0 && (
                <div className="Admin-Blog-Cr-points-display" style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                  {pointsList.map((item, index) => (
                    <div key={index} style={{ marginBottom: '25px', position: 'relative' }}>
                      <button
                        type="button"
                        onClick={() => handleDeletePoint(index)}
                        style={{ position: 'absolute', right: '0', top: '0', backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Delete Section
                      </button>
 
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#000', margin: '0 0 10px 0' }}>
                        {index + 1}. {item.title}
                      </h3>
 
                      <ul style={{ paddingLeft: '20px', margin: '0', listStyleType: 'disc' }}>
                        {item.content.map((subPoint, subIndex) => (
                          <li key={subIndex} style={{ color: '#555', marginBottom: '6px', fontSize: '14px', lineHeight: '1.5' }}>
                            {subPoint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
 
              <p className="Admin-Blog-Cr-field-instruction" style={{ color: '#666', fontSize: '13px', marginTop: '10px' }}>
                Points are hand-crafted key highlights of your content.
              </p>
 
              {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                  <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '500px', maxWidth: '90%', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                    <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>Add New Section</h2>
 
                    <form onSubmit={handleSavePoints}>
                      <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="modalHeading" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Heading</label>
                        <input
                          type="text"
                          id="modalHeading"
                          placeholder="e.g., Hook readers instantly"
                          value={formData.modalHeading}
                          onChange={handleInputChange}
                          required
                          style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      </div>
 
                      <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="modalDescription" style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Description (Press Enter to automatically insert a bullet point)</label>
                        <textarea
                          id="modalDescription"
                          rows="6"
                          placeholder="Start strong...&#10;Use formulas...&#10;Deliver intent..."
                          value={formData.modalDescription}
                          onChange={handleInputChange}
                          required
                          style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', fontFamily: 'inherit' }}
                        />
                      </div>
 
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={closeModal}
                          style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Save Points
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
 
            {/* Form Actions Row */}
            <div className="Admin-Blog-Cr-form-actions-row">
              {/* <button type="button" onClick={() => { setmode('list') }} className="Admin-Blog-Cr-btn Admin-Blog-Cr-btn-cancel">Cancel</button> */}
              <button type="button" className="Admin-Blog-Cr-btn Admin-Blog-Cr-btn-secondary-save" onClick={handleSaveDraft} >Save Draft</button>
              <button
                type="button"
                className="Admin-Blog-Cr-btn Admin-Blog-Cr-btn-publish"
                onClick={handlePublishPost}
              >
                Publish Post
              </button>
            </div>
 
          </div>
        </div>
 
        <div className="Admin-Blog-Cr-sidebar-column">
          <div className="Admin-Blog-Cr-card-panel Admin-Blog-Cr-widget-card">
            <h3>Categories</h3>
            <hr className="Admin-Blog-Cr-divider" />
 
            <div className="Admin-Blog-Cr-categories-list">
              {categories.map((category) => (
                <label className="Admin-Blog-Cr-checkbox-item" key={category.id}>
                  <input
                    type="radio"
                    name="blog-category"
                    checked={formData.selectedCategory === category.id}
                    onChange={() => setFormData(prev => ({ ...prev, selectedCategory: category.id }))}
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
 
            {isAdding ? (
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Enter New Category"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  style={{ padding: '4px 8px', fontSize: '13px', border: '1px solid #e2e8f0', borderRadius: '4px', flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '12px' }}
                >
                  close
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="Admin-Blog-Cr-add-category-btn"
                onClick={() => setIsAdding(true)}
                style={{ marginTop: '10px' }}
              >
                + Add New Category
              </button>
            )}
          </div>
 
          <div className="Admin-Blog-Cr-card-panel Admin-Blog-Cr-widget-card">
            <h3>Thumbnail Image</h3>
            <hr className="Admin-Blog-Cr-divider" />
 
            <input
              type="file"
              id='thumbnailUpload'
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
 
            <label
              htmlFor='thumbnailUpload'
              className="Admin-Blog-Cr-upload-dropzone"
              style={{ display: 'block', cursor: 'pointer', border: '2px dashed #cbd5e1', padding: '20px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#f8fafc', overflow: 'hidden' }}
            >
              {formData.previewUrl ? (
                <div style={{ position: 'relative' }}>
                  <img
                    src={formData.previewUrl}
                    alt="Thumbnail Preview"
                    style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <p style={{ fontSize: '12px', color: '#2563eb', marginTop: '5px', fontWeight: 'bold' }}>
                    Change Image
                  </p>
                </div>
              ) : (
                <>
                  <p className="Admin-Blog-Cr-upload-text" style={{ fontWeight: '500', margin: '5px 0' }}>
                    Click to upload image
                  </p>
                  <p className="Admin-Blog-Cr-upload-hint" style={{ fontSize: '12px', color: '#64748b' }}>
                    Recommended Size : 1200x630px
                  </p>
                </>
              )}
            </label>
          </div>
 
        </div>
      </div>
    </>
  );
};
 