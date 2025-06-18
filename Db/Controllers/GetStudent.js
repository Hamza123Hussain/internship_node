// controllers/studentController.js

import { Student } from '../models/Student.js'

/**
 * Get all students from the database
 */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find() // Fetch all student documents
    res.json(students) // Send as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' })
  }
}

/**
 * Get a single student by their MongoDB ID
 */
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.query.id) // Find student by ID
    if (!student) return res.status(404).json({ message: 'Student not found' })
    res.json(student) // Send found student
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' })
  }
}
