import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './navbar.css'
import {BiNews} from 'react-icons/bi';
import {MdOutlineManageSearch, MdPublishedWithChanges} from 'react-icons/md'
import {BsShieldFillCheck} from 'react-icons/bs'
import {GiShadowFollower} from "react-icons/gi"
import {RiUserFollowFill} from "react-icons/ri"
import {AiOutlineProject} from 'react-icons/ai'

function AdminNavbar(props) {
    const {show} = props;

    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <div className="px-4 pt-2">
            <ul className="flex flex-col items-center">
                <li><NavLink to='/admin' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><BsShieldFillCheck/></div>
                        <p className={`${show ? '':'hidden'}`}>Paper Approval</p>
                    </div>      
                </NavLink></li>
                
            </ul>
        </div>
    );
}

export default AdminNavbar;