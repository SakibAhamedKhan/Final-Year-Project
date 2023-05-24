import Navbar from "./navbar";
import UpperNavbar from "./upperNavbar";

const UserAuthLoadingPage = (props) => {
    const {show, setShow} = props;

    return (
       
        <div className='flex flex-row'>
        <div className={`${show? '': 'bg-white w-[50px]'} border-r-2 h-screen border-gray-2001`} >
            <Navbar show={show}/>
        </div>

        <div className="w-full bg-gray-100 relative">
            <div className='h-[40px] bg-white w-full drop-shadow-md absolute z-10'>
                <UpperNavbar show={show} setShow={setShow}/>
            </div>
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>   
            
        </div>
    </div>
    )
}

export default UserAuthLoadingPage