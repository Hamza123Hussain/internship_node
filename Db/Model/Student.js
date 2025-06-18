// models/Student.js

// Import Mongoose to define a schema
import mongoose from 'mongoose'

// Define the student schema
// This defines the structure of documents inside the 'students' collection
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
  },
  batch: {
    type: String,
  },
  email: {
    type: String,
    required: true, // Email is mandatory
    unique: true, // Email must be unique in the collection
  },
})

// Create a model from the schema
// 'Student' is the name, 'students' will be the collection name in MongoDB
export const Student = mongoose.model('Student', studentSchema)
