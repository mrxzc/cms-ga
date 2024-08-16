'use client';

import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, className }) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
  ]; // Hapus "image" dari formats

  return (
    <div className={className}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={onChange}
      />
    </div>
  );
};

export default QuillEditor;
