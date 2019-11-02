import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    const authenticatedUser = props.context.authenticatedUser;
        
    return ( 
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    {authenticatedUser ? (
                        <React.Fragment>
                            <span>Welcome, {authenticatedUser.firstName}!</span>
                            <Link to="/signout" className="signout">Sign Out</Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link to="/signup" className="signup">Sign Up</Link>
                            <Link to="/signin" className="signin">Sign In</Link>
                        </React.Fragment>
                    )}
                </nav>
            </div>
        </div>
    );
}
 
export default Header;