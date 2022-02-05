import React, {useState} from 'react';
import classes from './Header.module.scss';
import { useSelector } from 'react-redux';
import LogIn from '../../auth/LogIn';
import LogOut from '../../auth/LogOut';

const Header = () => {
    const [show, setShow] = useState(true);
    const showOrHide = () => {
        setShow(!show);
    }
    const googleUser = useSelector((state) => state.googleUser.googleUser);
    return (
        <div className={classes.header}>
            <div className={classes.logo}>Frilance</div>
            <div className={classes.user} onClick={showOrHide}>
                {googleUser ? (
                    <img alt="userPhoto" className={classes.googleUserPhoto} src={googleUser?.imageUrl} />
                ) : (
                    <i aria-hidden="true" className="fa fa-user fa-3x" />
                )}
            </div>
            <div className={show ? classes.hideBlock : classes.block}>
                    {googleUser ? (
                        <>
                            <div className={classes.googleProfile}>
                                <img alt="userPhoto" className={classes.googleUserPhotoProfile} src={googleUser?.imageUrl} />
                                <div className={classes.googleInfo}>
                                    <div className={classes.googleUserName}>{googleUser?.name}</div>
                                    <div>{googleUser?.email}</div>
                                </div>
                            </div>
                            <LogOut />
                        </>
                    ) : (
                        <LogIn />
                    )}
                </div>
        </div>
    );
}

export default Header;