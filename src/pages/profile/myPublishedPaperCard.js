import {BiShow} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ConvertTime from "../paperSearch/converttime"

const MyPublishedPaperCard  = (props) => {
    const {data, index, ModalShow, refetch} = props;
    const navigate = useNavigate();

    
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
            <div className="card w-full bg-gray-100 text-black my-6 drop-shadow-lg">
                <div className="flex justify-between items-center p-4">
                    <div className="">
                        <h2 className="card-title">{data.researchPaperType}</h2>
                        <h4>Title: {data.title}</h4>
                        <p>Journal: {data.journalList}</p>
                        <div className="flex items-center my-1"><p className="text-sm mr-2 mt-[-2px]">Published here: </p><ConvertTime date={data.createdAt} ></ConvertTime></div>
                    </div>
                    <div className="card-actions">
                        <button className="btn btn-sm btn-warning" onClick={() => navigate(`/paperpublished/${data._id}`)}><BiShow className="text-xl mr-1"/> View</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPublishedPaperCard;