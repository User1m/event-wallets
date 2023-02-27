import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

interface Props {
  error: string
  selectedFile: any
  setSelectedFile: any
  imgUrl: string
  pictureType: string[]
  pictureIcon: string
  show: string
}

const FormImgComponent = ({
  error,
  setSelectedFile,
  selectedFile,
  imgUrl,
  pictureType,
  pictureIcon,
  show
}: Props) => {
  const [typeError, settypeError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFile = (file: any) => {
    setSelectedFile(file);
  };

  const dragOver = (e: any) => {
    e.preventDefault();
  };

  const dragEnter = (e: any) => {
    e.preventDefault();
  };

  const dragLeave = (e: any) => {
    e.preventDefault();
  };

  // const deleteFile = () => {
  //   setSelectedFile({});
  //   setImageUrl('');
  // };

  const fileDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };
  const fileInputRef = useRef<any>(null);

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const setPreview = () => {
    const file = fileInputRef.current.files[0];
    const reader: any = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setImageUrl(reader.result);
    } else {
      setImageUrl('');
    }
  };

  const checkType = (selectedFile: any) => {
    if (selectedFile.name) {
      const value = selectedFile.name.split('.');
      const fileType = value[value.length - 1];
      if (
        fileType === 'jpg' ||
        fileType === 'jpeg' ||
        fileType === 'gif' ||
        fileType === 'png'
      ) {
        return pictureType.find((x) => x === fileType);
      } else {
        return undefined;
      }
    }
  };

  const fileSelected = () => {
    if (fileInputRef.current.files.length) {
      const approvedFileType = checkType(fileInputRef.current.files[0]);
      if (approvedFileType !== undefined) {
        if (fileInputRef.current.files[0].size / 1024 / 1024 <= 5) {
          handleFile(fileInputRef.current.files[0]);
          setPreview();
        } else {
          toast.error('File size is greater than 5mb');
          settypeError('File size is greater than 5mb');
        }
      } else {
        toast.error('File type is not accepted');
        settypeError('File type is not accepted');
      }
    } else {
      toast.error('No file selected');
      settypeError('No file selected');
    }
  };

  const handleTouch = (e: any) => {};

  return (
    <StyledFormImgComponent imgUrl={imgUrl} img={selectedFile}>
      <div
        className="drop-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        onClick={fileInputClicked}
        onBlur={handleTouch}
      >
        <div className="form-font drop-message">
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={fileSelected}
            // inputprops={{ accept: "image/*" }}
          />
          <div className="upload-section">
            {selectedFile?.name ? (
              <img
                className="icon-sections"
                src={imageUrl || selectedFile.name}
                alt={selectedFile.name}
              />
            ) : imageUrl ? (
              <img src={imageUrl} alt="img-preview" className="icon-sections" />
            ) : (
              <div className="icon-section">
                <img
                  src={
                    pictureIcon || `${process.env.PUBLIC_URL}/images/plus.svg`
                  }
                  alt="patient"
                  className="upload-icon"
                />
              </div>
            )}
            {/* {label && <p className="upload-label">{label}</p>} */}
          </div>
        </div>
      </div>
      {/* {selectedFile?.name && show !== 'no image' && (
        <div className="flex file-status-bar">
          <div className="flex file-display">
            <span className="form-label file-name">{selectedFile.name}</span>
          </div>
          <div
            className="form-label file-name file-remove"
            onClick={deleteFile}
          >
            x
          </div>
        </div>
      )} */}
      {(error || typeError) && (
        <div className="form-error file-error-message">
          {error}
          {/* {typeError && "File type is invalid"} */}
        </div>
      )}
    </StyledFormImgComponent>
  );
};

interface StyledProps {
  imgUrl: any
  img: any
}

const StyledFormImgComponent = styled.div<StyledProps>`
  margin-bottom: 2.631rem;
  .upload-section {
    display: flex;
    flex-direction: row;
    width: 12rem;
    height: 6rem;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
  }
  .upload-icon {
    width: 35px;
    height: 35px;
    margin-top: 2.8rem;
    margin-left: 2.7rem;
  }
  .upload-label {
    display: flex;
    flex-direction: row;
    margin-top: 1.4rem;
    margin-left: 40px;
    border: 1px solid rgba(114, 109, 109, 1);
    border-radius: 8%;
    padding: 0.3rem;
    font-size: 2rem;
  }
  .img-preview {
    /* width: 40%; */
    border: 1px dashed rgba(33, 51, 79, 0.1);
    border-radius: 50%;
  }
  .icon-section {
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 50%;
    background-color: #c4c4c4;
    background-image: url(${({ imgUrl, img }) => {
      return Object.keys(img).length ? img.name : imgUrl;
    }});
    background-position: center;
    background-repeat: none;
    background-size: cover;
  }
  .icon-sections {
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 50%;
    background-color: #c4c4c4;
    background-position: center;
    background-repeat: none;
    background-size: cover;
  }
  .img-icon {
    width: 100%;
    object-fit: cover;
  }
  .file-input {
    display: none;
  }
  .drop-container {
    width: 100%;
  }
  .flex {
    display: flex;
    flex-direction: row;
  }
  .file-status-bar {
    justify-content: space-between;
  }
  .file-display {
    align-items: center;
  }
  .file-type-logo {
    display: inline-block;
    width: 4rem;
    height: 4rem;
    background: url(images/file-icon.svg) no-repeat center center;
    background-size: 100%;
  }
  .file-name {
    margin-top: 1rem;
    /* margin-left: .9rem; */
    display: inline;
  }
  .file-error-message {
    display: inline;
  }
  .file-remove {
    cursor: pointer;
    font-size: 1.6rem;
  }
  .file-input {
    display: none;
  }
  @media only screen and (max-width: 1200px) {
    .drop-container {
      width: 100%;
    }
  }
`;
export default FormImgComponent;
