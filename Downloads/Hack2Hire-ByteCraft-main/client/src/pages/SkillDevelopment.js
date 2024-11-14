// src/pages/SkillDevelopment.js
import React from 'react';
import '../styles/SkillDevelopment.css';

//since we are redirecting to an external link, we cant use react-router-dom
//useNavigate is for internal navigation only

function SkillDevelopment() {
  const AdvanceWebDevCourse = () => {
    window.open('https://www.youtube.com/watch?v=Q-icS7yZz5k'); 
  };
  const frontEndDev = () =>{
    window.open = '';
  }

  return (
    <div className="skill-development">
      <h1>Skill Development</h1>
      <button className="skill-card" onClick={AdvanceWebDevCourse}>Advanced Web Development</button>
      <button className="skill-card" onClick={AdvanceWebDevCourse}>Front End Development</button>
      <button className="skill-card" onClick={AdvanceWebDevCourse}>Back End Development</button>
      <button className="skill-card" onClick={AdvanceWebDevCourse}>MongoDB Basics</button>

    </div>
  );
}

export default SkillDevelopment;
