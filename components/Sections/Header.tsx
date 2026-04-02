// Header component for the application layout
// Displays the main site title and branding at the top of every page

import React from 'react'

// Header component definition
const Header = () => {
  return (
    // Header container with centered layout and padding
    <header className='flex p-2 justify-center'>
        {/* Content container with responsive width and horizontal padding */}
        <div className='w-1/2 px-10'>
            {/* Main site title with bold styling */}
            <h1 className="font-bold text-2xl">AI Reviewer</h1>
        </div>
    </header>
  )
}

export default Header