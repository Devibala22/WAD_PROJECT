import React, { useState } from 'react'
import Popup from './Popup';

function TeacherCourses() {
  const [showPopup, setShowPopup] = useState(false);
  const [subject, setSubject] = useState('');

  const crreateCourse = (sub)=>{
    setShowPopup(true);
    setSubject(sub);
  }

  return (
    <>
      <div className='flex gap-10 pl-48 mx-48 mt-11 flex-wrap justify-center'>
          <div className="subject cursor-pointer" onClick={()=>crreateCourse("c")}>
            <img src="https://cdn-icons-png.flaticon.com/512/6132/6132222.png" alt="c" />
            <p>C</p>
          </div>
          <div className="subject cursor-pointer" onClick={()=>crreateCourse("cpp")}>
            <img src="https://cdn-icons-png.flaticon.com/512/6132/6132221.png" alt="cpp" />
            <p>C++</p>
          </div>
          <div className="subject cursor-pointer" onClick={()=>crreateCourse("java")}>
            <img src="https://cdn-icons-png.flaticon.com/512/226/226777.png" alt="java" />
            <p>Java</p>
          </div>
          <div className="subject cursor-pointer" onClick={()=>crreateCourse("python")}>
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968350.png" alt="python" />
            <p>Python</p>
          </div>
          <div className="subject cursor-pointer" onClick={()=>crreateCourse("dbms")}>
            <img src="https://cdn-icons-png.flaticon.com/512/4248/4248443.png" alt="dbms" />
            <p>DBMS</p>
          </div>
      </div>
      {showPopup && (
        <Popup onClose={()=> setShowPopup(false)} subject={subject}/>
      )}
  </>

)}

export default TeacherCourses