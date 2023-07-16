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
import PaperPublishDraft from '../paperPublishDraft/paperPublishDraft';
import PaperPublishDraftView from '../paperPublishDraft/paperPublishDraftView';
import PublishedPaperView from '../profile/publishedPaperView';
import ProfileViewed from '../profile/profileViewed';
import SearchPeople from '../people/searchPeople';
import Followers from '../profile/followers';
import Following from '../profile/following';
import GovernmentProject from '../Government/governmentProject';

function Home() {
    const [show, setShow] = useState(true);
    console.log(show);

    return (
        <div>
            <Routes>
                <Route path='/newsFeed' element={<Newsfeed show={show} setShow={setShow}></Newsfeed>}></Route>

                <Route path='/' element={<PaperSearch show={show} setShow={setShow}></PaperSearch>}></Route>

                <Route path='/people' element={<SearchPeople show={show} setShow={setShow}></SearchPeople>}></Route>

                <Route path='/paperpublish' element={<PaperPublish show={show} setShow={setShow}></PaperPublish>}></Route>

                <Route path='/paperpublishdraft' element={<PaperPublishDraft show={show} setShow={setShow}></PaperPublishDraft>}></Route>

                <Route path='/paperpublishdraft/:draft_id' element={<PaperPublishDraftView show={show} setShow={setShow}></PaperPublishDraftView>}></Route>

                <Route path='/paperpublished/:published_id' element={<PublishedPaperView show={show} setShow={setShow}></PublishedPaperView>}></Route>

                <Route path='/govermentproject' element={<GovernmentProject show={show} setShow={setShow}></GovernmentProject>}></Route>

                <Route path='/community' element={<Community show={show} setShow={setShow}></Community>}></Route>

                <Route path='/profile' element={<Profile show={show} setShow={setShow}></Profile>}></Route>

                <Route path='/follower' element={<Followers show={show} setShow={setShow}></Followers>}></Route>

                <Route path='/following' element={<Following show={show} setShow={setShow}></Following>}></Route>

                <Route path='/userprofile/:user_id' element={<ProfileViewed show={show} setShow={setShow}></ProfileViewed>}></Route>

                <Route path='/login' element={<Login></Login>}></Route>

                <Route path='/signup' element={<Signup></Signup>}></Route>
            </Routes>
        </div>
    );
}

export default Home;