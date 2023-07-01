import { useEffect, useState } from "react";
import User from '../../data/user.json';
import image1 from '../../assets/img/Sakib.jpeg';
import Navbar from "../shared/navbar";
import UpperNavbar from "../shared/upperNavbar";
import UserAuthLoadingPage from "../shared/userAuthLoadingPage";
import { useNavigate } from "react-router-dom";
import userAuth from "../../hooks/userAuth";
import MyPublishedPaper from "./myPublishedPaper";

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
                <div className="pl-4 pr-2 pt-16 pb-2 flex overflow-y-scroll h-screen  w-full">
                    {/* Published paper section */}
                    <div className="flex-1 mr-6 overflow-y-scroll scrollbar-hide">
                        <div className="card bg-base-100 drop-shadow-md rounded-[5px] p-8">
                                <MyPublishedPaper/>
                        </div>
                    </div>

                    
                    {/* Profile section*/}
                    <div className="w-[300px] ">
                        {/* Profile Details Section */}
                        <div className="card bg-base-100 drop-shadow-md rounded-[5px] p-8">
                            <div className="flex justify-center items-center">
                                <div>
                                    <h2 className="font-semibold text-lg">Welcome,</h2>
                                    <p className="text-md">{user.data.firstName} {user.data.lastName}</p>
                                </div>
                                <div className="mb-4 flex justify-center items-center">
                                    <div class="avatar online">
                                        <div class="w-24 rounded-full">
                                            <img src={image1} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                            <div className="font-bold flex text-sm">Name: </div>
                            <p className="font-medium text-sm mb-2">{user.data.firstName} {user.data.lastName}</p>

                            <div className="font-bold flex text-sm">Last Institute: </div>
                            <p className="font-medium text-sm mb-2" >{user.data.university}</p>

                            <div className="font-bold flex text-sm">Department: </div>
                            <p className="font-medium text-sm mb-2">{user.data.department}</p>

                            <div className="font-bold flex text-sm">Role: </div>
                            <p className="font-medium text-sm mb-2">{user.data.role}</p>


                            <div className="font-bold flex text-sm">Email: </div>
                            <p className="font-medium text-sm mb-2">{user.data.email}</p>


                            <div className="font-bold flex text-sm">Contact Number: </div>
                            <p className="font-medium text-sm mb-2">{user.data.contactNumber}</p>


                        </div>
                        
                        {/* Profile Follower Suggection*/}
                    </div>

                   
                    
                </div>

                
            </div>
        </div>
        
    );
}

export default Profile;