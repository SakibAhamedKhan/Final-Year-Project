import {BiShow} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ConvertTime from "../paperSearch/converttime"
import AuthorShow from "../shared/authorShow";

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

    console.log(data);
    return (
        <div>
            <div className="card w-full bg-gray-100 text-black my-6 drop-shadow-lg">
                <div className="flex justify-between items-center p-4">
                    <div className="w-5/6">
                        <h4 className="font-semibold text-xl">{data.title}</h4>
                        <h2 className="bg-green-200  w-fit rounded-md px-2 py-[1px] my-1 text-gray-500">{data.researchPaperType}</h2>
                        <p>Journal: {data.journalList}</p>
                        <div className="flex items-center my-1"><p className="text-sm mr-2 mt-[-2px]">Published here: </p><ConvertTime date={data.createdAt} ></ConvertTime></div>

                        <div className="my-2">
                            <h2 className="bg-blue-200  w-fit rounded-md px-2 py-[3px] text-black inline">Authors: </h2> 
                            <div className="">
                                {authorShow()}
                            </div>
                        </div>
                        <div className="my-2">
                            <h2 className="bg-orange-200  w-fit rounded-md px-2 py-[3px]  text-black inline">Co - Authors: </h2> 
                        </div>
                        <div className="">
                                {coAuthorShow()}
                        </div>
                    </div>
                    <div className="card-actions w-1/6 flex justify-end">
                        <button className="btn btn-sm btn-warning" onClick={() => navigate(`/paperpublished/${data._id}`)}><BiShow className="text-xl mr-1"/> View</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPublishedPaperCard;