
import { useNavigate } from "react-router-dom";
import userAuth from "../../hooks/userAuth";
import UserAuthLoadingPage from "../shared/userAuthLoadingPage";
import ToLoginAlert from "../shared/toLoginAlert";
import Navbar from "../shared/navbar";
import UpperNavbar from "../shared/upperNavbar";
import UniversityListBd from  '../../data/universityListBD'
import UniversityDepartment from "../../data/universityDepartment"
import universityList from "../../data/universityListBD";
import universityDepartment from "../../data/universityDepartment";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import PeopleCard from "../people/peopleCard";


const Following = (props) => {
    const {show, setShow} = props;
    const [user, userAuthLoaading] = userAuth();
    const navigate = useNavigate();
    const [loading, setLoading] =  useState(false);
    const [reserveData, setReserveData] = useState([]);
    const [data, setData] = useState([]);
    const [university, setUniversity] = useState(null);
    const [department, setDepartment] = useState(null);
    const [role, setRole] = useState(null);

    console.log(user);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/v1/user`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
            .then(data =>{
                if(user){
                    const d = data.data.filter(function(item){
                        let flag=0;
                        for(let i=0 ; i<user?.data?.following.length; i++){
                            if(user?.data?.following[i] === item._id){
                                flag=1;
                                break;
                            }
                        }
                        if(flag===1){
                            return true;
                        } else {
                            return false;
                        }
                    })
                    setData(d);
                    setReserveData(d);
                    setLoading(false);
                } else{
                    let id = localStorage.getItem('userId');
                    fetch(`http://localhost:8000/api/v1/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    }).then(res => res.json())
                    .then(data1 => {
                        const d = data.data.filter(function(item){
                            let flag=0;
                            for(let i=0 ; i<data1?.data?.following.length; i++){
                                if(data1?.data?.following[i] === item._id){
                                    flag=1;
                                    break;
                                }
                            }
                            if(flag===1){
                                return true;
                            } else {
                                return false;
                            }
                        })
                        setData(d);
                        setReserveData(d);
                        setLoading(false);
                    })
                }
            })
    }, []);

    useEffect(()=>{
        // All null
        if(university===null && department===null && role===null){
            console.log("All null")
        }
        //university
        else if(university && department===null && role===null){
           console.log("university");
           const d = reserveData.filter(function(item){
                let flag=0;
                if(item.university===university){
                    flag=1;
                }
                return flag===1;
           })
           setData(d);
        }
        // department
        else if(university===null && department && role===null){
            console.log("department");
            const d = reserveData.filter(function(item){
                let flag=0;
                if(item.department===department){
                    flag=1;
                }
                return flag===1;
           })
           setData(d);
        }
        // role
        else if(university===null && department===null && role){
            console.log("Role");
            const d = reserveData.filter(function(item){
                let flag=0;
                if(item.role===role){
                    flag=1;
                }
                return flag===1;
           })
           console.log(d);
           setData(d);
        }
        // university + department
        else if(university && department && role===null){
            console.log("university + department");
            const d = reserveData.filter(function(item){
                let flag=0;
                if(item.university===university && item.department === department){
                    flag=1;
                }
                return flag===1;
           })
           setData(d);
        }
        // university + role
        else if(university && department===null && role){
            console.log("university + role");
            const d = reserveData.filter(function(item){
                let flag=0;
                if(item.university===university && item.role === role){
                    flag=1;
                }
                return flag===1;
           })
           setData(d);
        }
        // department + role 
        else if(university===null && department && role){
            console.log("department + role");
            const d = reserveData.filter(function(item){
                let flag=0;
                if(item.department===department && item.role === role){
                    flag=1;
                }
                return flag===1;
           })
           setData(d);
        } 
        // All are choosen
        else if(university && department && role){
            console.log("All are choosen");
            const d = reserveData.filter(function(item){
                let flag=0;
                if(item.university === university && item.department===department && item.role === role){
                    flag=1;
                }
                return flag===1;
           })
           setData(d);
        }
    },[university, department, role]);

    
    if(userAuthLoaading==false){
        if(user?.status=='fail'){
            console.log("DOne done ");
            return <ToLoginAlert show={show} setShow={setShow} message={`Please login to see news feed page!`}/>
        }
    } else {
        return (
            <UserAuthLoadingPage show={show} setShow={setShow}/>
        )
    }

    const handleSelectUniversity = (e) => {
        setUniversity(e.target.value);
    }
    const handleSelectDepartment = (e) => {
        setDepartment(e.target.value);
    }
    const handleSelectRole = (e) => {
        setRole(e.target.value);
    }

    // const handleClearFilter = () => {
    //     this.forceUpdate();
    // }
   
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
                    {/* ############################### Modal of Post ##################################### */}
                    <div className="self-center w-[900px] mt-2 mb-6">
                        <div className="flex justify-between">
                            <select onChange={handleSelectUniversity} className="select select-sm select-bordered text-sm w-[250px]">
                                <option disabled selected>University</option>
                                {
                                    universityList.map((d, index) => <option key={index} value={d.label}>{d.label}</option>)
                                }
                            </select>
                            <select onChange={handleSelectDepartment} className="select select-sm select-bordered text-sm w-[250px]">
                                <option disabled selected>Department</option>
                                {
                                    universityDepartment.map((d, index) => <option key={index} value={d.label}>{d.label}</option>)
                                }
                            </select>
                            <select onChange={handleSelectRole} className="select select-sm select-bordered text-sm w-[250px]">
                                <option value="all" disabled selected>Status</option>
                                <option value="Professor">Professor</option>
                                <option value="Student">Student</option>
                            </select>
                            
                            <a href="http://localhost:3000/follower"  className="btn btn-sm btn-error ml-2 text-white">Clear Filter</a>
                        </div> 
                          
                    </div>

                    <div className="flex justify-center">
                        {
                            loading?
                            <div className="flex justify-center items-center">
                                <InfinitySpin
                                    width='200'
                                    color="#4fa94d"
                                />
                            </div>
                            :
                            <div className="grid grid-cols-3 gap-6 w-fit mb-4">
                                {
                                    data?.map((d, index) => <PeopleCard key={index} data={d}/>)
                                }
                            </div>
                        }
                        
                    </div>



                    {/* #################################### Card ######################################## */}


                </div>
                
                
            </div>
        </div>
       
    );
}

export default Following;