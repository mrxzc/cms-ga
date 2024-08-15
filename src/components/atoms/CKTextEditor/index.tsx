// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'

// import {
//   AccessibilityHelp,
//   Alignment,
//   Autosave,
//   Bold,
//   Essentials,
//   FontBackgroundColor,
//   FontColor,
//   FontFamily,
//   FontSize,
//   Indent,
//   Italic,
//   List,
//   Paragraph,
//   SelectAll,
//   SpecialCharacters,
//   Underline,
//   Undo,
//   BalloonToolbar,
//   EventInfo,
// } from 'ckeditor5'

// import 'ckeditor5/ckeditor5.css'

// import './style.css'

// interface CKTextEditorProps {
//   onChange?: (data: string) => void
//   initialValue?: string
//   data?: string
//   placeholder?: string
// }

// function CKTextEditor ({ onChange, initialValue = '', data, placeholder = '' }: CKTextEditorProps) {
//   const editorRef = useRef<ClassicEditor | null>(null)
//   const [editorLoaded, setEditorLoaded] = useState(false)

//   useEffect(() => {
//     setEditorLoaded(true)
//   }, [])

//   const handleEditorChange = (event: EventInfo<string, unknown>, editor: ClassicEditor) => {
//     const data = editor.getData()
//     onChange?.(data)
//   }
//   return (
//     <div>
//       <div className='main-container'>
//         <div className='editor-container editor-container_classic-editor'>
//           <div className='editor-container__editor'>
//             {editorLoaded && (
//               <CKEditor
//                 editor={ClassicEditor}
//                 config={{
//                   toolbar: {
//                     items: [
//                       'undo',
//                       'redo',
//                       '|',
//                       'selectAll',
//                       '|',
//                       'fontSize',
//                       'fontFamily',
//                       'fontColor',
//                       'fontBackgroundColor',
//                       '|',
//                       'bold',
//                       'italic',
//                       'underline',
//                       '|',
//                       'specialCharacters',
//                       '|',
//                       'alignment',
//                       '|',
//                       'bulletedList',
//                       'numberedList',
//                       'outdent',
//                       'indent',
//                       '|',
//                       'accessibilityHelp',
//                     ],
//                     shouldNotGroupWhenFull: false,
//                   },
//                   plugins: [
//                     AccessibilityHelp,
//                     Alignment,
//                     Autosave,
//                     BalloonToolbar,
//                     Bold,
//                     Essentials,
//                     FontBackgroundColor,
//                     FontColor,
//                     FontFamily,
//                     FontSize,
//                     Indent,
//                     Italic,
//                     List,
//                     Paragraph,
//                     SelectAll,
//                     SpecialCharacters,
//                     Underline,
//                     Undo,
//                   ],
//                   fontFamily: {
//                     supportAllValues: true,
//                   },
//                   fontSize: {
//                     options: [10, 12, 14, 'default', 18, 20, 22],
//                     supportAllValues: true,
//                   },
//                   initialData: data || initialValue,
//                   placeholder: placeholder || 'Type or paste your content here!',
//                 }}
//                 onReady={editor => {
//                   editorRef.current = editor
//                 }}
//                 onChange={handleEditorChange}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CKTextEditor
