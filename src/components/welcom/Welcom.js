import React from "react";
import { useSelector } from "react-redux";
import classes from './Welcom.module.scss';

const Welcom = () => {
    const googleUser = useSelector((state) => state.googleUser.googleUser);

    return (
        <div className={classes.welcome}>
            {googleUser ? (
                <>
                    <img alt="userPhoto" src={googleUser?.imageUrl} className={classes.googleUserImage} />
                    <div className={classes.text}>Welcome, {googleUser?.givenName}!</div>
                </>
            ) : (
                <>
                    <div className={classes.noPhoto}>
                        <i aria-hidden="true" className="fa fa-camera fa-3x" />
                    </div>
                    <div className={classes.text}>Please, log in ;)</div>
                </>
            )}
        </div>
    );
}

export default Welcom;