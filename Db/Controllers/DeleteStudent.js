import { Student } from '../Model/Student.js'

/**
 * Delete a student by ID
 */
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id)
    if (!deletedStudent)
      return res.status(404).json({ message: 'Student not found' })
    res.json({ message: 'Student deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
