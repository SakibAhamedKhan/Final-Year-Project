import Navbar from "./navbar";
import UpperNavbar from "./upperNavbar";
import alertImage from '../../assets/undraw/alert.svg'

const ToLoginAlert = (props) => {
    const {show, setShow, message} = props;

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
                <img className='w-72' src={alertImage} alt="" />
                <p className="text-xl font-semibold">{message}</p>
            </div>   
        </div>
    </div>
    )
}

export default ToLoginAlert