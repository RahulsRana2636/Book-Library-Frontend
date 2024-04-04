import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataAppContext = React.createContext();

const DataApp = (props) => {
    const initialValues = { loginstatus: false, username: 'User 1', balanceAmount: 0, bgColor: 'white' }
    const [appstate, setAppState] = useState(initialValues);
    const navigate = useNavigate();

    const checkLogin = () => {
        let token = localStorage.getItem('token');
        if (token) {
            setAppState({ ...appstate, loginstatus: true });
        }
        else {
            setAppState({ ...appstate, loginstatus: false });
        }
    }

    useEffect(() => {
        checkLogin();
    }, [])

    const login = () => {
        setAppState({ ...appstate, loginstatus: !appstate.loginstatus });
    }
    const login_user = () => {
        console.log('logging in')
        setAppState({ ...appstate, loginstatus: true });
    }
   

    return (
        <DataAppContext.Provider value={{ appstate, login, login_user }}>
            <div className='app-wrapper'>
                {props.children}
            </div>
        </DataAppContext.Provider>
    )
}

export default DataApp;

export { DataAppContext };