'use client'
import React, { useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
const FileUploader = () => {

    const onDrop = useCallback(acceptedFiles => {
        
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      )
  return (
    <div>FileUploader</div>
  )
}

export default FileUploader