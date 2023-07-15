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
import PeopleCard from "./peopleCard";


const SearchPeople = (props) => {
    const {show, setShow} = props;
    const [user, userAuthLoaading] = userAuth();
    const navigate = useNavigate();
    const [loading, setLoading] =  useState(false);
    const [reserveData, setReserveData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/v1/user`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
            .then(data =>{
                setData(data.data);
                setReserveData(data.data);
                setLoading(false);
            })
    }, []);

    
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

    const handleSelect = () => {

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
                    {/* ############################### Modal of Post ##################################### */}
                    <div className="self-center w-[800px] mt-2 mb-6">
                        <div className="flex justify-between">
                            <select onChange={handleSelect} className="select select-sm select-bordered text-sm w-[250px]">
                                <option disabled selected>University</option>
                                {
                                    universityList.map((d, index) => <option key={index} value={d.label}>{d.label}</option>)
                                }
                            </select>
                            <select onChange={handleSelect} className="select select-sm select-bordered text-sm w-[250px]">
                                <option disabled selected>Department</option>
                                {
                                    universityDepartment.map((d, index) => <option key={index} value={d.label}>{d.label}</option>)
                                }
                            </select>
                            <select onChange={handleSelect} className="select select-sm select-bordered text-sm w-[250px]">
                                <option value="all" disabled selected>Status</option>
                                <option value="professor">Professor</option>
                                <option value="student">Student</option>
                            </select>
                            
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
                            <div className="grid grid-cols-3 gap-6 w-fit">
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

export default SearchPeople;