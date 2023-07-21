import publishImage from '../../assets/undraw/publish.svg'
import selectionImage from '../../assets/undraw/selection.svg'
import {MdOutlinePublish} from 'react-icons/md';
import Navbar from '../shared/navbar';
import UpperNavbar from '../shared/upperNavbar';
import userAuth from '../../hooks/userAuth';
import { useNavigate } from 'react-router-dom';
import UserAuthLoadingPage from '../shared/userAuthLoadingPage';
import ToLoginAlert from '../shared/toLoginAlert';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import researchPaperType from '../../data/researchPaperType'
import journalList from '../../data/journalList';
import Swal from 'sweetalert2';
import { useQuery } from 'react-query';
import storage from '../../base';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { TagsInput } from "react-tag-input-component";

function PaperPublish(props) {
    const { register, formState: { errors }, control, handleSubmit } = useForm();
    const [publishData, setPublishData] = useState({});
    const [part, setPart] = useState(2);
    const {show, setShow} = props;
    const [user, userAuthLoaading] = userAuth();
    const navigate = useNavigate();
    const [progrss, setProgrss] = useState(0);
    const [isLoading, setIsLoading] = useState();
    const [url, setUrl] = useState();
    const [saveDraftLoading, setSaveDraftLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [citation, setCitation] = useState(null);

    let authors = [];
    let coAuthors = [];

    const {data: authorData, isLoading: authorDataLoaading, refetch} = useQuery('authorDataAuth', () => {
        return  fetch(`http://localhost:8000/api/v1/user/authors/selection`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
        })
    
    if(authorDataLoaading){
        return <UserAuthLoadingPage/>
    }

    if(userAuthLoaading==false){
        if(user?.status=='fail'){
            console.log("DOne done ");
            return <ToLoginAlert show={show} setShow={setShow} message={`Please login to see publish paper page!`}/>
        }
    } else {
        return (
            <UserAuthLoadingPage show={show} setShow={setShow}/>
        )
    }


   authorData.data.map(d => {
        let obj = {
            label: <div className="flex items-center">
            <div className="avatar">
                <div className="w-6 rounded-full">
                    <img src={d.profileImage} />
                </div>
            </div>
            <div className="ml-2">{d.name}</div>
        </div>,
            value: [d.id, d.name]
        }
        authors.push(obj);
        coAuthors.push(obj);
   })


    const onSubmit = async data => {
        console.log(data);
        
        // const file = data.file[0];
        // const storageRef = ref(storage, `/files/${file.name}`);
        // const uploadTask = uploadBytesResumable(storageRef, file);

        // uploadTask.on("state_changed", (snapshot) => {
        //     var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        //     console.log(progress);
        //     setProgrss(progress);
        // }, (err) => {
        //     console.log(err);
        //     setIsLoading(false);
        // },
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref)
        //             .then(url => {
        //                 console.log(url);
        //                 setUrl(url);
        //                 setIsLoading(false);
        //             })
        //     }
        // )



        setPublishData({...publishData, ...data});
        if(part===1){
            setPart(2);
        }
        if(part==2){
            let citationsArray=[];
            for(let i=0; i<citation.length; i++){
                let str= '';
                for(let j=citation[i].length-1; j>=0; j--){
                    if(citation[i][j]=="/"){
                        j=-1;
                    }
                    else {
                        str = str + citation[i][j]
                    }
                }
                var splitString = str.split("");
                var reverseArray = splitString.reverse();
                var joinArray = reverseArray.join("");
                citation[i] = joinArray;
            }
            data.citationUsed=citation;
            console.log(citation);
            setPublishData({...publishData, ...data});
            setPart(3);
        }
    }


    // Submit Now Button Onclick
    const submitNow = () => {
        console.log(publishData);
    }

    const handleUploadSave = () => {
        setSaveLoading(true);
        // Upload the pdf to the Google Firebase and get the url
        const file = publishData.file[0];
        const storageRef = ref(storage, `/files/${file.name} ${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress);
            setProgrss(progress);
        }, (err) => {
            console.log(err);
            setIsLoading(false);
        },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        console.log(url);
                        setUrl(url);
                        publishData.file = url;
                        //setIsLoading(false);
                        handleUploadSaveNow();
                    })
            }
        )
        

        
       
    }
    const handleUploadSaveNow = () => {
        let userId = localStorage.getItem('userId');
        publishData.userId = userId;

        let authorsdata = [];
        publishData.authors.map(d => {
            authorsdata.push(d.value[0]);
        })
        publishData.authors = authorsdata;

        let coauthorsdata = [];
        publishData.coAuthors.map(d => {
            coauthorsdata.push(d.value[0]);
        })
        publishData.coAuthors = coauthorsdata;

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
                    //handleDelete();
                    setSaveLoading(false);
                    navigate('/');
                })
            }
        }) 
    }
    // Save Draft Button Onclick
    const handleUploadSaveDraft = () => {
        setSaveDraftLoading(true);
        // Upload the pdf to the Google Firebase and get the url
        const file = publishData.file[0];
        const storageRef = ref(storage, `/files/${file.name} ${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress);
            setProgrss(progress);
        }, (err) => {
            console.log(err);
            setIsLoading(false);
        },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        console.log(url);
                        setUrl(url);
                        publishData.file = url;
                        setIsLoading(false);
                        saveDraft();
                    })
            }
        )
        

        
       
    }
    const saveDraft = () => {
        
        let userId = localStorage.getItem('userId');
        publishData.userId = userId;

        let authorsdata = [];
        publishData.authors.map(d => {
            authorsdata.push(d.value[0]);
        })
        publishData.authors = authorsdata;

        let coauthorsdata = [];
        publishData.coAuthors.map(d => {
            coauthorsdata.push(d.value[0]);
        })
        publishData.coAuthors = coauthorsdata;
        
        console.log(publishData);
        fetch(`http://localhost:8000/api/v1/publish-paper-draft/submit`,{
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
                setSaveDraftLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Great',
                    text: `Successfully publish paper added to the draft!`,
                    footer: ''
                }).then(()=>{
                    navigate('/');
                })
                // localStorage.setItem('userId', data.data._id);
                handleUploadSave
            }
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
                <div className="px-8 pt-20 pb-2 flex flex-col overflow-y-scroll h-screen">
                    {/* <h2 className="text-center font-bold text-xl">Publish Your Paper</h2> */}
                    <div className='flex justify-center'>
                        <ul className="steps steps-vertical lg:steps-horizontal w-[600px] text-xs">
                            <li className={`step ${part>=1 ? 'step-accent':'' } text-sm`}>Step 1</li>
                            <li className={`step ${part>=2 ? 'step-accent':'' } text-sm`}>Step 2</li>
                            <li className={`step ${part>=3 ? 'step-accent': ''} text-sm`}>Final Step</li>
                        </ul>
                    </div>
                    <div className="self-center">
                        {/* card design*/}
                        <div className="pt-6 pb-6">
                            <div className="card lg:card-side bg-base-100 px-8 py-2  drop-shadow-md">
                                {
                                    (part===1 || part==2) && 
                                    <img className='w-72 px-6' src={publishImage} alt="" />
                                }
                                {
                                    (part==3) && 
                                    <img className='w-80 px-6 py-20' src={selectionImage} alt="" />
                                }

                                <div className='card-body  pl-4'>

                                    {/* First part Form for publish type, Choose file, title, authors, data, doi */}
                                    {
                                        part===1 && <div className='w-full md:w-screen lg:w-screen max-w-sm  bg-white'>
                                            <form onSubmit={handleSubmit(onSubmit)} className=''>

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
                                                            value={researchPaperType.find(c => c.value === value)}
                                                            onChange={val => onChange(val.value)}
                                                            inputRef={ref}
                                                        />
                                                        )}
                                                        rules={{ required:{
                                                            value: true,
                                                            message: 'Publication type must be Required'
                                                        } }}
                                                    />
                                                    <label class="label ">
                                                        {errors.researchPaperType?.type === 'required' && <span class="label-text-alt text-red-600">{errors.researchPaperType.message}</span>}
                                                    </label>
                                                </div>

                                                {/* File Choose */}
                                                <div class="form-control mt-[-15px]">
                                                    <label class="label mb-[-5px]">
                                                        <span class="label-text">Choose File</span>
                                                    </label>
                                                    <input type="file"  class="file-input file-input-bordered file-input-accent bg-white text-sm"
                                                    {...register('file', {
                                                        required:{
                                                            value: true,
                                                            message: 'Choose file must be Required'
                                                        },
                                                    })} 
                                                    />
                                                    <label class="label">
                                                        {errors.file?.type === 'required' && <span class="label-text-alt text-red-600">{errors.file.message}</span>}
                                                        {errors.file?.type === 'pattern' && <span class="label-text-alt text-red-600">{errors.file.message}</span>}
                                                    </label>
                                                </div>

                                                {/* Title */}
                                                <div class="form-control mt-[-15px]">
                                                    <label class="label mb-[-5px]">
                                                        <span class="label-text">Title</span>
                                                    </label>
                                                    <textarea  class="textarea textarea-bordered bg-white h-8"
                                                    {...register('title', {
                                                        required:{
                                                            value: true,
                                                            message: 'Title must be Required'
                                                        }
                                                    })} 
                                                    />
                                                    <label class="label">
                                                        {errors.title?.type === 'required' && <span class="label-text-alt text-red-600">{errors.title.message}</span>}
                                                    </label>
                                                </div>    
                                                
                                                {/* Date */}
                                                <div class="form-control mt-[-15px]">
                                                    <label class="label mb-[-5px]">
                                                        <span class="label-text">Date</span>
                                                    </label>
                                                    <input type="date" class="input input-bordered bg-white text-sm"
                                                    {...register('date', {
                                                        required:{
                                                            value: true,
                                                            message: 'Date must be Required'
                                                        },
                                                    })} 
                                                    />
                                                    <label class="label">
                                                        {errors.date?.type === 'required' && <span class="label-text-alt text-red-600">{errors.date.message}</span>}
                                                        {errors.date?.type === 'pattern' && <span class="label-text-alt text-red-600">{errors.date.message}</span>}
                                                    </label>
                                                </div>

                                                {/* DOI */}
                                                <div class="form-control mt-[-15px]">
                                                    <label class="label mb-[-5px]">
                                                        <span class="label-text">DOI</span>
                                                    </label>
                                                    <input type="text" class="input input-bordered bg-white text-sm"
                                                    {...register('doi', {
                                                        required:{
                                                            value: true,
                                                            message: 'DOI must be Required'
                                                        },
                                                    })} 
                                                    />
                                                    <label class="label">
                                                        {errors.doi?.type === 'required' && <span class="label-text-alt text-red-600">{errors.doi.message}</span>}
                                                        {errors.doi?.type === 'pattern' && <span class="label-text-alt text-red-600">{errors.doi.message}</span>}
                                                    </label>
                                                </div>

                                                <div class="form-control mt-2">
                                                    <button type='submit' class="btn  text-white">Next</button>
                                                </div>
                                            </form>
                                        </div>
                                    }



                                    {/* Second part Form for abstract, journal select, volumn, Issue, Page*/}

                                    {
                                        part===2 && <div className='w-full md:w-screen lg:w-screen max-w-sm  bg-white'>
                                        <form onSubmit={handleSubmit(onSubmit)} className=''>
                                            {/* Abstract */}
                                            <div class="form-control mt-[-15px]">
                                                <label class="label mb-[-5px]">
                                                    <span class="label-text">Abstract</span>
                                                </label>
                                                <textarea  class="textarea textarea-bordered bg-white h-16"
                                                {...register('abstract', {
                                                    required:{
                                                        value: true,
                                                        message: 'Abstract must be Required'
                                                    }
                                                })} 
                                                />
                                                <label class="label">
                                                    {errors.abstract?.type === 'required' && <span class="label-text-alt text-red-600">{errors.abstract.message}</span>}
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
                                                        value={journalList.find(c => c.value === value)}
                                                        onChange={val => onChange(val.value)}
                                                        inputRef={ref}
                                                    />
                                                    )}
                                                    rules={{ required:{
                                                        value: true,
                                                        message: 'Publication type must be Required'
                                                    } }}
                                                />
                                                <label class="label ">
                                                    {errors.journalList?.type === 'required' && <span class="label-text-alt text-red-600">{errors.journalList.message}</span>}
                                                </label>
                                            </div>

                                            {/* Volumn */}
                                            <div class="form-control mt-[-15px]">
                                                <label class="label mb-[-5px]">
                                                    <span class="label-text">Volumn</span>
                                                </label>
                                                <input type="number"  class="input input-bordered bg-white text-sm"
                                                {...register('volumn', {
                                                    required:{
                                                        value: true,
                                                        message: 'Volumn must be Required'
                                                    },
                                                })} 
                                                />
                                                <label class="label">
                                                    {errors.volumn?.type === 'required' && <span class="label-text-alt text-red-600">{errors.volumn.message}</span>}
                                                    {errors.volumn?.type === 'pattern' && <span class="label-text-alt text-red-600">{errors.volumn.message}</span>}
                                                </label>
                                            </div>

                                            {/* Issue */}
                                            <div class="form-control mt-[-15px]">
                                                <label class="label mb-[-5px]">
                                                    <span class="label-text">Issue</span>
                                                </label>
                                                <input type="number"  class="input input-bordered bg-white text-sm"
                                                {...register('issue', {
                                                    required:{
                                                        value: true,
                                                        message: 'Issue must be Required'
                                                    },
                                                })} 
                                                />
                                                <label class="label">
                                                    {errors.issue?.type === 'required' && <span class="label-text-alt text-red-600">{errors.issue.message}</span>}
                                                    {errors.issue?.type === 'pattern' && <span class="label-text-alt text-red-600">{errors.issue.message}</span>}
                                                </label>
                                            </div>
                                            
                                            <div className='flex w-[384px] mt-[-15px]'>
                                                {/* Page Start */}
                                                <div class="form-control w-[184px] mr-[16px]">
                                                    <label class="label mb-[-5px]">
                                                        <span class="label-text">Page Start</span>
                                                    </label>
                                                    <input type="number"  class="input input-bordered bg-white text-sm"
                                                    {...register('pageStart', {
                                                        required:{
                                                            value: true,
                                                            message: 'Page Start must be Required'
                                                        },
                                                    })} 
                                                    />
                                                    <label class="label">
                                                        {errors.pageStart?.type === 'required' && <span class="label-text-alt text-red-600">{errors.pageStart.message}</span>}
                                                        {errors.pageStart?.type === 'pattern' && <span class="label-text-alt text-red-600">{errors.pageStart.message}</span>}
                                                    </label>
                                                </div>

                                                 {/* Page End */}
                                                 <div class="form-control w-[184px]">
                                                    <label class="label mb-[-5px]">
                                                        <span class="label-text">Page End</span>
                                                    </label>
                                                    <input type="number"  class="input input-bordered bg-white text-sm"
                                                    {...register('pageEnd', {
                                                        required:{
                                                            value: true,
                                                            message: 'Page End must be Required'
                                                        },
                                                    })} 
                                                    />
                                                    <label class="label">
                                                        {errors.pageEnd?.type === 'required' && <span class="label-text-alt text-red-600">{errors.pageEnd.message}</span>}
                                                        {errors.pageEnd?.type === 'pattern' && <span class="label-text-alt text-red-600">{errors.pageEnd.message}</span>}
                                                    </label>
                                                </div>
                                            </div>
                                            
                                            {/* Author Select */}
                                            <div class="form-control mt-[-15px]">
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
                                                        onChange={onChange}
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
                                            </div>        
                                            {/* Co Author Select */}
                                            <div class="form-control mt-[-15px]">
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
                                            </div>  
                                            
                                            {/* citation content link */}
                                            <TagsInput
                                                value={citation}
                                                onChange={setCitation}
                                                name="citation"
                                                placeHolder="Enter the Citation links"
                                            />            
                                            <div class="form-control mt-2">
                                                <button type='submit' class="btn  text-white">Next</button>
                                            </div>
                                        </form>
                                    </div>
                                    }


                                    {/* Third part for choose view or direct publish*/}

                                    {
                                        part===3 && <div className='mt-12'>
                                            <h2 className='font-bold text-2xl mb-2 text-center'>Choose the submit</h2>
                                            <div className='flex flex-col'>
                                                {
                                                    saveLoading?
                                                    <button class="btn-success btn-disabled text-white my-2 px-5 py-2 rounded-[5px]">Loading...</button>
                                                    :
                                                    <button onClick={submitNow} class="btn-success text-white my-2 px-5 py-2 rounded-[5px]">Submit and Publish Now</button>
                                                }
                                                {
                                                    saveDraftLoading?
                                                    <button class="btn-primary  btn-disabled text-white my-2 px-5 py-2 rounded-[5px]">Loading...</button>
                                                    :
                                                    <button onClick={handleUploadSaveDraft} class="btn-primary text-white my-2 px-5 py-2 rounded-[5px]">Save to draft and Submit later</button>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>



                                {/* <input type="text" placeholder="Your Paper Title..." class="input input-bordered w-[300px]  drop-shadow-md input-sm my-2" />
                                <input type="file" class="file-input file-input-bordered file-input-success drop-shadow-md  file-input-sm text-black  w-[300px] my-2 capitalize" />

                                <button className="btn btn-xs h-[30px] capitalize gap-2 text-white w-[300px] my-2 drop-shadow-md">
                                    <MdOutlinePublish className='text-[18px]'/>
                                    Publish
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default PaperPublish;