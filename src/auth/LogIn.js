import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import refreshTokenSetUp from '../utils/refreshTokenSetUp';
import { setData } from '../redux/reducer/googleUser/gooleUserSlice';

const LogIn = () => {
  const clientId = process.env.REACT_APP_GOOGLE_TOKEN;

  const dispatch = useDispatch();

  const onSuccess = (res) => {
    console.log('[LogIn Success] currentUser:', res.profileObj);
    dispatch(setData(res.profileObj));
    refreshTokenSetUp(res);
  };
  const onFailure = (res) => {
    console.log('[LogIn failed] res:', res);
  };
  return (
    <div>
      <GoogleLogin
        buttonText="LogIn"
        clientId={clientId}
        cookiePolicy="single_host_origin"
        isSignedIn
        onFailure={onFailure}
        onSuccess={onSuccess}
        render={(renderProps) => (
          <button
            disabled={renderProps.disabled}
            onClick={renderProps.onClick}
            style={{
              padding: '0',
              width: '7rem',
              textAlign: 'start',
              backgroundColor: 'transparent',
              border: '0',
              color: 'white',
              fontSize: '1.3rem',
              marginLeft: '1.5rem',
            }}
          >
            <i aria-hidden="true" className="fa fa-sign-in" style={{ marginRight: '1rem' }} /> LogIn
          </button>
        )}
      />
    </div>
  );
};
export default LogIn;
