import React from 'react'

const Footer = () => {
  return (
    <footer className='flex justify-center p-5'>
      <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Joriel Brian Sudario. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer