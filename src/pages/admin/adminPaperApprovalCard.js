import {BiShow} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AdminPaperApprovalCard  = (props) => {
    const {data, index, ModalShow, refetch} = props;
    const navigate = useNavigate();

    const handlePublishConformation = () => {
        Swal.fire({
            icon: 'question',
            title: `Are you sure to approve this ${data.researchPaperType} thats title is: ${data.title}`,
            showDenyButton: true,
            confirmButtonText: 'Approve',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handleApprove();
            } 
          })
    }

    const handleApprove = () => {
        console.log(data);

        fetch(`http://localhost:8000/api/v1/published-paper/approve/${data._id}`,{
            method: 'PATCH',
            headers:{
                'content-type':'application/json'
            },
            
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
                    text: `Successfully approve your paper`,
                    footer: ''
                }).then(()=>{
                    refetch();
                })
            }
        }) 
    }



   
    console.log(data);
    return (
        <div>
            <div className="card w-full bg-base-100 text-black my-3 drop-shadow-md">
                <div className="flex justify-between items-center p-4">
                    <div className="w-3/4">
                        <h2 className="card-title">{data.researchPaperType}</h2>
                        <h4>Title: {data.title}</h4>
                        <p>Journal: {data.journalList}</p>
                    </div>
                    <div className="card-actions w-fit">
                        <button className="btn btn-sm btn-warning" onClick={() => navigate(`/paperapprovalview/${data._id}`)}><BiShow className="text-xl mr-1"/> View</button>
                        <button onClick={handlePublishConformation} className="btn btn-sm btn-accent">Approve</button>
                        <button className="btn btn-sm btn-error text-white">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPaperApprovalCard;