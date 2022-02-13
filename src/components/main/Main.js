import React from "react";
import Preparation from "../preparation/Preparation";
import Welcom from "../welcom/Welcom";
import UsersDesk from "../usersDesk/UsersDesk";
import classes from './Main.module.scss';

const Main = () => {
    return (
        <div>
            <UsersDesk />
            <div className={classes.main}>
                <Welcom />
                <Preparation />
            </div>
        </div>
    );
}

export default Main;