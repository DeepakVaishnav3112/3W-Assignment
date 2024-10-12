import express from "express";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import cors from "cors";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import userModel from "./models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// Route for form submission and image upload
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/submit", async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Error parsing form data" });
    }

    try {
      // Extract the first element from the array to get a string value
      const name = fields.name[0]; // 'Deepak' is wrapped in an array, so we extract it
      const socialMediaHandle = fields.socialMediaHandle[0];

      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];

      // Array to store image URLs after upload
      const uploadedImageUrls = [];

      // Upload each image to Cloudinary
      for (const file of imageFiles) {
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
          folder: "userMedia"
        });
        uploadedImageUrls.push(uploadResult.secure_url); // Store URL in array
      }

      // Create a new user with the uploaded images
      const newUser = new userModel({
        name,
        socialMediaHandle,
        images: uploadedImageUrls
      });

      await newUser.save();

      console.log(name, socialMediaHandle, uploadedImageUrls);
      

      res.json({ message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Error processing form submission:", error);
      res.status(500).json({ error: "An error occurred while processing your submission" });
    }
  });
});

app.get("/api/submissions", async (req, res) => {
  try {
    const submissions = await userModel.find();
    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "An error occurred while fetching submissions" });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Pls Enter both email and password" });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail || password === adminPassword) {
    const token = jwt.sign({email}, process.env.JWT_SECRET);
    return res.json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
