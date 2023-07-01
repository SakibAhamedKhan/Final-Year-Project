import {BiShow} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const PaperPublishDraftCard  = (props) => {
    const {data, index, ModalShow, refetch} = props;
    const navigate = useNavigate();

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
                    navigate('/');
                })
            }
        }) 
    }

    const handleDeleteConformation = () => {
        Swal.fire({
            icon: 'info',
            title: `Do you want to delete this ${data.researchPaperType} thats title is: ${data.title}`,
            showDenyButton: true,
            confirmButtonText: 'Delete',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handleDelete();
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
                    
                // })
                refetch();
            }
        })
    }

    console.log(data);
    return (
        <div>
            <div className="card w-full bg-base-100 text-black my-3 drop-shadow-md">
                <div className="flex justify-between items-center p-4">
                    <div className="">
                        <h2 className="card-title">{data.researchPaperType}</h2>
                        <h4>Title: {data.title}</h4>
                        <p>Journal: {data.journalList}</p>
                    </div>
                    <div className="card-actions">
                        <button className="btn btn-sm btn-warning" onClick={() => navigate(`/paperpublishdraft/${data._id}`)}><BiShow className="text-xl mr-1"/> View</button>
                        <button onClick={handlePublishConformation} className="btn btn-sm btn-accent">Publish</button>
                        <button onClick={handleDeleteConformation} className="btn btn-sm btn-error">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaperPublishDraftCard;