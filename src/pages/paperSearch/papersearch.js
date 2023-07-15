import ConvertTime from "./converttime";
import image1 from '../../assets/img/Sakib.jpeg'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { useEffect, useState } from "react";
import paper from '../../data/paper.json'
import Navbar from "../shared/navbar";
import UpperNavbar from "../shared/upperNavbar";
import userAuth from "../../hooks/userAuth";
import { useNavigate } from "react-router-dom";
import UserAuthLoadingPage from "../shared/userAuthLoadingPage";
import { useQuery } from "react-query";
import AuthorShow from "../shared/authorShow";
import { InfinitySpin } from "react-loader-spinner";
import PaperCard from "./paperCard";

function PaperSearch(props) {
    const [data, setData] = useState([]);
    const [reserveData, setReserveData] = useState([]);
    const [waitForData, setWaitForData] = useState(false);
    const [searchTyped, setSearchTyped] = useState('');
    const [paper, setPaper] = useState({});
    const [loading, setLoading] = useState(false);
    const {show, setShow} = props;


    //const [user, userAuthLoaading] = userAuth();
    //const navigate = useNavigate();

     
    // const {data: paper, isLoading: paperLoading, refetch} = useQuery('paperFetch2', () => {
    //     return  fetch(`http://localhost:8000/api/v1/published-paper/get-all-papers/paper`, {
    //             method: 'GET',
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //         }).then(res => res.json())
    //         .then(data =>{
    //             setData(data);
    //         })
    //     })
    
    

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/v1/published-paper/get-all-papers/paper`, {
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
    useEffect(() => {
        const filteredData = reserveData?.filter(item => {
            const title = item.title.toLowerCase();
            const searchT = searchTyped.toLowerCase();
            console.log(item.title);
            return title.includes(searchT);
        }
        );
        console.log(filteredData);
        setData(filteredData);
        setWaitForData(false);
    }, [searchTyped])
   

    /* 
        User Auth Part (Paper search don't need to protect for login) 
    */
    // if(userAuthLoaading==false){
    //     if(user?.status=='fail'){
    //         console.log("DOne done ");
    //         return navigate('/login');
    //     }
    // } else {
    //     return (
    //         <UserAuthLoadingPage show={show} setShow={setShow}/>
    //     )
    // }
    // if(paperLoading){
    //     return (
           
    //         <div className="flex justify-center items-center">
    //             <InfinitySpin
    //                 width='200'
    //                 color="#4fa94d"
    //             />
    //         </div>
           
    //     ) 
    // }
    console.log(data);
    const searchInput = event => {
        setWaitForData(true);
        setSearchTyped(event.target.value);
       

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
                    {/* Search Input Section */}
                    <div className="self-center w-[500px] mt-2 mb-[-5px]">
                        <input type="text" onChange={searchInput} placeholder="Search here..." class="input input-bordered input-sm w-full border-0 focus:outline-0 drop-shadow-md rounded-[5px]" />
                        {/* <p className="mb-[-25px] mt-[15px] text-gray-400"> result showing now</p> */}
                    </div>

                    
                    {/* Search Results */}
                    <div className="self-center w-[800px]">
                        {
                            loading || waitForData?
                            <div className="flex justify-center items-center">
                                <InfinitySpin
                                    width='200'
                                    color="#4fa94d"
                                />
                            </div>
                            :
                            data?.map((d, index) => <PaperCard key={index} d={d}/>)
                                
                        }
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default PaperSearch;