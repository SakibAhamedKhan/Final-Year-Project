import ConvertTime from "./converttime";
import image1 from '../../assets/img/Sakib.jpeg'
import {MdOutlineTravelExplore} from 'react-icons/md'

function PaperSearch() {
    const data = [
        {
            _id: 1,
            paper_tile: "Selecting a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 2,
            paper_tile: "Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Akbar",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 3,
            paper_tile: "Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Hasan Ali",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 4,
            paper_tile: "For a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 5,
            paper_tile: "Nowadays a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 6,
            paper_tile: "Become a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 7,
            paper_tile: "Selecting a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 8,
            paper_tile: "Become a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 9,
            paper_tile: "So a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 10,
            paper_tile: "Selecting a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 11,
            paper_tile: "Selecting a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 12,
            paper_tile: "Selecting a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 13,
            paper_tile: "Selecting a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 14,
            paper_tile: "Selecting a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 15,
            paper_tile: "Selecting a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
        {
            _id: 16,
            paper_tile: "Selecting a Programming Scheme for Memristor Elements",
            date: 1807110465663,
            published_user: {
                _id: 123,
                name: "Sk Mir hossain",
            },
            paper_details: {
                pdf_link: '',
            },
        },
    ]

    return (
        <div className="p-8 flex flex-col overflow-y-scroll h-screen">
            {/* Search Input Section */}
            <div className="self-center w-[600px]">
                <input type="text" placeholder="Search here..." class="input input-bordered input-sm w-full border-0 focus:outline-0 drop-shadow-md rounded-[5px]" />
            </div>

            {/* Search Results */}
            <div className="self-center w-[600px]">
                {
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
                                        <MdOutlineTravelExplore/>
                                        Explore
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
}

export default PaperSearch;