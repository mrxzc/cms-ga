// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import {
//   ClassicEditor,
//   AccessibilityHelp,
//   Alignment,
//   Autosave,
//   BalloonToolbar,
//   Bold,
//   Essentials,
//   Indent,
//   IndentBlock,
//   Italic,
//   List,
//   Paragraph,
//   SelectAll,
//   Underline,
//   Undo,
//   EventInfo,
// } from 'ckeditor5'

// import 'ckeditor5/ckeditor5.css'
// import './style.css'

// interface TextEditorProps {
//   onChange?: (data: string) => void
//   // onChange: (event: EventInfo, editor: any) => void
//   data: string
//   initialValue?: string
//   placeholder?: string
// }

// function TextEditor ({ onChange, data, initialValue = '', placeholder = '' }: TextEditorProps) {
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
//     <div className='editor-container editor-container_classic-editor'>
//       <div className='editor-container__editor'>
//         {editorLoaded && (
//           <CKEditor
//             editor={ClassicEditor}
//             config={{
//               toolbar: {
//                 items: [
//                   'undo',
//                   'redo',
//                   '|',
//                   'selectAll',
//                   '|',
//                   'bold',
//                   'italic',
//                   'underline',
//                   '|',
//                   'alignment',
//                   '|',
//                   'bulletedList',
//                   'numberedList',
//                   'outdent',
//                   'indent',
//                   '|',
//                   'accessibilityHelp',
//                 ],
//                 shouldNotGroupWhenFull: false,
//               },
//               plugins: [
//                 AccessibilityHelp,
//                 Alignment,
//                 Autosave,
//                 BalloonToolbar,
//                 Bold,
//                 Essentials,
//                 Indent,
//                 IndentBlock,
//                 Italic,
//                 List,
//                 Paragraph,
//                 SelectAll,
//                 Underline,
//                 Undo,
//               ],
//               balloonToolbar: ['bold', 'italic', '|', 'bulletedList', 'numberedList'],
//               initialData: data ?? initialValue,
//               placeholder: placeholder,
//             }}
//             onReady={editor => {
//               editorRef.current = editor
//             }}
//             onChange={handleEditorChange}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default TextEditor
