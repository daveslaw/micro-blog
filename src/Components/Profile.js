import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';


function Profile() {

    const appContext = useContext(AppContext);   

    const handleUserNameInput = (e) => {
        appContext.setUserName(e.target.value);
    };

    const saveUserName = () => {
        let savedUserName = JSON.stringify(appContext.userName);
        localStorage.setItem("UserName", savedUserName);
    }

    
    return (
        <>
            <div className="profile-wrapper">
                <div className="profile-heading">Profile</div>
                <div className="username-heading">User name</div>
                <input
                    className="profile-input"
                    value={appContext.userName}                    
                    onInput={handleUserNameInput}
                >
                    
                </input>
                <button
                    className="save-button"
                    onClick={saveUserName}
                >
                    Save
                </button>
            </div>

        </>
    )
}

export default Profile
