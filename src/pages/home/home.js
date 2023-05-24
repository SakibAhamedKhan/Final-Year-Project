import { useState } from 'react';
import Community from '../community/community';
import Newsfeed from '../newsFeed/newsfeed';
import PaperPublish from '../paperPublish/paperpublish';
import PaperSearch from '../paperSearch/papersearch';
import Profile from '../profile/profile';
import Navbar from '../shared/navbar';
import UpperNavbar from '../shared/upperNavbar';
import { Route, Router, Routes } from 'react-router-dom';
import Login from '../account/login';
import Signup from '../account/signup';

function Home() {
    const [show, setShow] = useState(true);
    console.log(show);

    return (
        <div>
            <Routes>
                <Route path='/newsFeed' element={<Newsfeed show={show} setShow={setShow}></Newsfeed>}></Route>
                <Route path='/' element={<PaperSearch show={show} setShow={setShow}></PaperSearch>}></Route>
                <Route path='paperpublish' element={<PaperPublish show={show} setShow={setShow}></PaperPublish>}></Route>
                <Route path='community' element={<Community show={show} setShow={setShow}></Community>}></Route>
                <Route path='profile' element={<Profile show={show} setShow={setShow}></Profile>}></Route>
                <Route path='login' element={<Login></Login>}></Route>
                <Route path='signup' element={<Signup></Signup>}></Route>
            </Routes>
        </div>
    );
}

export default Home;