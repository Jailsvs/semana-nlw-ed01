import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

import './styles.css';
import { fchmod } from 'fs';


interface Props {

  onFileUploaded: (file: File) => void;
}
const Dropzone: React.FC<Props> = ( { onFileUploaded }) => {

  
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop, 
    accept: 'image/*'})

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept='image/*'/>

      {
        selectedFileUrl
        ? 
        <img src={selectedFileUrl} alt="Point thumbnail"/>
        : (<p>
          <FiUpload/>
          Imagem do estabelecimento</p>)

      }
    </div>
  )
}
/*
{
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files
      }
*/
export default Dropzone;