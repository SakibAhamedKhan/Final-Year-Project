import { useEffect, useState } from "react";
import User from '../../data/user.json';
import image1 from '../../assets/img/Sakib.jpeg';
import Navbar from "../shared/navbar";
import UpperNavbar from "../shared/upperNavbar";
import UserAuthLoadingPage from "../shared/userAuthLoadingPage";
import { useNavigate } from "react-router-dom";
import userAuth from "../../hooks/userAuth";
import MyPublishedPaper from "./myPublishedPaper";
import {BsImage} from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from 'react-modal';


function Profile(props) {
    const [users, setUsers] = useState({});
    const {show, setShow} = props;
    const [user, userAuthLoaading, refetch] = userAuth();
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);


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
    let photo;
    const handleFile = event => {
		console.log(event.target.files[0]);
		photo = event.target.files[0];
		
	}

    const handleProfilePic =async (event) => {
        event.preventDefault();
        // const { value: file } = await Swal.fire({
        //     title: 'Select image',
        //     input: 'file',
        //     inputAttributes: {
        //       'accept': 'image/*',
        //       'aria-label': 'Upload your profile picture'
        //     }
        //   })
          
        //   if (file) {
        //     console.log(file);
        //     fetch(`https://api.imgbb.com/1/upload?key=67239badb30bb088d3c2e1bdcd10afbb`,{
        //         method: 'POST',
        //         body: file
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //     })
            
        //   }
        const formData = new FormData();
		formData.append('image', photo);
		console.log(formData);
		fetch(`https://api.imgbb.com/1/upload?key=67239badb30bb088d3c2e1bdcd10afbb`,{
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then(data => {
            if(data.success){
				console.log(data);
				const img = data.data.url;
				const doc ={
					email: user.data.email,
					ImageURL: img,
				}
				fetch(`http://localhost:8000/api/v1/user/profilePic`,{
					method: 'PATCH',
					headers:{
						'content-type': 'application/json',
						
					},
					body: JSON.stringify(doc)
				})
				.then(res => res.json())
				.then(async (data) => {
                    await refetch();
					if(data?.data.acknowledged){
						Swal.fire(
							'Hurrah! Your Profile Picture Submitted 😎',
							'',
							'success'
						  )
					}
                    
				})
			}
            setIsOpen(false);
        })
       
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
                                <MyPublishedPaper id={user?.data?._id}/>
                        </div>
                    </div>

                    
                    {/* Profile section*/}
                    <div className="w-[300px] ">
                        {/* Profile Details Section */}
                        <div className="card bg-base-100 drop-shadow-md rounded-[5px] p-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="font-semibold text-lg">Welcome,</h2>
                                    <p className="text-md">{user.data.firstName}</p>
                                </div>
                                <div>
                                {
                                    user.data.profileImage?
                                    <div className="mb-4 flex justify-center items-center text-2xl">
                                        <div class="avatar online">
                                            <div class="w-24 rounded-full">
                                                <img src={`${user.data.profileImage}`} />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="mb-4 flex justify-center items-center text-4xl">
                                        <BsImage/>
                                    </div>
                                }
                                </div>
                            </div>
                            {
                                        user.data.profileImage?
                                        <button onClick={()=> setIsOpen(true)}  className="btn btn-sm btn-error text-white text-sm my-4 capitalize">Update Profile Picture</button>
                                        :
                                        <button onClick={()=> setIsOpen(true)}  className="btn btn-sm btn-error text-sm my-4 text-white capitalize">Upload Profile Picture</button>
                            }
                              

                            {/* Modal of Profile Pic Update */}
                            <Modal
                                isOpen={modalIsOpen}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <form  onSubmit={handleProfilePic}>
                                    <input onBlur={handleFile} name='photo' type="file" placeholder="file" class="input input-bordered h-14  mb-3 pt-3 w-fit"  required/>
                                    <div className="flex justify-center">
                                        <button type='submit'  className="btn btn-sm btn-error text-sm my-4 text-white capitalize">Submit</button>
                                        <button type='submit'  className="btn btn-sm btn-info text-sm my-4 text-white capitalize ml-2" onClick={()=> setIsOpen(false)}>Cancel</button>
                                    </div>
                                </form>
                            </Modal>

                            <div className="flex justify-between">
                                <div className="font-bold flex text-sm mb-2 ">Following: {user.data.following.length}</div>
                                
                                <div className="font-bold flex text-sm ">Foll0wers: {user.data.followers.length}</div>
                            </div>

                            <div className="divider mt-[-5px] mb-[-5px]"></div> 

                            <div className="font-bold flex text-sm">Name: </div>
                            <p className="font-medium text-sm mb-2">{user.data.firstName} {user.data.lastName}</p>

                            <div className="font-bold flex text-sm">Recent Institute: </div>
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