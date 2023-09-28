import React from 'react'

const Overlay = ({closeDrawer}:any) => {
  return (
    <div
          className="hidden md:block fixed inset-0 bg-black  opacity-50 md:opacity-30 z-[50]   "
          onClick={closeDrawer}
        ></div>
  )
}

export default Overlay