import { useState, useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import 'ckeditor5/ckeditor5.css'
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  AutoLink,
  Autosave,
  BalloonToolbar,
  Bold,
  Essentials,
  FontFamily,
  FontSize,
  Indent,
  Italic,
  Link,
  List,
  Paragraph,
  SelectAll,
  Underline,
  Undo,
} from 'ckeditor5'

interface ReusableCKEditorProps {
  initialData?: string
  onChange?: (data: string) => void
  config?: any
}

const ReusableCKEditor: React.FC<ReusableCKEditorProps> = ({ initialData = '', onChange, config = {} }) => {
  const editorRef = useRef(null)
  const editorContainerRef = useRef(null) // Declare editorContainerRef here
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [data, setData] = useState(initialData)

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData()
    setData(data)
    if (onChange) {
      onChange(data)
    }
  }

  const defaultConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      AutoLink,
      Autosave,
      BalloonToolbar,
      Bold,
      Essentials,
      FontFamily,
      FontSize,
      Indent,
      Italic,
      Link,
      List,
      Paragraph,
      SelectAll,
      Underline,
      Undo,
    ],
    balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: 'Type or paste your content here!',
  }

  const mergedConfig = { ...defaultConfig, ...config } // Merge default and custom configs

  return (
    <div>
      <div className="main-container">
        <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {editorLoaded && (
                <CKEditor editor={ClassicEditor} config={mergedConfig} data={data} onChange={handleEditorChange} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReusableCKEditor
