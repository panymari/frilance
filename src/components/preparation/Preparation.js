import React, { useState, useEffect } from "react";
import classes from './Preparation.module.scss';
import { db } from "../../firebase/firebaseConfig";
import {collection, getDocs, doc, addDoc} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/reducer/users/usersSlice";

const Preparation = () => {
    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputs('');
        setShow();
    }
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    
    const createUser = async () => {
        await addDoc(usersCollectionRef, { 
            name: inputs.name, 
            sureName: inputs.surename,
            userName: inputs.userName,
            dateOfBirth: inputs.dateOfBirth,
            education: inputs.education,
            work: inputs.work,
            achievements: inputs.work,
            img: inputs.image,
        });
    };
    useEffect(() => {
      const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getUsers();
    }, [usersCollectionRef]);
    const dispatch = useDispatch();
    dispatch(setData(users));

    return (
        <div className={classes.preparation}>
            <div className={classes.preparationPhoto}></div>
            <div className={classes.preparationAlert}>Prepare for your job search</div>
            <button className={classes.preparationAlertButton} onClick={setShow}>Create job alert</button>
            <div className={show ? classes.modalShow : classes.modalHide}></div>
            <form onSubmit={handleSubmit} className={show ? classes.formShow : classes.formHide}>
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
                <input
                    type="text"
                    name="image"
                    value={inputs.image || ""}
                    placeholder="Enter image-url"
                    className={classes.input}
                    onChange={handleChange}
                />
                <button className={classes.submitButton} onClick={createUser}>Save</button>
                <button className={classes.crossButton} onClick={setShow}>
                    <i className="fa fa-times" aria-hidden="true" />
                </button>
            </form>
        </div>
    );
}

export default Preparation;