import { Student } from '../Model/Student.js'

/**
 * Update an existing student by ID
 */
export const updateStudent = async (req, res) => {
  const { name, batch, email } = req.body // Updated fields

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.query.id,
      { name, batch, email },
      { new: true } // Return updated document
    )

    if (!updatedStudent)
      return res.status(404).json({ message: 'Student not found' })

    res.json(updatedStudent) // Send updated student
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
