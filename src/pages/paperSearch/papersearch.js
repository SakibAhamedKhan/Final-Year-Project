import ConvertTime from "./converttime";
import image1 from '../../assets/img/Sakib.jpeg'
import { MdOutlineTravelExplore, MdOutlinePublish } from 'react-icons/md'
import { useEffect, useState } from "react";
import paper from '../../data/paper.json'

function PaperSearch() {
    const [data, setData] = useState([]);
    const [waitForData, setWaitForData] = useState(false);
    const [searchTyped, setSearchTyped] = useState('');


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

    const searchInput = event => {
        setWaitForData(false);
        setSearchTyped(event.target.value);
        
    }

    return (
        <div className="p-8 flex flex-col overflow-y-scroll h-screen">
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
    );
}

export default PaperSearch;