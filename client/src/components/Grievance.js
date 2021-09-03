import React, {useEffect, useState} from 'react'

const Grievance = () => {
  
  const [userData, setUserData] = useState({name:"",rollno:"",email:"", message:""});

  const userContact = async () => {
    try{
      const res = await fetch('/getData' , {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData, name:data.name, rollno:data.rollno, email:data.email});

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    }catch(err){
      console.log(err);

    }
  }
  

  useEffect (()=> {
      userContact(); 
        // eslint-disable-next-line 
      }, [])


      //to store data in states
      const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData , [name] :value});
      }

      //sending the data to backend
      const contactForm = async (e) => {
        e.preventDefault();
        const {name, rollno ,email , message} = userData;
        const res = await fetch('/grievance', {
          method : "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name, rollno , email, message
          })
        });
        const data = await res.json();
        if(!data){
          console.log("Message not sent");
        }else{
          alert("Message Sent");
          setUserData({...userData,message:""});
        }
      }


  return(
    <>
    <div className = "contact_info">
      <div className = "container-fluid">
        <div className = "row">
          <div className = "col-lg-10 offset-lg-1 d-flex justify-content-between mt-5 mb-5">
          {/* phone number */}
            <div className = "contact_info_item d-flex justify-content-start align-items-center p-2">
              <img src= "https://img.icons8.com/small/32/000000/ringing-phone.png" className = "contact_img" alt = "phone"/>
              <div className = "contact_info_content">
                <div className = "contact_info_title">Phone</div>
                <div className = "contact_info_text"> +91-172-2750872</div>
              </div>
            </div>

            {/* email */}
            <div className = "contact_info_item d-flex justify-content-start align-items-center p-2">
              <img src= "https://img.icons8.com/small/32/000000/new-post.png" className = "contact_img" alt = "email"/>
              <div className = "contact_info_content">
                <div className = "contact_info_title">Email</div>
                <div className = "contact_info_text">academiccell@ccet.ac.in</div>
              </div>
            </div>

            {/* address */}
            <div className = "contact_info_item d-flex justify-content-start align-items-center p-2">
              <img src= "https://img.icons8.com/small/32/000000/address.png" className = "contact_img" alt = "address"/>
              <div className = "contact_info_content">
                <div className = "contact_info_title">Address</div>
                <div className = "contact_info_text">	CCET, Sector-26 , Chandigarh, Pincode: 160019, India.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    {/* Report Grievance form */}

    <div className = "contact_form">
      <div className = "container">
        <div className = "row">
          <div className = "col-lg-10 offset-lg-1">
            <div className = "contact_form_container py-5">
              <div className = "contact_form_title">Want to Report a Grievance?</div>
              <form id = "contact_form" method = "POST">

                <div className = "contact_form_name d-flex justify-content-between align-items-between mt-5">
                <input type = "text" id = "contact_form_name" className = "contact_form_name input_field "
                 value = {userData.name} onChange = {handleInputs} name = "name"
                 placeholder = "Your Name" required = "true" />

                <input type = "text" id = "contact_form_name" className = "contact_form_name input_field"
                 value = {userData.rollno} onChange = {handleInputs} placeholder = "Your Rollno" 
                 name = "rollno" required = "true"/>

                <input type = "email" id = "contact_form_email" className = "contact_form_email input_field"
                value = {userData.email} onChange = {handleInputs} placeholder = "Your Email" 
                name = "email" required = "true"/>

                  </div>

                <div className = "contact_form_text mt-5">
                  <textarea className = "text_field contact_form_message" value = {userData.message}
                  placeholder= "Your Grievance" id = "" cols = "100" rows = "10" name = "message"
                  onChange = {handleInputs}></textarea>
                </div>
                <div className = "form-group form_button">
                  <button type = "submit" onClick = {contactForm} className = "form-submit" 
                  id = "signin">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Grievance;