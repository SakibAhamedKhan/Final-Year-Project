
import { useEffect, useState } from "react";
import communityData from '../../data/community.json';
import ConvertTime from '../paperSearch/converttime';
import image1 from '../../assets/img/Sakib.jpeg';
import { AiFillCaretDown } from 'react-icons/ai';
import Navbar from "../shared/navbar";
import UpperNavbar from "../shared/upperNavbar";
import userAuth from "../../hooks/userAuth";
import Modal from 'react-modal';
import { InfinitySpin } from "react-loader-spinner";


function GovernmentProject(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {show, setShow} = props;
    const [user, userAuthLoaading, refetch] = userAuth();
    const [refresh, setRefresh] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({title: "",details: "",projectLink: ""});

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
   
    //   const {data: d, isLoading: userAuthLoaading, refetch} = useQuery('userAuth', () => {
    //     if(id==null){ 
    //         return {status: "fail"}
    //     } 
    //     return  fetch(`http://localhost:8000/api/v1/govtproject/`, {
    //             method: 'GET',
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //         }).then(res => res.json())
    //     })
      useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/v1/govtproject/`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
            .then(data =>{
                setData(data.data);
                setLoading(false);
            })
    }, [refresh]);

    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleGovernmentProject = (event) => {
        event.preventDefault();

        fetch(`http://localhost:8000/api/v1/govtproject/add-project`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(res => res.json())
            .then(data =>{
                setIsOpen(false)
                setRefresh(Date.now());
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
                <div className="px-8 pt-16 pb-2 flex flex-col overflow-y-scroll h-screen">
                    <h2 className="text-center font-bold text-xl mb-[-10px]">Government Projects</h2>
                    
                    {
                        user?.data?.role==="Professor" && <button className="btn btn-circle absolute bottom-10 right-10 z-10">
                        <p onClick={() => setIsOpen(true)} className="text-[30px] text-white">+</p>
                    </button>
                    }

                    <Modal
                        isOpen={modalIsOpen}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <form  onSubmit={handleGovernmentProject}>
                            <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Title</span>
                                    </label>
                                    <textarea name="title" value={formData.title} onChange={handleChange} required class="textarea textarea-bordered bg-white h-10"
                                    />
                            </div>
                            <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Details</span>
                                    </label>
                                    <textarea name="details" value={formData.details} onChange={handleChange} required class="textarea textarea-bordered bg-white h-20"
                                    />
                            </div>
                            <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Project Link</span>
                                    </label>
                                    <input name="projectLink" value={formData.projectLink} onChange={handleChange} required class="input input-bordered bg-white h-10"
                                    />
                            </div>
                            <div className="flex justify-center">
                                <button type='submit'  className="btn btn-sm btn-error text-sm my-4 text-white capitalize">Submit</button>
                                <button type='submit'  className="btn btn-sm btn-info text-sm my-4 text-white capitalize ml-2" onClick={()=> setIsOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </Modal>
                    <div className="mt-5">
                        {
                            !loading ?
                                <div className="grid grid-cols-3 gap-4">
                                    {
                                        data.map((d, index) => <div className={`card bg-base-100 drop-shadow-md m-1 rounded-[5px] p-6 flex flex-col justify-between `}>

                                            <div>
                                                <h2 className="font-semibold text-xl">{d.title}</h2>
                                                <ConvertTime key={d._id} date={d.createdAt} ></ConvertTime>
                                                <div className="flex items-center my-2">
                                                    <div className="">
                                                        <h2 className="text-sm">{d.details}</h2>
                                                    </div>
                                                </div>
                                                <div>
                                                    <a target="_blank" href={`${d.projectLink}`} className="btn btn-sm text-white">Go To The Project</a>
                                                </div>
                                            </div>
                                            <div>
                                                
                                            </div>

                                        </div>)
                                    }
                                </div>
                                :
                                <div className="flex justify-center items-center">
                                    <InfinitySpin
                                        width='200'
                                        color="#4fa94d"
                                    />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default GovernmentProject;