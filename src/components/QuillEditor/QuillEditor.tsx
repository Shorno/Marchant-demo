import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./QuillEditor.css";
interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    height?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
    value,
    onChange,
    placeholder = "Write here...",
    height = "200px",
}) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }], // Add headers
            [{ font: [] }], // Font selection
            [{ size: ["small", false, "large", "huge"] }], // Font size
            ["bold", "italic", "underline", "strike"], // Text styling
            [{ color: [] }, { background: [] }], // Text and background colors
            [{ script: "sub" }, { script: "super" }], // Subscript/superscript
            [{ align: [] }], // Alignment options
            ["blockquote", "code-block"], // Blockquote and code block
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            [{ indent: "-1" }, { indent: "+1" }], // Indent
            ["link", "image", "video"], // Links, images, and videos
            ["clean"], // Clear formatting
        ],
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "script",
        "align",
        "blockquote",
        "code-block",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
    ];

    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            modules={modules}
            formats={formats}
            style={{ height }}
        />
    );
};

export default QuillEditor;
