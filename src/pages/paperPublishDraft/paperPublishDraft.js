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
import PaperPublishDraftCard from './paperPublishDraftCard';
import { useQuery } from 'react-query';

function PaperPublishDraft(props) {
    const {show, setShow} = props;
    const [user, userAuthLoaading] = userAuth();
    const [modalIndex, setModalIndex] = useState();
    const [modalData, setModalData] = useState({});
    // const [draftData, setDraftData] = useState([]);
    const navigate = useNavigate();


    const {data:draftData, isLoading, refetch} = useQuery('draftData', () => {
        let id = localStorage.getItem('userId');
        return  fetch(`http://localhost:8000/api/v1/publish-paper-draft/${id}`,{
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
            return <ToLoginAlert show={show} setShow={setShow} message={`Please login to see publish paper page!`}/>
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

   
    
    console.log(draftData.data.length);


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
                        (draftData.data.length!==0) ?

                        draftData.data.map((d, index) => <PaperPublishDraftCard data={d} index={index} ModalShow={ModalShow} refetch={refetch} />)
                        
                        :
                        
                        <div className='text-2xl mt-6 text-center text-blue-500'>No publish paper added in draft! </div>
                    }
                        {/* Modal */}
                        {/* Put this part before </body> tag */}
                        <input type="checkbox" id={modalIndex} className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <h3 className="text-lg font-bold">{modalData.researchPaperType}</h3>
                                <p className="py-4">This modal works with a hidden checkbox!</p>
                                <label className="modal-backdrop" htmlFor={modalIndex}>Close</label>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        
    );
}

export default PaperPublishDraft;