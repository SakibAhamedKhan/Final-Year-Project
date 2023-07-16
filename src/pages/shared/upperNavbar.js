import { NavLink, useNavigate } from "react-router-dom";
import image1 from './../../assets/img/Sakib.jpeg';
import {RiLogoutBoxRFill} from "react-icons/ri"
import {AiFillSetting} from "react-icons/ai"
import {CgProfile} from "react-icons/cg"
import userAuth from "../../hooks/userAuth";

function UpperNavbar(props) {
    const {show, setShow} = props;
    const navigate = useNavigate();
    const [user, userAuthLoaading, refetch] = userAuth();

    const changeShow = () => {
        setShow(!show);
    }

    console.log(user);
    
    const logout = async() => {
        fetch(`http://localhost:8000/api/v1/user/logout`,{
            method: 'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({id: localStorage.getItem('userId')})
        })
        .then(res => res.json())
        .then(data => {
            localStorage.removeItem("userId");
            refetch();
            return navigate('/login');
        })
    }
    return (
        <div className="bg-base-100 h-[50px] flex flex-row justify-between px-4">
            <div className="">
                <label onClick={changeShow} tabindex="0" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
            </div>
            <div className="lg:flex flex items-center">
                <h2 className="text-xl font-semibold">Research More+</h2>
            </div>
            <div className="justify-self-end">
                {user?.status=='success' ?
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-[25px] rounded-full">
                            <img src={user.data.profileImage} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow dropdown-content bg-base-100 rounded-box w-40">
                            <li className="px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer w-full">
                                <div onClick={()=>{navigate('/profile')}} className="flex flex-row items-center">
                                <div className="text-lg pr-2"><CgProfile /></div>
                                <div>Profile</div>
                                </div>
                            </li>
                            {/* <li className="px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer w-full w-full">
                                <div className="flex flex-row items-center">
                                <div className="text-lg pr-2"><AiFillSetting /></div>
                                <div>Settings</div>
                                </div>
                            </li> */}
                            <li className="px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer w-full w-full">
                                <div onClick={logout} className="flex flex-row items-center">
                                <div  className="text-lg pr-2"><RiLogoutBoxRFill /></div>
                                <div>Log out</div>
                                </div>
                            </li>
                            </ul>
                    </div>
                    :
                    <div onClick={()=> {navigate('/login')}}
                    className="btn btn-sm my-2  btn-outline rounded-[5px] capitalize"
                    >
                        Login
                    </div>
                }
            </div>
    </div>
    );
}

export default UpperNavbar;