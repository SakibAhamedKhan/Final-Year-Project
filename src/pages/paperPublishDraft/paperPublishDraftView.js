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
import { useQuery } from 'react-query';
import AuthorShow from '../shared/authorShow';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


function PaperPublishDraftView(props) {
    const { register, formState: { errors }, control, handleSubmit } = useForm();
    const { draft_id } = useParams();
    const [draftViewData, setDraftViewData] = useState({});
    const navigate = useNavigate();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
    const [author, setAuthor] = useState([]);
    const [coAuthor, setCoAuthor] = useState([]);
    const [data, setData] = useState({});

    console.log(draft_id);

    let authors = [];
    let coAuthors = [];
    
    const {data: authorData, isLoading: authorDataLoaading, refetch} = useQuery('authorDataAuth2', () => {
        return  fetch(`http://localhost:8000/api/v1/user/authors/selection`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
        })
    
   
    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/publish-paper-draft/get-draft/${draft_id}`,{
            method: 'GET',
            headers:{
                'content-type':'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            setData(data.data);
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
            // setAuthor(data.data.authors);
            // setCoAuthor(data.data.coAuthors);
        })  
    },[])

    if(authorDataLoaading){
        return <UserAuthLoadingPage/>
    }


   console.log(draftViewData);

//    authorData.data.map(d => {
//         let obj = {
//             label: <div className="flex items-center">
//             <div className="avatar">
//                 <div className="w-6 rounded-full">
//                     <img src={d.profileImage} />
//                 </div>
//             </div>
//             <div className="ml-2">{d.name}</div>
//         </div>,
//             value: [d.id, d.name]
//         }
//         authors.push(obj);
//         coAuthors.push(obj);
//     })


   const onSubmit = async data => {
        const update = {
            id: draftViewData._id,
            updatedData:{
                abstract:abstract,
                date:date,
                doi:doi,
                file:"files",
                issue:issue,
                journalList:journal,
                pageEnd:pageEnd,
                pageStart:pageStart,
                researchPaperType:researchType,
                title:title,
                volumn:volumn
            }
        }
        fetch(`http://localhost:8000/api/v1/publish-paper-draft/submit-updated`,{
            method: 'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(update)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.status==='fail'){
                Swal.fire({
                    icon: 'error',
                    title: 'Ops',
                    text: `${data.error}`,
                    footer: ''
                })

            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Great',
                    text: `Successfully updated draft paper!`,
                    footer: ''
                }).then(()=>{
                    navigate('/paperpublishdraft');
                })
                // localStorage.setItem('userId', data.data._id);
                
            }
        })  
    }

    const handleTitle = (event) => {
        console.log(event.target.value);
    }

    // console.log(file);
    // let result = [];
    // for(let i=0; i<author.length;i++){
    //    result.push(authors.find(c => c.value[0] === author[i]))
    // }
    // console.log(result[0]);
    

    const handlePublishConformation = () => {
        Swal.fire({
            icon: 'question',
            title: `Are you sure to publish this ${data.researchPaperType} thats title is: ${data.title}`,
            showDenyButton: true,
            confirmButtonText: 'Publish',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handlePublish();
            } 
          })
    }

    const handlePublish = () => {
        console.log(data);

        const publishData = {
            abstract: data.abstract,
            date: data.date,
            doi: data.doi,
            file: data.file,
            issue: data.issue,
            journalList: data.journalList,
            pageEnd: data.pageEnd,
            userId: data.userId,
            pageStart: data.pageStart,
            researchPaperType: data.researchPaperType,
            title: data.title,
            volumn: data.volumn,
            authors: data.authors,
            coAuthors: data.coAuthors,
        }
        fetch(`http://localhost:8000/api/v1/published-paper/submit`,{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(publishData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.status==='fail'){
                Swal.fire({
                    icon: 'error',
                    title: 'Ops',
                    text: `${data.error}`,
                    footer: ''
                })

            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Great',
                    text: `Successfully published your paper`,
                    footer: ''
                }).then(()=>{
                    handleDelete();
                })
            }
        }) 
    }

    const handleDelete = () => {
        fetch(`http://localhost:8000/api/v1/publish-paper-draft/remove-draft/${data._id}`,{
            method: 'DELETE',
            headers:{
                'content-type':'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.status==='fail'){
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Ops',
                //     text: `${data.error}`,
                //     footer: ''
                // })

            } else {
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Great',
                //     text: `Successfully removed the draft paper!`,
                //     footer: ''
                // }).then(()=>{
                    navigate('/paperpublishdraft');
                // })
                
            }
        })
    }

    const authorShow = () => {
        return(
            <div className="inline flex my-4">
                {data?.authors?.map((d, index)=> {
                    return <AuthorShow key={d} id={d}/>
                })}
            </div>
        )
    }

    const coAuthorShow = () => {
        return(
            <div className="inline flex my-4">
                {data?.coAuthors?.map((d, index)=> {
                    return <AuthorShow key={d} id={d}/>
                })}
            </div>
        )
    }
    return (
        <div className='bg-gray-100 h-screen overflow-y-scroll'>
            <div className='flex flex-row justify-center items-center my-10'>
                {
                    draftViewData?
                    <div className="card bg-base-100 w-[900px] drop-shadow-md p-10">
                        <button onClick={() => navigate('/paperpublishdraft')} className='btn btn-warning w-[100px] mt-6 mx-6'><IoArrowBackCircleSharp className='text-xl mr-1'/>  Back </button>
                        <div className="card-body">
                            {/* <form className=''> */}
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
                                {/* <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Choose File</span>
                                    </label>
                                    <input type="file" class="file-input file-input-bordered file-input-accent bg-white text-sm"
                                    />
                                    <label class="label">
                                    </label>
                                </div> */}

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
                                
                                 {/* Author Select */}
                                 {/* <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Author</span>
                                    </label>
                                    <Controller
                                        name="authors"
                                        control={control}
                                        render={({ 
                                            field: {onChange, value, ref}
                                        }) => (
                                        <Select
                                            options={authors}
                                            isMulti
                                            className="text-sm rounded-[10px]"
                                            value={value}
                                            onChange={val => setAuthor(val.value)}
                                            inputRef={ref}
                                        />
                                        
                                        )}
                                        rules={{ required:{
                                            value: true,
                                            message: 'Authors must be Required'
                                        } }}
                                        
                                    />
                                    <label class="label ">
                                        {errors.authors?.type === 'required' && <span class="label-text-alt text-red-600">{errors.authors.message}</span>}
                                    </label>
                                </div>         */}
                                {/* Co Author Select */}
                                {/* <div class="form-control mt-[-15px]">
                                    <label class="label mb-[-5px]">
                                        <span class="label-text">Co - Author</span>
                                    </label>
                                    <Controller
                                        name="coAuthors"
                                        control={control}
                                        render={({ 
                                            field: {onChange, value, ref}
                                        }) => (
                                        <Select
                                            options={coAuthors}
                                            isMulti
                                            className="text-sm rounded-[10px]"
                                            value={value}
                                            onChange={onChange}
                                            inputRef={ref}
                                        />
                                        )}
                                        rules={{ required:{
                                            value: true,
                                            message: 'Co - Authors must be Required'
                                        } }}
                                        
                                    />
                                    <label class="label ">
                                        {errors.coAuthors?.type === 'required' && <span class="label-text-alt text-red-600">{errors.coAuthors.message}</span>}
                                    </label>
                                </div>  */}
                                <div className="my-2">
                                <h2 className="bg-blue-200  w-fit rounded-md px-2 py-[3px] text-black inline">Authors: </h2> 
                                </div>
                                <div className="">
                                        {authorShow()}
                                </div>
                                <div className="my-2">
                                    <h2 className="bg-orange-200  w-fit rounded-md px-2 py-[3px]  text-black inline">Co - Authors: </h2> 
                                </div>
                                <div className="">
                                        {coAuthorShow()}
                                </div>

                                {/* pdf viewer */}
                                <h2 className="bg-orange-200  w-fit rounded-md px-2 py-[3px]  text-black inline">Document: </h2> 
                                <div  className="h-[800px]">
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                        <Viewer  plugins={[defaultLayoutPluginInstance]} fileUrl={`${data.file}`}/>;
                                    </Worker>
                                </div>

                                <div class="form-control mt-2">
                                    <button onClick={()=>handlePublishConformation()} class="btn btn-accent">Publish Now</button>
                                </div>
                            {/* </form>         */}

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