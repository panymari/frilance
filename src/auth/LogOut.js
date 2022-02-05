import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setData } from '../redux/reducer/googleUser/gooleUserSlice';

const LogOut = () => {
  const clientId = process.env.REACT_APP_GOOGLE_TOKEN;
  const dispatch = useDispatch();
  const onSuccess = () => {
    console.log('LogOut was made successfully');
    dispatch(setData(null));
  };
  return (
    <div>
      <GoogleLogout
        buttonText="LogOut"
        clientId={clientId}
        onLogoutSuccess={onSuccess}
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
            <i aria-hidden="true" className="fa fa-sign-out" style={{ marginRight: '1rem' }} /> LogOut
          </button>
        )}
      />
    </div>
  );
};
export default LogOut;
