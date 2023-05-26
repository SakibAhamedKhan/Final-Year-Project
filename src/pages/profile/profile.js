import { useEffect, useState } from "react";
import User from '../../data/user.json';
import image1 from '../../assets/img/Sakib.jpeg';
import Navbar from "../shared/navbar";
import UpperNavbar from "../shared/upperNavbar";
import UserAuthLoadingPage from "../shared/userAuthLoadingPage";
import { useNavigate } from "react-router-dom";
import userAuth from "../../hooks/userAuth";

function Profile(props) {
    const [users, setUsers] = useState({});
    const {show, setShow} = props;
    const [user, userAuthLoaading] = userAuth();
    const navigate = useNavigate();

   
    console.log(user);
    useEffect(() => {
        setUsers(User);
    },[])
    console.log(user);
    if(userAuthLoaading==false){
        if(user?.status=='fail'){
            console.log("DOne done ");
            return navigate('/login');
        }
    } else {
        return (
            <UserAuthLoadingPage show={show} setShow={setShow}/>
        )
    }

    return (
        <div className='flex flex-row'>
            <div className={`${show? '': 'bg-white w-[50px]'} border-r-2 h-screen border-gray-2001`} >
                <Navbar show={show}/>
            </div>

            <div className="w-full bg-gray-100 relative">
                <div className='h-[40px] bg-white w-full drop-shadow-md absolute z-10'>
                    <UpperNavbar show={show} setShow={setShow}/>
                </div>
                <div className="px-8 pt-16 pb-2 flex flex-col overflow-y-scroll h-screen">
                    <div className="card bg-base-100 drop-shadow-md rounded-[5px] p-8">
                        <h2 className="mb-4 font-semibold text-xl">Welcome, {user.data.firstName} {user.data.lastName}</h2>
                        <div className="mb-4">
                            <div class="avatar online">
                                <div class="w-24 rounded-full">
                                    <img src={image1} />
                                </div>
                            </div>
                        </div>
                        <div className="font-bold flex mb-2">Name: <p className="pl-2 font-medium">{user.data.firstName} {user.data.lastName}</p></div>
                        <div className="font-bold flex mb-2">Last Institute: <p className="pl-2 font-medium">{user.data.university}</p></div>
                        <div className="font-bold flex mb-2">Department: <p className="pl-2 font-medium">{user.data.department}</p></div>
                        <div className="font-bold flex mb-2">Role: <p className="pl-2 font-medium">{user.data.role}</p></div>
                        <div className="font-bold flex mb-2">Email: <p className="pl-2 font-medium">{user.data.email}</p></div>
                        <div className="font-bold flex mb-2">Contact Number: <p className="pl-2 font-medium">{user.data.contactNumber}</p></div>

                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Profile;