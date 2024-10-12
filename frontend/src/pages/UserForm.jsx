import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const UserForm = () => {
  const [name, setName] = useState("");
  const [socialMediaHandle, setSocialMediaHandle] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialMediaHandle", socialMediaHandle);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/submit`,
        formData
      );
      console.log("Form submitted successfully!", response.data);

      setName("");
      setSocialMediaHandle("");
      setImages([]);
      document.getElementById("imageInput").value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl text-blue-300 font-medium mb-5">
        User Submission Form
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 text-white w-1/2"
      >
        <div className="flex flex-col">
          <label className="text-zinc-500" htmlFor="name">
            Name:
          </label>
          <input
            className="px-3 py-2 bg-transparent outline-none border border-zinc-700 rounded-md"
            type="text"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-zinc-500" htmlFor="socialMediaHandle">
            Social Media Handle:
          </label>
          <input
            className="px-3 py-2 bg-transparent outline-none border border-zinc-700 rounded-md"
            type="text"
            id="socialMediaHandle"
            value={socialMediaHandle}
            required
            onChange={(e) => setSocialMediaHandle(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-zinc-500" htmlFor="imageInput">
            Upload Images:
          </label>
          <input
            id="imageInput"
            className="bg-transparent border border-zinc-700 rounded-md file:px-5 file:py-2 file:mr-3 file:bg-blue-100 file:text-blue-500 file:border-none"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button
          className="bg-blue-500 px-5 py-2 w-fit mt-2 rounded-md disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <NavLink to='/admin/login'>
        <div className="text-sm text-blue-700 mt-5 cursor-pointer hover:underline">
          Go to Admin Dashboard
        </div>
      </NavLink>
    </div>
  );
};

export default UserForm;
