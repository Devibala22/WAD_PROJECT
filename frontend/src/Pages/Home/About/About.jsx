import React from 'react'
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg";
import '../Landing/Landing.css'
import Footer from "../../Footer/Footer.jsx"
import Header from '../Header/Header.jsx';

function About({backgroundC}) {
  return (
    <>
    <Header/>
    <div className="about" style={{backgroundColor: backgroundC}}>
        <h4>About Us</h4>
        <hr className="underLine"/>
        <div className="content">
          <div className="left-svg">
            <img src={Plant2} className="w-[22rem]" alt="" />
          </div>
          <p>
  At EurekaPath, we believe that learning should be a comfortable and inspiring journey. Our platform is built to guide students toward success by providing a wide range of courses and personalized learning experiences supported by qualified and dedicated staff.
  
  <h1 className="bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Our Story</h1>
  EurekaPath was created with a vision to make quality learning easily accessible to every student. Understanding the struggles of modern learners, we designed a platform that blends expert guidance with flexibility, helping students learn at their own pace with confidence.
  
  <h1 className="bg-blue-700 w-fit py-1 px-3 rounded-sm my-2">Our Mission</h1>
  Our mission is to make education effective, engaging, and stress-free. We aim to build a supportive learning environment where students can explore new subjects, strengthen their skills, and achieve their goals with the help of experienced educators. At EurekaPath, we don’t just teach — we guide every learner on their path to excellence.
          </p>

          <div className="right-svg">
            <img src={Plant} className="w-[30rem]" alt="" />
          </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default About

