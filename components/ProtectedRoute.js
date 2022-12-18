import React,{useState} from 'react'
import {useEffect} from 'react'
// import  { useNavigate   } from 'react-router-dom'
import { useRouter } from "next/router";

export const ProtectedRoute = (Component) => (props) => {
  const router = useRouter();
    // const [login,setLogin] = useState(false)
    // localStorage.setItem('user',[])
    // let navigate = useNavigate();

    useEffect(()=>{
      const token = JSON.parse(localStorage.getItem('user'))
      if(token?.token == null){
          console.log(token,'token')
          // return navigate('/authentication/sign-in')
          return router.push('/login')
      }else{
        console.log("")
        // return
      }
    },[])
  
    
  return (
    <>
    {/* {console.log(props.props)} */}
      {/* {props.props}  */}
      <Component {...props}></Component>
    </>
  )
}
