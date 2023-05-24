import publishImage from '../../assets/undraw/publish.svg'
import {MdOutlinePublish} from 'react-icons/md';
import Navbar from '../shared/navbar';
import UpperNavbar from '../shared/upperNavbar';
import userAuth from '../../hooks/userAuth';
function PaperPublish(props) {
    const {show, setShow} = props;
    const [user] = userAuth();
    
    console.log(user);

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
                    <h2 className="text-center font-bold text-xl">Request Your Paper For Publish</h2>
                    <div className="self-center w-[600px] ">
                        <div className="card bg-base-100 drop-shadow-md my-5 rounded-[5px] px-6 py-10">
                            <div className="flex flex-col items-center">
                                <img className='w-72' src={publishImage} alt="" />
                                <input type="text" placeholder="Your Paper Title..." class="input input-bordered w-[300px]  drop-shadow-md input-sm my-2" />
                                <input type="file" class="file-input file-input-bordered file-input-success drop-shadow-md  file-input-sm text-black  w-[300px] my-2 capitalize" />

                                <button className="btn btn-xs h-[30px] capitalize gap-2 text-white w-[300px] my-2 drop-shadow-md">
                                    <MdOutlinePublish className='text-[18px]'/>
                                    Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default PaperPublish;