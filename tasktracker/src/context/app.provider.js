import { useEffect, useState } from "react";
import { AppContext } from "./appContext";
import Toast from "../components/Toast/Toast";
import { userDetails } from "../services/end-point";

export const AppProvider = ({ children }) => {

    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const [showtoast, setShowToast] = useState({ message: "", type: "", show: false });


    const showAlert = (data) => {
        setShowToast({ ...data, show: true })
        setTimeout(() => {
            setShowToast({ message: "", type: "", show: false })
        }, 3000)
    }
    

    const updateUser = (data) => {
        setUser(data);
        setisAuthenticated(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('refresh-token', data.refreshToken );
    }

    const logOut = () => {
        setUser(undefined)
        setisAuthenticated(false);
        localStorage.removeItem('token')
        localStorage.removeItem('refresh-token');
    }


    const appContext = {
        user,
        isAuthenticated,
        showAlert,
        updateUser,
        logOut
    };


    return (
        <AppContext.Provider value={appContext}>
            <div style={{width:'100%'}}>
                <div style={{ position: 'relative' }}>
                    {
                        showtoast.show && <Toast type={showtoast?.type} message={showtoast?.message} />
                    }
                        {children}
                </div>
            </div>
        </AppContext.Provider>
    )
}