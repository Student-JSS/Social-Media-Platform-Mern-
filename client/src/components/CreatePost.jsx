import React, { useContext, useState } from "react";
import "../styles/CreatePosts.css";
import { RxCross2 } from "react-icons/rx";
import { GeneralContext } from "../context/GeneralContextProvider";
import axios from "axios";

const CreatePost = () => {
  const { isCreatPostOpen, setIsCreatePostOpen } =
    useContext(GeneralContext);

  const [postType, setPostType] = useState("photo");
  const [postDescription, setPostDescription] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [postFile, setPostFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 🔥 Upload image to Cloudinary via backend
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:6001/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  // 🚀 Handle Post Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      let imageUrl = "";

      if (postFile) {
        imageUrl = await uploadImage(postFile);
      }

      const inputs = {
        userId: localStorage.getItem("userId"),
        userName: localStorage.getItem("username"),
        userPic: localStorage.getItem("profilePic"),
        fileType: postType,
        file: imageUrl,
        description: postDescription,
        location: postLocation,
        comments: { "New user": "This is my first comment" },
      };

      await axios.post("http://localhost:6001/createPost", inputs);

      // ✅ Reset form
      setPostDescription("");
      setPostLocation("");
      setPostFile(null);
      setIsCreatePostOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div
        className="createPostModalBg"
        style={isCreatPostOpen ? { display: "contents" } : { display: "none" }}
      >
        <div className="createPostContainer">
          <RxCross2
            className="closeCreatePost"
            onClick={() => setIsCreatePostOpen(false)}
          />

          <h2 className="createPostTitle">Create post</h2>
          <hr className="createPostHr" />

          <div className="createPostBody">
            <form onSubmit={handleSubmit}>
              {/* Post Type */}
              <select
                className="form-select"
                onChange={(e) => setPostType(e.target.value)}
              >
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>

              {/* File Upload */}
              <div className="uploadBox">
                <input
                  type="file"
                  onChange={(e) => setPostFile(e.target.files[0])}
                />
              </div>

              {/* Description */}
              <div className="form-floating mb-3 authFormInputs descriptionInput">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                />
                <label>Description</label>
              </div>

              {/* Location */}
              <div className="form-floating mb-3 authFormInputs postLocation">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  value={postLocation}
                  onChange={(e) => setPostLocation(e.target.value)}
                />
                <label>Location</label>
              </div>

              {/* Submit */}
              <button type="submit" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;