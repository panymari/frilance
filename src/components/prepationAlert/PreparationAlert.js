import React, { useState } from "react";
import classes from './PreparationAlert.module.scss';
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import ImageUploading from 'react-images-uploading';

const PreparationAlert = () => {
    const [inputs, setInputs] = useState({});
    const [imgUrl, setImgUrl] = useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputs('');
    }
    const [images, setImages] = useState([]);

    const maxNumber = 69;
    const onChange = (imageList) => {
        setImages(imageList);
    };

    const usersCollectionRef = collection(db, "users");
    images.map((item) => {
        setImgUrl(item.data_url);
    });
    console.log(imgUrl);
    const createUser = async () => {
        await addDoc(usersCollectionRef, {
            name: inputs.name,
            sureName: inputs.surename,
            userName: inputs.userName,
            dateOfBirth: inputs.dateOfBirth,
            education: inputs.education,
            work: inputs.work,
            achievements: inputs.work,
            img: imgUrl,
        });
    };

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <input
                type="text"
                name="name"
                value={inputs.name || ""}
                className={classes.input}
                onChange={handleChange}
                placeholder="Enter name"
            />
            <input
                type="text"
                name="surename"
                value={inputs.surename || ""}
                className={classes.input}
                onChange={handleChange}
                placeholder="Enter surename"
            />
            <input
                type="text"
                name="userName"
                value={inputs.userName || ""}
                className={classes.input}
                onChange={handleChange}
                placeholder="Enter userName"
            />
            <input
                type="text"
                name="dateOfBirth"
                value={inputs.dateOfBirth || ""}
                className={classes.input}
                placeholder="Enter date of birth"
                onChange={handleChange}
            />
            <input
                type="text"
                name="education"
                value={inputs.education || ""}
                placeholder="Enter education"
                className={classes.input}
                onChange={handleChange}
            />
            <input
                type="text"
                name="work"
                value={inputs.work || ""}
                className={classes.input}
                placeholder="Enter work"
                onChange={handleChange}
            />
            <input
                type="text"
                name="achievements"
                value={inputs.achievements || ""}
                placeholder="Enter achievements"
                className={classes.input}
                onChange={handleChange}
            />
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
            <button className={classes.submitButton} onClick={createUser}>Save</button>
        </form>
    );
}
export default PreparationAlert;