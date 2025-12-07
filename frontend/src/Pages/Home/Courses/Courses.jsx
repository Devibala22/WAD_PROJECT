import React, { useState } from 'react';
import '../Landing/Landing.css';
import Footer from '../../Footer/Footer';
import Header from '../Header/Header';

function Courses() {
  const [facList, setFacList] = useState([]);
  const [loading, setLoading] = useState(true);

  const teachersList = async (sub) => {
    setLoading(true);

    const response = await fetch(`/api/course/${sub}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    setFacList(data.data);
    console.log(data.data);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="courses">
        <p>Faculty List</p>
        <hr className="underLine" />

        <div className="subjects">
          <div className="subject" onClick={() => teachersList("c")}>
            <img src="https://cdn-icons-png.flaticon.com/512/6132/6132222.png" alt="C" />
            <p>C</p>
          </div>

          <div className="subject" onClick={() => teachersList("cpp")}>
            <img src="https://cdn-icons-png.flaticon.com/512/6132/6132221.png" alt="C++" />
            <p>C++</p>
          </div>

          <div className="subject" onClick={() => teachersList("java")}>
            <img src="https://cdn-icons-png.flaticon.com/512/226/226777.png" alt="Java" />
            <p>Java</p>
          </div>

          <div className="subject" onClick={() => teachersList("python")}>
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968350.png" alt="Python" />
            <p>Python</p>
          </div>

          <div className="subject" onClick={() => teachersList("dbms")}>
            <img src="https://cdn-icons-png.flaticon.com/512/4248/4248443.png" alt="DBMS" />
            <p>DBMS</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-10">
          {!loading && facList && (
            facList.map(fac => (
              <div key={fac._id} className="bg-[#99afbc] p-5 rounded-md">
                <div className="flex gap-3 items-center mb-2">
                  <img
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                    alt="profile_img"
                    width={50}
                  />
                  <div className="flex flex-col justify-center items-start pl-3">
                    <p>{fac.enrolledteacher.Firstname} {fac.enrolledteacher.Lastname}</p>
                    <h4 className="text-blue-900">{fac.enrolledteacher.Email}</h4>
                  </div>
                </div>

                {fac.enrolledteacher.Email === "urttsg@gmail.com"
                  ? <h4><span className="font-bold text-brown-800">Education :</span> Post graduate from PSG TECH</h4>
                  : <h4><span className="font-bold text-brown-800">Education :</span> Post graduate from PSG TECHs</h4>
                }

                {fac.enrolledteacher.Email === "urttsg@gmail.com"
                  ? <h4>1 year of teaching experience</h4>
                  : <h4>2 years of teaching experience</h4>
                }
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Courses;


