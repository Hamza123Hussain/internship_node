import mongoose from 'mongoose'

// Define schema for User
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate email
  },
  password: {
    type: String,
    required: true,
  },
})

// Export the User model
export const UserModel = mongoose.model('User', UserSchema)
