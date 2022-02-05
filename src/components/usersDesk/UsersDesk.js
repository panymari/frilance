import React, {useState, useEffect} from "react";
import classes from './UsersDesk.module.scss';
import {getDocs, collection} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/reducer/users/usersSlice";

const UsersDesk = () => {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    const [show, setShow] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
      }, [setUsers]);
      const dispatch = useDispatch();
      dispatch(setData(users));
    return (
        <div className={classes.usersDesk}>
            <div className={classes.addAlert}>Add your job alert</div>
            <div>
                {users.map((user) => (
                    <div  className={classes.user}>
                        <img className={classes.img} alt="userPhoto" src={user.img} />
                        <div>
                            <div className={classes.name}>{user.name} {user.sureName}</div>
                            <div className={classes.userName}>@{user.userName}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UsersDesk;