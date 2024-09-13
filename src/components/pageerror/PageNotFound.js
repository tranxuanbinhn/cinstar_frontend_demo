import { Link } from "react-router-dom"
import './pagenotfound.css';
export const PageNotFound = () => {
    return(
        <div className="notfound-ctn">
        <div className="notfound-background">
            <div className="notfound-img">
                <img src="https://res.cloudinary.com/daubnjjos/image/upload/v1722827207/header-logo_t4ycje.png"/>
            </div>
            <h3>The page you requested cannot be found!</h3>
            <p>Click here go back.<Link to={'/'}>Home</Link></p>
        </div>
    </div>
    )
}