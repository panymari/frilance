import React, { useState, useEffect } from "react";
import classes from './UsersDesk.module.scss';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/reducer/users/usersSlice";

const UsersDesk = () => {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    const [show, setShow] = useState(false);
    const [userProfile, getUserProfile] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, [setUsers]);
    const dispatch = useDispatch();
    dispatch(setData(users));

    const handleId = (e) => {
        setShow(true);
        const result = users.filter(user => user.id == e.currentTarget.id);
        getUserProfile(result);
    }
    const offTheProfile = () =>{
        setShow(!show);
    }
    return (
        <div className={classes.usersDesk}>
            <div className={show ? classes.modalShow : classes.modalHide}></div>
            <div className={classes.users}>
                {users.map((user) => (
                    <div className={classes.user}>
                        <img className={classes.img} alt="userPhoto" src={user.img} />
                        <div>
                            <div className={classes.name}>{user.name} {user.sureName}</div>
                            <div id={user.id} onClick={handleId} className={classes.userName}>@{user.userName}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={show ? classes.userProfileShow : classes.userProfileHide}>
                {userProfile.map((item) => (
                    <>
                        <img className={classes.imgProfile} alt="userPhoto" src={item.img} />
                        <div className={classes.userInfo}>
                            <div><span>Full name:</span> {item.name} {item.sureName}</div>
                            <div><span>User name:</span> {item.userName}</div>
                            <div><span>Date of birth:</span> {item.dateOfBirth}</div>
                            <div><span>Education:</span> {item.education}</div>
                            <div><span>Work:</span> {item.work}</div>
                            <div><span>Achievments:</span> {item.achievements}</div>
                        </div>
                    </>
                ))}
                    {/* <>
                        <img className={classes.imgProfile} alt="userPhoto" src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" />
                        <div className={classes.userInfo}>
                            <div><span>Full name:</span> Lol lolich</div>
                            <div><span>UserName:</span> maria1212</div>
                            <div><span>Date:</span> 12.09.2000</div>
                            <div><span>Education:</span> MRK</div>
                            <div><span>Work:</span> FrontEnd</div>
                            <div><span>Achievments:</span> Cool web site</div>
                        </div>
                    </> */}
                <button className={classes.crossButton} onClick={offTheProfile}>
                    <i className="fa fa-times" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}

export default UsersDesk;