import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/submissions`
      );
      setSubmissions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <NavLink to="/" className={`text-sm text-zinc-700 mt-5 cursor-pointer hover:underline`}>
        <div className=" mb-5">
          Go to User Submission Form
        </div>
      </NavLink>
      <h2 className="text-5xl text-blue-500 font-[Poppins] mb-5">USERS</h2>
      <div className="grid grid-cols-2 gap-y-10 text-white font-[Poppins]">
        {submissions.map((submission) => (
          <div className="space-y-2" key={submission._id}>
            <h3 className="text-3xl font-medium">{submission.name}</h3>
            <p className="text-sm text-zinc-500">
              {submission.socialMediaHandle}
            </p>
            <div className="flex flex-wrap gap-5">
              {submission.images.map((image, index) => (
                <div
                  className="hover:scale-[1.05] transition-all cursor-pointer"
                  key={index}
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    className="w-auto h-[150px] object-cover rounded-md"
                    src={image}
                    alt={`Submission ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseImage}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-[90%] max-h-[90%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
