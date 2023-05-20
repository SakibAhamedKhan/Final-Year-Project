import React, { Component, useState } from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Navbar from './pages/shared/navbar';
import PaperSearch from './pages/paperSearch/papersearch';
import PaperPublish from './pages/paperPublish/paperpublish';
import Community from './pages/community/community';
import Profile from './pages/profile/profile';
import Newsfeed from './pages/newsFeed/newsfeed';
import UpperNavbar from './pages/shared/upperNavbar';

class App extends Component {  
  render() {
    

    return (
      <Home/>
    );
  }
}

export default App;
