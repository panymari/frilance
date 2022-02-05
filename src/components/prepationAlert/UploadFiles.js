import React, {useState} from 'react';
import ImageUploading from 'react-images-uploading';
import classes from './UploadFiles.module.scss';
import {collection, addDoc} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const UploadFiles = () => {
  const [images, setImages] = useState([]);

  const maxNumber = 69;
  const onChange = (imageList) => {
    setImages(imageList);
  };
  const usersCollectionRef = collection(db, "users");
    
  const createUser = async () => {
      await addDoc(usersCollectionRef, { 
          img: images, 
      });
  };
  createUser();
  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div>
            <button
              className={classes.uploadYourPhoto}
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload your photo
            </button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index}>
                <img src={image['data_url']} alt="" width="100" />
                <div>
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default UploadFiles; 