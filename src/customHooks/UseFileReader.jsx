// useFilePreview.js
import { useState, useEffect } from "react";

export const useFilePreview = () => {
  const [files, setFiles] = useState([]); // [{ id, file, url }]

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => {
      return {
        id: crypto.randomUUID(), // or use Date.now() for simpler ID
        file,
        url: URL.createObjectURL(file),
      };
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  useEffect(() => {
    return () => {
      // Cleanup all URLs when component unmounts
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, [files]);

  return { files,setFiles, addFiles, removeFile };
};
