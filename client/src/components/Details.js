import React, {useEffect, useState} from 'react'
import student from '../images/student.png'
import {useHistory} from 'react-router-dom';

const Details = () => {

  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callDetails = async () => {
    try{
      const res = await fetch('/details' , {
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    }catch(err){
      console.log(err);
      history.push('/login');

    }
  }
  

  useEffect (()=> {
      callDetails(); 
        // eslint-disable-next-line 
      }, [])
  return(
    <>
    <div className = "container p-5 emp-profile">
      <form method = "GET">
        <div className = "row">
          <div className = "col-md-4">
            <img src= {student} alt = "student"/>
          </div>
          <div className = "col-md-6 mb-1">
            <div className = "profile-head">
              <h5>{userData.name}</h5>
              <h6>{userData.rollno}</h6>
              <p className = "profile-rating mt-3 mb-5">Student</p>

              <h4 className = "details_heading">Details</h4>
            </div>
          </div>

          <div className = "col-md-2">
            <input type = "submit" className = "profile-edit-btn" name = "btnAddMore" value = "Edit Profile"/>
          </div>
        </div>

        <div className = "row ">
          {/* left data */}
          <div className = "col-md-4">
            <div className = "profile-work">
              <p>Official College Website - </p>
              <a href = "http://ccet.ac.in/" target = "_b">ccet</a>
            </div>
          </div>
          {/* right data */}
          <div className = "col-md-8 pl-5 about-info">
            <div className = "tab-content profile-tab" id = "myTabContent">
              <div className = "tab-pane fade show active" id = "home" role = "tabpanel" aria-labelledby = "home-tab">

                <div className = "row">
                  <div className = "col-md-6">User ID</div>
                  <div className = "col-md-6"><p>{userData._id}</p></div>
                  </div>

                  <div className = "row mt-2">
                  <div className = "col-md-6">Name</div>
                  <div className = "col-md-6"><p>{userData.name}</p></div>
                  </div>

                  <div className = "row mt-2">
                  <div className = "col-md-6">Email</div>
                  <div className = "col-md-6"><p>{userData.email}</p></div>
                  </div>

                  <div className = "row mt-2">
                  <div className = "col-md-6">Phone</div>
                  <div className = "col-md-6"><p>{userData.phone}</p></div>
                  </div>

                  <div className = "row mt-2">
                  <div className = "col-md-6">Branch</div>
                  <div className = "col-md-6"><p>{userData.branch}</p></div>
                  </div>

                  <div className = "row mt-2">
                  <div className = "col-md-6">Year</div>
                  <div className = "col-md-6"><p>{userData.year}</p></div>
                  </div>

                  <div className = "row mt-2">
                  <div className = "col-md-6">Roll No.</div>
                  <div className = "col-md-6"><p>{userData.rollno}</p></div>
                  </div>

                </div>
              </div>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}

export default Details;