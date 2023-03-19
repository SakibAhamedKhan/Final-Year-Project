import React, { Component } from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Navbar from './pages/shared/navbar';
import PaperSearch from './pages/paperSearch/papersearch';
import PaperPublish from './pages/paperPublish/paperpublish';
import Community from './pages/community/community';
import Profile from './pages/profile/profile';
import Newsfeed from './pages/newsFeed/newsfeed';

class App extends Component {
  render() {
    return (
      <div className='flex flex-row'>
        <div className="basis-2/12 border-r-2 h-screen border-gray-200" >
          <Navbar />
        </div>

        <div className="w-full bg-gray-100">
          <Routes >
            <Route path='/' element={<Newsfeed></Newsfeed>}></Route>
            <Route path='/papersearch' element={<PaperSearch></PaperSearch>}></Route>
            <Route path='/paperpublsh' element={<PaperPublish></PaperPublish>}></Route>
            <Route path='/community' element={<Community></Community>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
