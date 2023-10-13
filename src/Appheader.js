import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdate] = useState(false); // Updated state variable name
    const usenavigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            showmenuupdate(false);

        } else {
            showmenuupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
                
            }
        }
    }, [location]);
    
    return (
        <div>
            {showmenu && (
                <div className="header" style={{ backgroundColor: "rgb(8, 28, 44)" }}>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/customer'}>Customer</Link>
                    <span style={{ marginLeft: '70%', color: 'white' }}>Welcome <b>{displayusername}</b></span>
                    <Link style={{ float: 'right', color: 'white' }} to={'/login'}>Logout</Link>
                </div>
            )}
        </div>
    );
}

export default Appheader;
