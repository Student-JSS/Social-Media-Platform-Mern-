import React, { useContext, useState } from 'react';
import '../styles/CreatePosts.css';
import { GeneralContext } from '../context/GeneralContextProvider';
import { RxCross2 } from 'react-icons/rx';

const CreateStory = () => {

  const { socket, isCreateStoryOpen, setIsCreateStoryOpen } =
    useContext(GeneralContext);

  const [storyType, setStoryType] = useState('photo');
  const [storyDescription, setStoryDescription] = useState('');
  const [storyFile, setStoryFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 🔥 Upload to Cloudinary
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:6001/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  // 🚀 Handle Story Upload
  const handleStoryUpload = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      let fileUrl = "";

      if (storyFile) {
        fileUrl = await uploadFile(storyFile);
      }

      await socket.emit('create-new-story', {
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        userPic: localStorage.getItem('profilePic'),
        fileType: storyType,
        file: fileUrl,
        text: storyDescription
      });

      // ✅ reset
      setStoryDescription('');
      setStoryFile(null);
      setIsCreateStoryOpen(false);

    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="createPostModalBg"
      style={isCreateStoryOpen ? { display: 'contents' } : { display: 'none' }}
    >
      <div className="createPostContainer">

        <RxCross2
          className='closeCreatePost'
          onClick={() => setIsCreateStoryOpen(false)}
        />

        <h2 className="createPostTitle">Add new story</h2>
        <hr className="createPostHr" />

        <div className="createPostBody">
          <form onSubmit={handleStoryUpload}>

            {/* Type */}
            <select
              className="form-select"
              onChange={(e) => setStoryType(e.target.value)}
            >
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>

            {/* File */}
            <div className="uploadBox">
              <input
                type="file"
                onChange={(e) => setStoryFile(e.target.files[0])}
              />
            </div>

            {/* Text */}
            <div className="form-floating mb-3 authFormInputs descriptionInput">
              <input
                type="text"
                className="form-control"
                placeholder="Text"
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
              />
              <label>Text</label>
            </div>

            {/* Button */}
            <button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;