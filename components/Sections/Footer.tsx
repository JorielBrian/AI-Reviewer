// Footer component for the application layout
// Displays copyright information and credits at the bottom of every page

import React from 'react'

// Footer component definition
const Footer = () => {
  return (
    // Footer container with centered layout and padding
    <footer className='flex justify-center p-5'>
      {/* Copyright text with muted styling and dynamic year */}
      <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Joriel Brian Sudario. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer