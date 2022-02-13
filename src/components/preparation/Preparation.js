import React, { useState, useEffect } from "react";
import classes from './Preparation.module.scss';
import { db } from "../../firebase/firebaseConfig";
import {collection, getDocs, doc, addDoc} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/reducer/users/usersSlice";
import Achievments from '../achievments/Achievments';

const Preparation = () => {
    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);
    const [myProfile, setMyProfile] = useState({});

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
    
    const createUser = () => {
        setMyProfile(inputs);
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
    const googleUser = useSelector((state) => state.googleUser.googleUser);
    const googleUserName = googleUser?.email.split('@')[0];
    const invalidValueCheck = Object.values(inputs).includes("") || Object.values(inputs).length !== 3; 
    return (
        <div className={classes.preparation}>
            <div><span>Full name:</span> {googleUser?.name}</div>
            <div><span>User name:</span> {googleUserName}</div>

            <div>
                <span className={Object.keys(myProfile).length === 0 ? classes.hide : classes.show}>Date of birth:</span>{' '}
                {myProfile.dateOfBirth}
            </div>
            <div>
                <span className={Object.keys(myProfile).length === 0 ? classes.hide : classes.show}>Work:</span>{' '}
                {myProfile.work}
            </div>
            <div className={Object.keys(myProfile).length !== 0 ? classes.mb : classes.nb}>
                <span className={Object.keys(myProfile).length === 0 ? classes.hide : classes.show}>Education:</span>{' '}
                {myProfile.education}
            </div>

            <button className={Object.keys(myProfile).length === 0 ? classes.preparationAlertButton : classes.preparationAlertButtonHide} onClick={setShow}>Add additional info</button>
            <Achievments />
            <div className={show ? classes.modalShow : classes.modalHide}></div>
            <form onSubmit={handleSubmit} className={show ? classes.formShow : classes.formHide}>
                <input
                    type="text"
                    name="dateOfBirth"
                    value={inputs.dateOfBirth?.trim()}
                    className={classes.input}
                    placeholder="Enter date of birth"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="education"
                    value={inputs.education?.trim()}
                    placeholder="Enter education"
                    className={classes.input}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="work"
                    value={inputs.work?.trim()}
                    className={classes.input}
                    placeholder="Enter work"
                    onChange={handleChange}
                />
                <div className={invalidValueCheck ? classes.errorNot : classes.error}>Please entry all feilds!</div>
                <button disabled={invalidValueCheck} className={classes.submitButton} onClick={createUser}>Save</button>
                <button className={classes.crossButton} onClick={setShow}>
                    <i className="fa fa-times" aria-hidden="true" />
                </button>
            </form>
        </div>
    );
}

export default Preparation;