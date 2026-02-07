import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../../styles/create-food.css';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // ✅ central API client

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL('');
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setVideoFile(null);
      setFileError('');
      return;
    }

    if (!file.type.startsWith('video/')) {
      setFileError('Please select a valid video file.');
      return;
    }

    setFileError('');
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setFileError('Please drop a valid video file.');
      return;
    }

    setFileError('');
    setVideoFile(file);
  };

  const onDragOver = (e) => e.preventDefault();

  const openFileDialog = () => fileInputRef.current?.click();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);

    try {
      const response = await API.post(
        '/api/food',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      console.log('Success:', response.data);
      navigate('/');

    } catch (err) {
      console.error('Error Response:', err.response?.data);
      alert(err.response?.data?.message || 'Failed to save food.');
    }
  };

  const isDisabled = useMemo(
    () => !name.trim() || !videoFile,
    [name, videoFile]
  );

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <header className="create-food-header">
          <h1 className="create-food-title">Create Food</h1>
          <p className="create-food-subtitle">
            Upload a short video and add details.
          </p>
        </header>

        <form className="create-food-form" onSubmit={onSubmit}>
          <div className="field-group">
            <label>Food Video</label>

            <input
              ref={fileInputRef}
              className="file-input-hidden"
              type="file"
              accept="video/*"
              onChange={onFileChange}
            />

            <div
              className="file-dropzone"
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <strong>Tap to upload</strong>
              <div className="file-hint">
                MP4, WebM, MOV
              </div>
            </div>

            {fileError && (
              <p className="error-text">{fileError}</p>
            )}

            {videoFile && (
              <div className="file-chip">
                <span>{videoFile.name}</span>
                <button
                  type="button"
                  onClick={() => setVideoFile(null)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {videoURL && (
            <div className="video-preview">
              <video
                src={videoURL}
                controls
                className="video-preview-el"
              />
            </div>
          )}

          <div className="field-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label>Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className="btn-primary"
            type="submit"
            disabled={isDisabled}
          >
            Save Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
