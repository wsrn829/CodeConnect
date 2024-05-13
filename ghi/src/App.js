import React from 'react';
import { AuthProvider } from './AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import PostForm from "./PostForm";
import PostList from "./PostList";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import MessageItem from "./MessageItem";
import MessagePage from "./MessagePage";
import FollowingList from "./FollowingList";
import FollowButton from "./FollowButton";
import LikeButton from "./LikeButton";
import ProfileForm from "./ProfileForm";
import ProfilePage from "./ProfilePage";
import ProfileUpdate from "./ProfileUpdate";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import ProjectItem from "./ProjectItem";
import FollowLists from "./FollowLists";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="/messages/create" element={<MessageForm />} />
            <Route path="/messages/:id" element={<MessageItem />} />
            <Route path="/messagepage" element={<MessagePage />} />
            <Route path="/followlists" element={<FollowLists />} />
            <Route path="/posts/create" element={<PostForm />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/profile/create" element={<ProfileForm />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/profile/:username/update" element={<ProfileUpdate />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/create" element={<ProjectForm />} />
            <Route path="/projects/:id" element={<ProjectItem />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;