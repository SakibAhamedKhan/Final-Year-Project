
import { useEffect, useState } from "react";
import User from '../../data/user.json';
import image1 from '../../assets/img/Sakib.jpeg';
import Navbar from "../shared/navbar";
import UpperNavbar from "../shared/upperNavbar";
import UserAuthLoadingPage from "../shared/userAuthLoadingPage";
import { useNavigate, useParams } from "react-router-dom";
import userAuth from "../../hooks/userAuth";
import MyPublishedPaper from "./myPublishedPaper";
import {BsImage} from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from 'react-modal';
import { useQuery } from "react-query";
import { InfinitySpin } from "react-loader-spinner";


function ProfileViewed(props) {
    const { user_id } = useParams();
    const [users, setUsers] = useState({});
    const {show, setShow} = props;
    const [user, userAuthLoaading, refetch] = userAuth();
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [followButtonLoading, setFollowButtonLoading] = useState(false);
    const [unFollowButtonLoading, setUnFollowButtonLoading] = useState(false);
    

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          padding: '30px'
        },
      };
      const {data: userView, isLoading: userViewAuthLoaading, refetch: userViewRefetch} = useQuery('userView', () => {
        return  fetch(`http://localhost:8000/api/v1/user/${user_id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
        })
   
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
    
    if(userViewAuthLoaading){
        return (
            <div className="flex justify-center items-center">
            <InfinitySpin
                width='200'
                color="#4fa94d"
            />
        </div>
        )
    }


    let photo;
    const handleFile = event => {
		console.log(event.target.files[0]);
		photo = event.target.files[0];
		
	}

    if(user?.data._id===user_id){
        navigate('/profile')
    }

    const handleFollow = () => {
        setFollowButtonLoading(true);
        const doc = {
            followClicked: user?.data?._id,
            followed: userView?.data?._id,
        }
        fetch(`http://localhost:8000/api/v1/user/follow`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(doc)
            }).then(res => res.json())
            .then(data => {
                if(data.status === "success"){
                    setFollowButtonLoading(false);
                    refetch();
                    userViewRefetch();
                }
            })
    }

    const handleUnfollow = () => {
        setUnFollowButtonLoading(true);
        const doc = {
            followClicked: user?.data?._id,
            followed: userView?.data?._id,
        }
        fetch(`http://localhost:8000/api/v1/user/unfollow`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(doc)
            }).then(res => res.json())
            .then(data => {
                if(data.status === "success"){
                    setUnFollowButtonLoading(false);
                    refetch();
                    userViewRefetch();
                }
            })
    }

    const checkFollow = () => {
        console.log("yes");
        let flag=0;
        for(let i=0 ;i<user?.data?.following.length; i++){
            if(user?.data?.following[i] == userView?.data?._id){
                flag=1;
                break;
            }
        }

        if(flag==1){
            return <>
                {
                    unFollowButtonLoading?
                    <button type='submit'  className="btn btn-disabled btn-sm btn-error text-sm mb-2 text-white capitalize ml-2" >Loading...</button>
                    :
                    <button type='submit'  className="btn btn-sm btn-error text-sm mb-2 text-white capitalize ml-2" onClick={()=> handleUnfollow()}>Unfollow</button>
                }
            </>
            
        }
        return <> {
            followButtonLoading?
            <button type='submit'  className="btn btn-disabled btn-sm btn-info text-sm mb-2 text-white capitalize ml-2">Loading...</button>
            :
            <button type='submit'  className="btn btn-sm btn-info text-sm mb-2 text-white capitalize ml-2" onClick={() => handleFollow()}>Follow</button>
        } </>
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
                                <MyPublishedPaper id={userView?.data?._id}/>
                        </div>
                    </div>

                    
                    {/* Profile section*/}
                    <div className="w-[300px] ">
                        {/* Profile Details Section */}
                        <div className="card bg-base-100 drop-shadow-md rounded-[5px] p-8">
                            <div className="flex flex-col justify-between items-center mb-4">
                                <div>
                                {
                                    userView.data.profileImage?
                                    <div className="mb-4 flex justify-center items-center text-2xl">
                                        <div class="avatar online">
                                            <div class="w-24 rounded-full">
                                                <img src={`${userView.data.profileImage}`} />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="mb-2 flex justify-center items-center text-4xl">
                                        <BsImage/>
                                    </div>
                                }
                                </div>
                                <div>
                                    {/* <h2 className="font-semibold text-lg">Welcome,</h2> */}
                                    <p className="text-md font-semibold">{userView.data.firstName} {userView.data.lastName}</p>
                                </div>
                            </div>
                           

                            
                            <div className="flex justify-center">
                                        {
                                            checkFollow()
                                        }
                            </div>

                            <div className="flex justify-between">
                                <div className="font-bold flex text-sm mb-2 ">Following: {userView.data.following.length}</div>
                                
                                <div className="font-bold flex text-sm ">Foll0wers: {userView.data.followers.length}</div>
                            </div>

                            <div className="divider mt-[-5px] mb-[-5px]"></div> 
                            <div className="font-bold flex text-sm">Recent Institute: </div>
                            <p className="font-medium text-sm mb-2" >{userView.data.university}</p>

                            <div className="font-bold flex text-sm">Department: </div>
                            <p className="font-medium text-sm mb-2">{userView.data.department}</p>

                            <div className="font-bold flex text-sm">Role: </div>
                            <p className="font-medium text-sm mb-2">{userView.data.role}</p>


                            <div className="font-bold flex text-sm">Email: </div>
                            <p className="font-medium text-sm mb-2">{userView.data.email}</p>


                            <div className="font-bold flex text-sm">Contact Number: </div>
                            <p className="font-medium text-sm mb-2">{userView.data.contactNumber}</p>

                            
                        </div>
                        
                        {/* Profile Follower Suggection*/}
                    </div>

                   
                    
                </div>

                
            </div>
        </div>
        
    );
}

export default ProfileViewed;
