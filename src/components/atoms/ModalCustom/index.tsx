// 'use client'

// import './style.css'

// export function Modal({
//   children,
//   isOpen,
//   backdropDismiss = true,
//   backdropClick = () => {},
//   isFloating = true,
// }: Readonly<{
//   readonly children: React.ReactElement
//   isOpen: boolean
//   backdropDismiss?: boolean
//   backdropClick?: any
//   isFloating?: boolean
// }>) {
//   return (
//     <>
//       {/* tes  */}
//       <div
//         onKeyDown={() => {}}
//         onClick={() => backdropClick()}
//         className={`${
//           !backdropDismiss || !isOpen ? 'hidden' : ''
//         } z-[999] modal-center h-screen w-screen max-container bg-gray-950 opacity-40`}
//       ></div>

//       <div
//         onKeyDown={() => {}}
//         onClick={() => {
//           backdropClick()
//         }}
//         className={`${
//           isFloating ? '' : 'hidden'
//         } z-[1000] h-1/2 duration-300 transition-transform fixed bottom-0 w-full max-container flex items-center justify-center ${
//           isOpen ? '-translate-y-[55%]' : 'translate-y-[500%]'
//         }`}
//       >
//         <div onKeyDown={() => {}} onClick={e => e.stopPropagation()}>
//           {children}
//         </div>
//       </div>

//       <div
//         onKeyDown={() => {}}
//         onClick={() => {
//           backdropClick()
//         }}
//         className={`${
//           isFloating ? 'hidden' : ''
//         } z-[1000]  duration-300 transition-transform fixed bottom-0 left-0 right-0 w-full flex items-center justify-center ${
//           isOpen ? 'translate-y-[0%]' : 'translate-y-[500%]'
//         }`}
//       >
//         <div onKeyDown={() => {}} onClick={e => e.stopPropagation()}>
//           {children}
//         </div>
//       </div>
//     </>
//   )
// }

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
      {backdropDismiss && isOpen && (
        <div
          onKeyDown={() => {}}
          onClick={backdropClick}
          className="z-[999] modal-center h-screen w-screen max-container bg-gray-950 opacity-40"
        ></div>
      )}

      <div
        onKeyDown={() => {}}
        onClick={backdropClick}
        className={`${
          isFloating ? '' : 'hidden'
        } z-[1000] h-1/2 duration-300 transition-transform fixed bottom-0 w-full max-container flex items-center justify-center ${
          isOpen ? '-translate-y-[55%]' : 'translate-y-[500%]'
        }`}
      >
        <div onKeyDown={() => {}} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>

      <div
        onKeyDown={() => {}}
        onClick={backdropClick}
        className={`${
          isFloating ? 'hidden' : ''
        } z-[1000] duration-300 transition-transform fixed bottom-0 left-0 right-0 w-full flex items-center justify-center ${
          isOpen ? 'translate-y-[0%]' : 'translate-y-[500%]'
        }`}
      >
        <div
          onKeyDown={() => {}}
          onClick={e => e.stopPropagation()}
          className="w-screen max-container bg-white rounded-t-xl relative text-center max-h-[99vh] overflow-y-auto"
        >
          {children}
        </div>
      </div>
    </>
  )
}
