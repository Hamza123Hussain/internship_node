import { UserModel } from '../../Model/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const SignIn = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body

    // Find the user from the database using email
    const user = await UserModel.findOne({ email })

    // If user doesn't exist, return an error
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User not found. Please sign up first.' })
    }

    // Compare the entered password with the hashed password stored in DB
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // If password doesn't match, return an error
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Create a JWT token with the user's ID as payload
    const token = jwt.sign(
      { userId: user._id }, // Payload
      'SecretkEY76767F5F56F56D43WS23WS43S', // Secret key
      { expiresIn: '1h' } // Token will expire in 1 hour
    )

    // Set token as HTTP-only cookie (not accessible from frontend JS)
    res
      .cookie('token', token, {
        httpOnly: true, // Prevent client-side access to cookie
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        maxAge: 3600000, // 1 hour in milliseconds
      })
      .json({
        message: 'Logged in successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      })
  } catch (err) {
    // Catch and log any error
    console.error('Error in signin:', err.message)
    res.status(500).json({ message: 'Server error during signin' })
  }
}
