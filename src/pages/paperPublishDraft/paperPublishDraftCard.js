import {BiShow} from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const PaperPublishDraftCard  = (props) => {
    const {data, index, ModalShow} = props;
    const navigate = useNavigate();

    return (
        <div>
            <div className="card w-[1250px] bg-base-100 text-black my-3 drop-shadow-md">
                <div className="card-body">
                    <h2 className="card-title">{data.researchPaperType}</h2>
                    <h4>Title: {data.title}</h4>
                    <p>Journal: {data.journalList}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-warning" onClick={() => navigate(`/paperpublishdraft/${data._id}`)}><BiShow className="text-xl mr-1"/> View</button>
                        <button className="btn btn-accent">Publish</button>
                        <button className="btn btn-error">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaperPublishDraftCard;