import { useState } from 'react';
import Community from '../community/community';
import Newsfeed from '../newsFeed/newsfeed';
import PaperPublish from '../paperPublish/paperpublish';
import PaperSearch from '../paperSearch/papersearch';
import Profile from '../profile/profile';
import Navbar from '../shared/navbar';
import UpperNavbar from '../shared/upperNavbar';
import { Route, Router, Routes } from 'react-router-dom';




function Home() {
    const [show, setShow] = useState(true);
    
    return (
        <div className='flex flex-row'>
            <div className="basis-2/12 border-r-2 h-screen border-gray-200" >
            <Navbar />
            </div>

            <div className="w-full bg-gray-100 relative">
            <div className='h-[40px] bg-white w-full drop-shadow-md absolute z-10'>
                <UpperNavbar/>
            </div>
            <Routes >
                <Route path='/' element={<Newsfeed></Newsfeed>}></Route>
                <Route path='/papersearch' element={<PaperSearch></PaperSearch>}></Route>
                <Route path='/paperpublish' element={<PaperPublish></PaperPublish>}></Route>
                <Route path='/community' element={<Community></Community>}></Route>
                <Route path='/profile' element={<Profile></Profile>}></Route>
            </Routes>
            </div>
        </div>
    );
}

export default Home;