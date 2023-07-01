import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {IoArrowBackCircleSharp} from "react-icons/io5"
import {FiBookOpen} from "react-icons/fi"
import ConvertTime from "../paperSearch/converttime";

const PublishedPaperView = (props) => {
    const { published_id } = useParams();
    const [paperData, setPaperData] = useState({});
    const navigate = useNavigate();

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
    return (
        <div className='bg-gray-100 h-screen overflow-y-scroll'>
            <div className='flex flex-row justify-center items-center my-10'>
                {
                    paperData?
                    <div className="card bg-base-100 w-[900px] drop-shadow-md p-10">
                        <button onClick={() => navigate('/profile')} className='btn btn-sm btn-warning w-[100px] mt-6 mx-6'>
                            <div className="flex justify-center items-center">
                                <IoArrowBackCircleSharp className='text-xl mr-1'/>  
                                <p className="mt-[2px]">Back</p>
                            </div>    
                        </button>
                        <div className="card-body">
                           

                            <p className="text-3xl font-semibold">{paperData.researchPaperType}</p>
                            
                            <p className="text-xl text-blue-600 mb-2"><p className="font-semibold inline">Journal:</p> {paperData.journalList}</p>

                          

                            <p className="text-xl mb-2"><p className="font-semibold inline">Title:</p> {paperData.title}</p>

                            <p className="text-xl mb-2"><p className="font-semibold inline">Abstract:</p> {paperData.abstract}</p>

                            <p className="text-xl mb-2"><p className="font-semibold inline">Issue:</p> {paperData.issue}</p>

                            <p className="text-xl mb-2"><p className="font-semibold inline">Volumn:</p> {paperData.volumn}</p>
                            
                            <p className="text-xl mb-2"><p className="font-semibold inline">Page Start:</p> {paperData.pageStart}</p>

                            <p className="text-xl mb-2"><p className="font-semibold inline">Page End:</p> {paperData.pageEnd}</p>

                            <p className="text-xl  mb-2"><p className="font-semibold inline">DOI:</p> <a className="text-blue-900 underline inline 	cursor-pointer" href={`${paperData.doi}`} target="blank" >{paperData.doi}</a></p>


                            <div className="font-semibold"><p className="text-sm inline"> Published in journal: </p><ConvertTime className="inline" date={paperData.date} ></ConvertTime></div>
                            <div className="font-semibold"><p className="text-sm inline"> Published here: </p><ConvertTime className="inline" date={paperData.createdAt} ></ConvertTime></div>

                            
                            <button className='btn btn-accent w-[250px] mt-2'>
                                <div className="flex justify-center items-center">
                                <FiBookOpen className='text-xl mr-2'/> 
                                <p className="mt-[2px]"> View Your Document </p>
                                </div>
                            </button>
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