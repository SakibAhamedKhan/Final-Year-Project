import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './navbar.css'
import {BiNews} from 'react-icons/bi';
import {MdOutlineManageSearch, MdPublishedWithChanges} from 'react-icons/md'
import {FiHelpCircle} from 'react-icons/fi'
import {GiShadowFollower} from "react-icons/gi"
import {RiUserFollowFill} from "react-icons/ri"
import {AiOutlineProject} from 'react-icons/ai'

function Navbar(props) {
    const {show} = props;

    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <div className="px-4 pt-2">
            <ul className="flex flex-col items-center">
                <li><NavLink to='/' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><MdOutlineManageSearch/></div>
                        <p className={`${show ? '':'hidden'}`}>Search Paper</p>
                    </div>      
                </NavLink></li>
                {/* <li><NavLink to='/newsFeed' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><BiNews/></div>
                        <p className={`${show ? '':'hidden'}`}>News Feed</p>
                    </div>   
                </NavLink></li> */}
                <li><NavLink to='/people' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><MdOutlineManageSearch/></div>
                        <p className={`${show ? '':'hidden'}`}>Search People</p>
                    </div>   
                </NavLink></li>
                <li><NavLink to='/paperpublish' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><MdPublishedWithChanges/></div>
                        <p className={`${show ? '':'hidden'}`}>Publish Paper</p>
                    </div>      
                </NavLink></li>
                <li><NavLink to='/paperpublishdraft' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><MdPublishedWithChanges/></div>
                        <p className={`${show ? '':'hidden'}`}>Paper Draft</p>
                    </div>      
                </NavLink></li>
                {/* <li><NavLink to='/community' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><FiHelpCircle/></div>
                        <p className={`${show ? '':'hidden'}`}>Community Help</p>
                    </div>     
                </NavLink></li> */}

                <li><NavLink to='/govermentproject' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><AiOutlineProject/></div>
                        <p className={`${show ? '':'hidden'}`}>Govt Project</p>
                    </div>     
                </NavLink></li>

                 <li><NavLink to='/follower' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><GiShadowFollower/></div>
                        <p className={`${show ? '':'hidden'}`}>Followers</p>
                    </div>     
                </NavLink></li>

                <li><NavLink to='/following' className={`btn btn-sm my-2 ${show? 'w-44': 'w-8'} btn-outline rounded-[5px] capitalize`}>
                    <div className="flex flex-row jusity-start items-center">
                        <div className={` ${show? 'pr-2':''}  text-lg`}><RiUserFollowFill/></div>
                        <p className={`${show ? '':'hidden'}`}>Following</p>
                    </div>     
                </NavLink></li>

                {/* <li><NavLink to='/profile' className="btn btn-sm my-2 w-56 btn-outline rounded-[5px]">Profile</NavLink></li> */}
                
            </ul>
        </div>
    );
}

export default Navbar;