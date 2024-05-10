import React, { useState } from 'react';
import AuthContext from './AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import MessageItem from "./MessageItem";
import MessagePage from "./MessagePage";
import FollowingList from "./FollowingList";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import ProfilePage from "./ProfilePage";
import ProfileUpdate from "./ProfileUpdate";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import ProjectItem from "./ProjectItem";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, setIsLoggedIn, handleLogin, handleLogout }}>
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<MessageList />} />
          <Route path="/messages/create" element={<MessageForm />} />
          <Route path="/messages/:id" element={<MessageItem />} />
          <Route path="/messagepage" element={<MessagePage />} />
          <Route path="/following" element={<FollowingList />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/update" element={<ProfileUpdate />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/create" element={<ProjectForm />} />
          <Route path="/projects/:id" element={<ProjectItem />} />
        </Routes>
      </div>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;