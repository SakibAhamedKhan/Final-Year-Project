import {BiShow} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const PendingPaperCard  = (props) => {
    const {data, index, ModalShow, refetch} = props;
    const navigate = useNavigate();


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
                        
                        <button className="btn btn-sm btn-accent">Pending</button>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PendingPaperCard;