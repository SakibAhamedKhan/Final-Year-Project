import publishImage from '../../assets/undraw/publish.svg'
import selectionImage from '../../assets/undraw/selection.svg'
import {MdOutlinePublish} from 'react-icons/md';
import Navbar from '../shared/navbar';
import UpperNavbar from '../shared/upperNavbar';
import userAuth from '../../hooks/userAuth';
import { useNavigate, useParams } from 'react-router-dom';
import UserAuthLoadingPage from '../shared/userAuthLoadingPage';
import ToLoginAlert from '../shared/toLoginAlert';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import researchPaperType from '../../data/researchPaperType'
import journalList from '../../data/journalList';
import Swal from 'sweetalert2';
import PaperPublishDraftCard from './paperPublishDraftCard';
import {IoArrowBackCircleSharp} from "react-icons/io5"

function PaperPublishDraftView(props) {
    const { register, formState: { errors }, control, handleSubmit } = useForm();
    const { draft_id } = useParams();
    const [draftViewData, setDraftViewData] = useState({});
    const navigate = useNavigate();

    // updated data
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [researchType, setResearchType] = useState('');
    const [date, setDate] = useState('');
    const [doi, setDoi] = useState('');
    const [file, setFile] = useState('');
    const [issue, setIssue] = useState('');
    const [journal, setJournal] = useState('');
    const [pageStart, setPageStart] = useState('');
    const [pageEnd, setPageEnd] = useState('');
    const [volumn, setVolumn] = useState('');


    console.log(draft_id);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/publish-paper-draft/get-draft/${draft_id}`,{
            method: 'GET',
            headers:{
                'content-type':'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setDraftViewData(data.data);
            setTitle(data.data.title);
            setAbstract(data.data.abstract);
            setResearchType(data.data.researchPaperType);
            setDate(data.data.date);
            setDoi(data.data.doi);
            setFile(data.data.file);
            setIssue(data.data.issue);
            setJournal(data.data.journalList);
            setPageStart(data.data.pageStart);
            setPageEnd(data.data.pageEnd);
            setVolumn(data.data.volumn);
        })  
    },[])

   console.log(draftViewData);


   const onSubmit = async data => {
        console.log(data);
        setPublishData({...publishData, ...data});
        if(part===1){
            setPart(2);
        }
        if(part==2){
            setPart(3);
        }
    }

    const handleTitle = (event) => {
        console.log(event.target.value);
    }

    console.log(file);

    return (
        <div className='bg-gray-100 h-screen overflow-y-scroll'>
            <div className='flex flex-row justify-center items-center my-10'>
                {
                    draftViewData?
                    <div className="card bg-base-100 w-[900px] drop-shadow-md p-10">
                        <button onClick={() => navigate('/paperpublishdraft')} className='btn btn-warning w-[100px] mt-6 mx-6'><IoArrowBackCircleSharp className='text-xl mr-1'/>  Back </button>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} className=''>
                                {/* Title */}
                                <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Title</span>
                                    </label>
                                    <input type="text" value={title}  onChange={e => setTitle(e.target.value)}  class="input input-bordered bg-white text-sm"
                                    />
                                    <label class="label">
                                    </label>
                                </div>   
                                

                                {/* Abstract */}
                                <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Abstract</span>
                                    </label>
                                    <textarea value={abstract} onChange={e => setAbstract(e.target.value)}  class="textarea textarea-bordered bg-white h-16"
                                    />
                                    <label class="label">
                                    </label>
                                </div> 

                                {/* Publication Type*/}
                                <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Publication Type</span>
                                    </label>
                                    <Controller
                                        name="researchPaperType"
                                        control={control}
                                        render={({ 
                                            field: {onChange, value, ref}
                                        }) => (
                                        <Select
                                            options={researchPaperType}
                                            className="text-sm rounded-[10px]"
                                            value={researchPaperType.find(c => c.value === researchType)}
                                            onChange={val => setResearchType(val.value)}
                                            inputRef={ref}
                                        />
                                        )}
                                    />
                                    <label class="label ">
                                    </label>
                                </div>

                                 {/* Date */}
                                 <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Date</span>
                                    </label>
                                    <input type="date" value={date} onChange={e => setDate(e.target.value)} class="input input-bordered bg-white text-sm"
                                    />
                                    <label class="label">
                                    </label>
                                </div>                

                                
                                 {/* DOI */}
                                 <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">DOI</span>
                                    </label>
                                    <input type="text" value={doi} onChange={e => setDoi(e.target.value)}  class="input input-bordered bg-white text-sm"
                                    />
                                    <label class="label">
                                    </label>
                                </div>
                                
                                {/* File Choose */}
                                <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Choose File</span>
                                    </label>
                                    <input type="file" class="file-input file-input-bordered file-input-accent bg-white text-sm"
                                    />
                                    <label class="label">
                                    </label>
                                </div>

                                 {/* Issue */}
                                 <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Issue</span>
                                    </label>
                                    <input type="number" value={issue} onChange={e => setIssue(e.target.value)} class="input input-bordered bg-white text-sm"
                                    />
                                    <label class="label">
                                    </label>
                                </div>

                                {/* Jounral List*/}
                                <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Journal</span>
                                    </label>
                                    <Controller
                                        name="journalList"
                                        control={control}
                                        render={({ 
                                            field: {onChange, value, ref}
                                        }) => (
                                        <Select
                                            options={journalList}
                                            className="text-sm rounded-[10px]"
                                            value={journalList.find(c => c.value === journal)}
                                            onChange={val => setJournal(val.value)}
                                            inputRef={ref}
                                        />
                                        )}
                                    />
                                    <label class="label ">
                                    </label>
                                </div>

                                 {/* Volumn */}
                                 <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Volumn</span>
                                    </label>
                                    <input type="number" value={volumn} onChange={e => setVolumn(e.target.value)}  class="input input-bordered bg-white text-sm"
                                    />
                                    <label class="label">
                                    </label>
                                </div>


                                <div className='flex w-[384px] mt-[-15px]'>
                                    {/* Page Start */}
                                    <div class="form-control w-[184px] mr-[16px]">
                                        <label class="label mb-[-5px]">
                                            <span class="label-text">Page Start</span>
                                        </label>
                                        <input type="number" value={pageStart} onChange={e => setPageStart(e.target.value)} class="input input-bordered bg-white text-sm"
                                        />
                                        <label class="label">
                                        </label>
                                    </div>

                                        {/* Page End */}
                                        <div class="form-control w-[184px]">
                                            <label class="label mb-[-5px]">
                                                <span class="label-text">Page End</span>
                                            </label>
                                            <input type="number" value={pageEnd} onChange={e => setPageEnd(e.target.value)} class="input input-bordered bg-white text-sm"
                                            />
                                            <label class="label">
                                            </label>
                                        </div>
                                </div>

                                <div class="form-control mt-2">
                                    <button type='submit' class="btn  text-white">Next</button>
                                </div>
                            </form>        


                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Listen</button>
                            </div>
                        </div>
                    </div>
                    :
                    <p>Loading</p>
                }
            </div>        
                   
        </div>
        
    );
}

export default PaperPublishDraftView;