// // import React, { useState } from 'react';
// // import "./FileUploader.css";
// // const FileUploader = () => {
// //   const [files, setFiles] = useState([]);

// //   const handleFileUpload = (e) => {
// //     const newFiles = Array.from(e.target.files);
// //     setFiles([...files, ...newFiles]);
// //   };

// //   const handleDragOver = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     const newFiles = Array.from(e.dataTransfer.files);
// //     setFiles([...files, ...newFiles]);
// //   };

// //   return (
// //     <div className="file-uploader">
// //       <div
// //         className="upload-area"
// //         onDragOver={handleDragOver}
// //         onDrop={handleDrop}
// //       >
// //         <p>Drag & Drop your files here or</p>
// //         <label className="file-upload-btn">
// //           Browse Files
// //           <input type="file" multiple onChange={handleFileUpload} />
// //         </label>
// //       </div>

// //       <div className="file-preview">
// //         {files.map((file, index) => (
// //           <div key={index} className="file-item">
// //             <i className="bi bi-file-earmark-check-fill file-icon"></i>
// //             <span className="file-name">{file.name}</span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FileUploader;













import React, { useState } from 'react';

const FileUploader = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
    if (onFileUpload) {
      onFileUpload(newFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
    if (onFileUpload) {
      onFileUpload(newFiles);
    }
  };

  return (
    <div className="file-uploader">
      <div
        className="upload-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Drag & Drop your audio files here or</p>
        <label className="file-upload-btn">
          Browse Files
          <input type="file" multiple onChange={handleFileUpload} accept="audio/*" />
        </label>
      </div>

      <div className="file-preview">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <i className="bi bi-file-earmark-check-fill file-icon"></i>
            <span className="file-name">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
