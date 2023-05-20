import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './navbar.css'

function Navbar() {
    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <div className="px-8 pt-6">
            <ul className="flex flex-col items-center">
                <li><NavLink to='/' className="btn btn-sm my-2 w-56 btn-outline rounded-[5px]">News Feed</NavLink></li>
                <li><NavLink to='/papersearch' className="btn btn-sm my-2 w-56 btn-outline rounded-[5px]">Search Paper</NavLink></li>
                <li><NavLink to='/paperpublish' className="btn btn-sm my-2 w-56 btn-outline rounded-[5px]">Publish Paper</NavLink></li>
                <li><NavLink to='/community' className="btn btn-sm my-2 w-56 btn-outline rounded-[5px]">Community Help</NavLink></li>
                {/* <li><NavLink to='/profile' className="btn btn-sm my-2 w-56 btn-outline rounded-[5px]">Profile</NavLink></li> */}
            </ul>
        </div>
    );
}

export default Navbar;