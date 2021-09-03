import React , { useState, useEffect } from 'react'

const Home = () => {

  const [userName, setUserName] = useState('');

  const userHomePage = async () => {
    try{
      const res = await fetch('/getData' , {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    }catch(err){
      console.log(err);

    }
  }
  

  useEffect (()=> {
      userHomePage(); 
        // eslint-disable-next-line 
      }, [])

  return(
    <>
    <div className = "home_page">
      <div className = "home_div">
      <h3 class= "heading_home">CCET Website</h3>
         <p className = "heading_home welcome">WELCOME </p>
         <h1 class = "heading_home" >{userName} </h1>
      </div>
    </div>
    
    </>
  )
}

export default Home;