import { useEffect, useState } from "react";
import communityData from '../../data/community.json';
import ConvertTime from '../paperSearch/converttime';
import image1 from '../../assets/img/Sakib.jpeg';
import { AiFillCaretDown } from 'react-icons/ai';

function Community() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setData(communityData.data);
        setLoading(false);
    })
    return (
        <div className="p-8 flex flex-col overflow-y-scroll h-screen">
            <h2 className="text-center font-bold text-xl">Community Help</h2>
            
            <button className="btn btn-circle absolute bottom-10 right-10 z-10">
                <p className="text-[30px] text-white">+</p>
            </button>

            <div className="mt-5">
                {
                    !loading ?
                        <div className="grid grid-cols-3 gap-4">
                            {
                                data.map((d, index) => <div className={`card bg-base-100 drop-shadow-md m-1 rounded-[5px] p-6 flex flex-col justify-between ${d.solve === "yes" ? 'bg-green-300' : ''} ${d.solve === "no" ? 'bg-red-300' : ''} ${d.solve === "running" ? 'bg-orange-200' : ''} `}>

                                    <div>
                                        <h2 className="font-semibold text-lg">{d.question}</h2>
                                        <ConvertTime key={d._id} date={d.date} ></ConvertTime>
                                        <div className="flex items-center my-2">
                                            <div className="avatar">
                                                <div className="w-5 rounded-full">
                                                    <img src={`${image1}`} />
                                                </div>
                                            </div>
                                            <div className="ml-2">
                                                <h2 className="text-sm font-semibold">{d.user.name}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center my-2">
                                            <h3>Status: </h3>
                                            {
                                                d.solve == "yes" && <button className="btn text-white  btn-xs capitalize ml-1">Yes</button>
                                            }
                                            {
                                                d.solve == "no" && <button className="btn text-white  btn-xs capitalize ml-1">No</button>
                                            }
                                            {
                                                d.solve == "running" && <button className="btn text-white  btn-xs capitalize ml-1">Running</button>
                                            }
                                            {
                                                d.solve == "no_answered" && <button className="btn text-white  btn-xs capitalize ml-1">No Answered</button>
                                            }
                                        </div>
                                        <div className="flex items-center">
                                            <h2 className="mr-2">{d.comments.length} answered</h2>
                                            <button className="btn btn-outline btn-xs capitalize">
                                                Show Answer
                                                <AiFillCaretDown className="ml-2" />
                                            </button>
                                        </div>
                                    </div>

                                </div>)
                            }
                        </div>
                        :
                        <div>
                            Loading...
                        </div>
                }
            </div>
        </div>
    );
}

export default Community;