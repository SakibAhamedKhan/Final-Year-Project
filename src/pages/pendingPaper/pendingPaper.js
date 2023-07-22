import publishImage from '../../assets/undraw/publish.svg'
import selectionImage from '../../assets/undraw/selection.svg'
import {MdOutlinePublish} from 'react-icons/md';
import Navbar from '../shared/navbar';
import UpperNavbar from '../shared/upperNavbar';
import userAuth from '../../hooks/userAuth';
import { useNavigate } from 'react-router-dom';
import UserAuthLoadingPage from '../shared/userAuthLoadingPage';
import ToLoginAlert from '../shared/toLoginAlert';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import researchPaperType from '../../data/researchPaperType'
import journalList from '../../data/journalList';
import Swal from 'sweetalert2';
import { useQuery } from 'react-query';
import PendingPaperCard from './pendingPaperCard';

function PendingPaper(props) {
    const {show, setShow} = props;
    const [user, userAuthLoaading] = userAuth();
    const [modalIndex, setModalIndex] = useState();
    const [modalData, setModalData] = useState({});
    // const [paperData, setDraftData] = useState([]);
    const navigate = useNavigate();


    const {data:paperData, isLoading, refetch} = useQuery('paperData33', () => {
        let id = localStorage.getItem('userId');
        return  fetch(`http://localhost:8000/api/v1/published-paper/pendingapproval/${id}`,{
            method: 'GET',
            headers:{
                'content-type':'application/json'
            },
        })
        .then(res => res.json())
        })
    
    if(isLoading){
        return  (<div className='flex flex-row'>
        <div className={`${show? '': 'bg-white w-[50px]'} border-r-2 h-screen border-gray-2001`} >
            <Navbar show={show}/>
        </div>

        <div className="w-full bg-gray-100 relative">
            <div className='h-[40px] bg-white w-full drop-shadow-md absolute z-10'>
                <UpperNavbar show={show} setShow={setShow}/>
            </div>
            <div className="px-8 pt-16 pb-2 flex flex-col overflow-y-scroll h-screen">
                Loading...
            </div>
        </div>
    </div>)
    }

    if(userAuthLoaading==false){
        if(user?.status=='fail'){
            console.log("DOne done ");
            return <ToLoginAlert show={show} setShow={setShow} message={`Please login to see this page!`}/>
        }
    } else {
        return (
            <UserAuthLoadingPage show={show} setShow={setShow}/>
        )
    }

   
    const ModalShow = (data, index) => {
        console.log(index);
        setModalIndex(index);
        setModalData(data);

    }

   
    
    console.log(paperData.data.length);


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
                    {/* <h2 className="text-center font-bold text-xl">Publish Your Paper</h2> */}
                    {
                        (paperData?.data?.length) ?

                        paperData?.data.map((d, index) => <PendingPaperCard data={d} index={index}  refetch={refetch} />)
                        
                        :
                        
                        <div className='text-2xl mt-6 text-center text-blue-500'>No pending paper! </div>
                    }
                </div>
            </div>
        </div>
        
    );
}

export default PendingPaper;