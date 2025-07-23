export const Signout = (req, res) => {
  try {
    // Clear the token cookie from browser
    res.clearCookie('token')

    // Send success message
    res.json({ message: 'Signed out successfully' })
  } catch (err) {
    // Handle unexpected error
    console.error('Error in signout:', err.message)
    res.status(500).json({ message: 'Server error during signout' })
  }
}
