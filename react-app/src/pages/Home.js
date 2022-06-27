import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

  const navToStudent = (e) => {
    e.preventDefault();
    // window.location = "/student"
    navigate("/student");
  }

  const navToCourses = (e) =>{
    e.preventDefault();
    // window.location = "/course"
    navigate("/course");
  }

    return ( 
    <div>
      <button onClick={e => navToStudent(e)}> Manage Students </button>
      <button onClick={e => navToCourses(e)}> Manage Courses </button>
    </div>
    );
};

export default Home;