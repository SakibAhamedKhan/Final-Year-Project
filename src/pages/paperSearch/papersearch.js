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

function PaperSearch(props) {
    const [data, setData] = useState([]);
    const [waitForData, setWaitForData] = useState(false);
    const [searchTyped, setSearchTyped] = useState('');
    const {show, setShow} = props;

    //const [user, userAuthLoaading] = userAuth();
    //const navigate = useNavigate();

   

    useEffect(() => {
        setData(paper.data);
        setWaitForData(true);
    }, []);

    useEffect(() => {
        const filteredData = paper.data.filter(item => {
            const title = item.paper_tile.toLowerCase();
            const searchT = searchTyped.toLowerCase();
            return title.includes(searchT);
        }
        );
        setData(filteredData);
        setWaitForData(true);
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

    const searchInput = event => {
        setWaitForData(false);
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
                    <div className="self-center w-[600px]">
                        <input type="text" onChange={searchInput} placeholder="Search here..." class="input input-bordered input-sm w-full border-0 focus:outline-0 drop-shadow-md rounded-[5px]" />
                        <p className="mb-[-20px] mt-[20px] text-gray-400">{data.length} result showing now</p>
                    </div>

                    
                    {/* Search Results */}
                    <div className="self-center w-[600px]">
                        {
                            waitForData ?
                                data.map((d, index) => <div className="card bg-base-100 drop-shadow-md my-10 rounded-[5px]">
                                    <div className="p-4">
                                        <h2 className="font-bold">{d.paper_tile}</h2>
                                        <ConvertTime key={d._id} date={d.date} />

                                        <div className="flex items-center pt-3 justify-between">
                                            {/* Profile Information */}
                                            <div className="flex items-center ">
                                                <div className="avatar">
                                                    <div className="w-6 rounded-full">
                                                        <img src={`${image1}`} />
                                                    </div>
                                                </div>
                                                <div className="ml-2">
                                                    <h2 className="text-sm font-semibold">{d.published_user.name}</h2>
                                                </div>
                                            </div>
                                            {/* Explore Button */}
                                            <div>
                                                <button class="btn btn-sm gap-2 btn-outline capitalize rounded-[5px]">
                                                    <MdOutlineTravelExplore />
                                                    Explore
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                                :
                                <div>Loading</div>
                        }
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default PaperSearch;