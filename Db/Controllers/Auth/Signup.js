import { UserModel } from '../../Model/User.js'
import bcrypt from 'bcryptjs'

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' })

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create and save user
    const newUser = new UserModel({ name, email, password: hashedPassword })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Signup failed' })
  }
}
