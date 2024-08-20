import { useState, useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import 'ckeditor5/ckeditor5.css'
import {
  ClassicEditor,
  Editor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from 'ckeditor5'

interface ReusableCKEditorProps {
  initialData?: string
  onChange?: (data: string) => void
  config?: any
}

const ReusableCKEditor: React.FC<ReusableCKEditorProps> = ({ initialData = '', onChange, config = {} }) => {
  const editorRef = useRef<Editor>(null) // Add type Editor
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

  return (
    <div>
      {editorLoaded && (
        <CKEditor
          editor={ClassicEditor}
          data={data}
          config={{
            ...config,
            toolbar: [
              'undo',
              'redo',
              '|',
              'heading',
              '|',
              'bold',
              'italic',
              '|',
              'link',
              'insertTable',
              'mediaEmbed',
              '|',
              'bulletedList',
              'numberedList',
              'indent',
              'outdent',
            ],
            plugins: [
              Bold,
              Essentials,
              Heading,
              Indent,
              IndentBlock,
              Italic,
              Link,
              List,
              MediaEmbed,
              Paragraph,
              Table,
              Undo,
            ],
          }}
          onReady={editor => {
            // @ts-expect-error Type 'ClassicEditor' is not assignable to type 'Editor'.
            editorRef.current = editor
          }}
          onChange={handleEditorChange}
        />
      )}
    </div>
  )
}

export default ReusableCKEditor
