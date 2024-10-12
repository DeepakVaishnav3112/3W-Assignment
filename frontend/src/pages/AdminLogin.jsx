import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace this with your actual API call
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        // Store the token or user data in localStorage or context
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard"); // Redirect to admin dashboard
      } else {
        // Login failed
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl text-blue-300 font-medium mb-5">Admin Login</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 text-white w-1/2"
      >
        <div className="flex flex-col">
          <label className="text-zinc-500" htmlFor="email">
            Email:
          </label>
          <input
            className="px-3 py-2 bg-transparent outline-none border border-zinc-700 rounded-md"
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-zinc-500" htmlFor="password">
            Password:
          </label>
          <input
            className="px-3 py-2 bg-transparent outline-none border border-zinc-700 rounded-md"
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
};

export default AdminLogin;
