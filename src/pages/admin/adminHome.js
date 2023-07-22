import { useNavigate } from "react-router-dom";
import AdminNavbar from "../shared/adminNavbar";
import AdminUpperNavbar from "../shared/adminUpperNavbar";
import Navbar from "../shared/navbar";
import UpperNavbar from "../shared/upperNavbar";
import { useQuery } from "react-query";
import PaperPublishDraftCard from "../paperPublishDraft/paperPublishDraftCard";
import AdminPaperApprovalCard from "./adminPaperApprovalCard";



const AdminHome = (props) => {
    const {show, setShow} = props;
    let id = localStorage.getItem('adminId');
    const navigate = useNavigate();

    const {data: paperData, isLoading: paperLoading, refetch} = useQuery('paperDataForApproval', () => {
        return  fetch(`http://localhost:8000/api/v1/published-paper/get-all-papers/unapprovalpaper`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then(res => res.json())
        })
    

    if(!id){
        return navigate('/login')
    }
    

    return (
        <div className='flex flex-row'>
            <div className={`${show? '': 'bg-white w-[50px]'} border-r-2 h-screen border-gray-2001`} >
                <AdminNavbar show={show}/>
            </div>

            <div className="w-full bg-gray-100 relative">
                <div className='h-[40px] bg-white w-full drop-shadow-md absolute z-10'>
                    <AdminUpperNavbar show={show} setShow={setShow}/>
                </div>
                <div className="px-8 pt-20 pb-2 flex flex-col overflow-y-scroll h-screen">
                    {/* <h2 className="text-center font-bold text-xl">Publish Your Paper</h2> */}
                    {
                        (paperData?.data?.length) ?

                        paperData?.data.map((d, index) => <AdminPaperApprovalCard data={d} index={index} refetch={refetch} />)
                        
                        :
                        
                        <div className='text-2xl mt-6 text-center text-blue-500'>No paper left for Approval! </div>
                    }
                        
                </div>
            </div>
        </div>
        
    );
    
}

export default AdminHome;