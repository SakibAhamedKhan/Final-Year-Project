import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {IoArrowBackCircleSharp} from "react-icons/io5"
import {FiBookOpen} from "react-icons/fi"
import ConvertTime from "../paperSearch/converttime";
import AuthorShow from "../shared/authorShow";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PublishedPaperView = (props) => {
    const { published_id } = useParams();
    const [paperData, setPaperData] = useState({});
    const [seeMore, setSeeMOre] = useState(false);
    const navigate = useNavigate();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/published-paper/get-published-paper/${published_id}`,{
            method: 'GET',
            headers:{
                'content-type':'application/json'
            },  
        })
        .then(res => res.json())
        .then(data => {
            setPaperData(data.data);
        })  
    },[])


    const authorShow = () => {
        return(
            <div className="inline flex my-4">
                {paperData?.authors?.map((d, index)=> {
                    return <AuthorShow key={d} id={d}/>
                })}
            </div>
        )
    }

    const coAuthorShow = () => {
        return(
            <div className="inline flex my-4">
                {paperData?.coAuthors?.map((d, index)=> {
                    return <AuthorShow key={d} id={d}/>
                })}
            </div>
        )
    }

    return (
        <div className='bg-gray-100 h-screen overflow-y-scroll'>
            <div className='flex flex-row justify-center items-center my-10 mx-20'>
                {
                    paperData?
                    <div className="card bg-base-100 w-full drop-shadow-md p-10">
                        <button onClick={()=>history.back()} className='btn btn-sm btn-warning w-[100px] my-2 px-10'>
                            <div className="flex justify-center items-center">
                                <IoArrowBackCircleSharp className='text-xl mr-1'/>  
                                <p className="mt-[2px]">Back</p>
                            </div>    
                        </button>
                        <div className="flex">
                           <div className="w-1/2">
                           <p className="text-2xl font-semibold mb-2"><p className="font-semibold inline"></p> {paperData.title}</p>
                            
                            <h2 className="bg-green-200  w-fit rounded-md px-2 py-[1px] my-1 text-gray-500">{paperData.researchPaperType}</h2>
                            
                            <p className="text-md text-blue-600 mb-2"><p className="font-semibold inline">Journal:</p> {paperData.journalList}</p>

                            <p className="text-md mb-2"><p className="font-semibold inline">Abstract:</p>
                            {paperData.abstract}
                             </p>

                            <p className="text-md mb-2"><p className="font-semibold inline">Issue:</p> {paperData.issue}</p>

                            <p className="text-md mb-2"><p className="font-semibold inline">Volumn:</p> {paperData.volumn}</p>
                            
                            <p className="text-md mb-2"><p className="font-semibold inline">Page Start:</p> {paperData.pageStart}</p>

                            <p className="text-md mb-2"><p className="font-semibold inline">Page End:</p> {paperData.pageEnd}</p>

                            <p className="text-md  mb-2"><p className="font-semibold inline">DOI:</p> <a className="text-blue-900 underline inline 	cursor-pointer" href={`${paperData.doi}`} target="blank" >{paperData.doi}</a></p>


                            <div className="font-semibold"><p className="text-sm inline"> Published in journal: </p><ConvertTime className="inline" date={paperData.date} ></ConvertTime></div>
                            <div className="font-semibold"><p className="text-sm inline"> Published here: </p><ConvertTime className="inline" date={paperData.createdAt} ></ConvertTime></div>

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
                            
                            
                            {/* <button className='btn btn-accent w-[250px] mt-2'>
                                <div className="flex justify-center items-center">
                                <FiBookOpen className='text-xl mr-2'/> 
                                <p className="mt-[2px]"> View Your Document </p>
                                </div>
                            </button> */}
                           </div>

                            <div className="w-1/2 ml-4">
                                <div  className="h-[800px]">
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                        <Viewer  plugins={[defaultLayoutPluginInstance]} fileUrl={`${paperData.file}`}/>;
                                    </Worker>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                    :
                    <p>Loading</p>
                }
            </div>        
                   
        </div>
    )
}

export default PublishedPaperView