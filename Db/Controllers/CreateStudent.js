import { Student } from '../Model/Student.js'

/**
 * Create a new student record
 */
export const createStudent = async (req, res) => {
  const { name, batch, email } = req.body // Extract data from request body

  try {
    const newStudent = new Student({ name, batch, email }) // Create student instance
    await newStudent.save() // Save to DB
    res.status(201).json(newStudent) // Return created student
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
