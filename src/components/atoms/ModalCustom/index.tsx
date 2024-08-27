'use client'

import './style.css'

export function Modal({
  children,
  isOpen,
  backdropDismiss = true,
  backdropClick = () => {},
  isFloating = true,
}: Readonly<{
  readonly children: React.ReactElement
  isOpen: boolean
  backdropDismiss?: boolean
  backdropClick?: () => void
  isFloating?: boolean
}>) {
  return (
    <>
      {/* Backdrop */}
      {backdropDismiss && isOpen && (
        <div
          onKeyDown={() => {}}
          onClick={backdropClick}
          className="z-[999] modal-center h-screen w-screen bg-gray-950 opacity-40 fixed top-0 left-0"
        ></div>
      )}

      {/* Floating Modal */}
      <div
        onKeyDown={() => {}}
        onClick={backdropClick}
        className={`${
          isFloating ? '' : 'hidden'
        } z-[1000] duration-300 transition-transform fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div onKeyDown={() => {}} onClick={e => e.stopPropagation()} className="bg-white rounded-xl p-4">
          {children}
        </div>
      </div>

      {/* Full-screen Modal */}
      <div
        onKeyDown={() => {}}
        onClick={backdropClick}
        className={`${
          isFloating ? 'hidden' : ''
        } z-[1000] duration-300 transition-transform fixed bottom-0 left-0 right-0 w-full flex items-center justify-center ${
          isOpen ? 'translate-y-[0%]' : 'translate-y-[100%]'
        }`}
      >
        <div
          onKeyDown={() => {}}
          onClick={e => e.stopPropagation()}
          className="w-screen max-container bg-white rounded-t-xl relative text-center max-h-[90vh] overflow-y-auto"
        >
          {children}
        </div>
      </div>
    </>
  )
}
