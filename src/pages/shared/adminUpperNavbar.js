import { NavLink, useNavigate } from "react-router-dom";
import image1 from './../../assets/img/Sakib.jpeg';
import {RiLogoutBoxRFill} from "react-icons/ri"
import {AiFillSetting} from "react-icons/ai"
import {CgProfile} from "react-icons/cg"
import userAuth from "../../hooks/userAuth";

function AdminUpperNavbar(props) {
    const {show, setShow} = props;
    const navigate = useNavigate();


    const changeShow = () => {
        setShow(!show);
    }

    
    const adminLogout =()=> {
        localStorage.removeItem("adminId");
        return navigate('/login')
    }
    return (
        <div className="bg-base-100 h-[50px] flex flex-row justify-between px-4">
            <div className="">
                <label onClick={changeShow} tabindex="0" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
            </div>
            <div className="lg:flex flex items-center">
                <h2 className="text-xl font-semibold">Admin Panel of Research More+ </h2>
            </div>
            <div className="justify-self-end">
                    
                    <div onClick={adminLogout}
                    className="btn btn-sm my-2  btn-outline rounded-[5px] capitalize"
                    >
                        logout
                    </div>
            </div>
    </div>
    );
}

export default AdminUpperNavbar;