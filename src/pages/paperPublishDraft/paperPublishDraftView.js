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

function PaperPublishDraftView(props) {
    const { draft_id } = useParams();
    const [user, userAuthLoaading] = userAuth();
    const [modalIndex, setModalIndex] = useState();
    const [modalData, setModalData] = useState({});
    const [draftData, setDraftData] = useState([]);
    const navigate = useNavigate();

    console.log(draft_id);

    // useEffect(() => {
    //     let id = localStorage.getItem('userId');
    //     fetch(`http://localhost:8000/api/v1/publish-paper-draft/${id}`,{
    //         method: 'GET',
    //         headers:{
    //             'content-type':'application/json'
    //         },
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         setDraftData(data.data);
    //     })  
    // },[])

    // if(userAuthLoaading==false){
    //     if(user?.status=='fail'){
    //         console.log("DOne done ");
    //         return <ToLoginAlert show={show} setShow={setShow} message={`Please login to see publish paper page!`}/>
    //     }
    // } else {
    //     return (
    //         <UserAuthLoadingPage show={show} setShow={setShow}/>
    //     )
    // }



    return (
        <div className='flex flex-row'>
                    {draft_id}
        </div>
        
    );
}

export default PaperPublishDraftView;