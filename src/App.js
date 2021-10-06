import React,{useState,useEffect, useCallback} from 'react'
import './App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import db from './firebase-config'
import {collection, getDocs,addDoc,updateDoc,deleteDoc,doc} from 'firebase/firestore'
function App() {
  const [users,setUsers]=useState([])
  const [name,setName]=useState('')
  const [age,setAge]=useState(0)
  const [loading,setIsLoading]=useState(false)
  const usersCollectionRef=collection(db,'users')
  
  const updateUser=async(id,age)=>{
    setIsLoading(true)
    const userDoc=doc(db,'users',id)
    const newFields={age:parseInt(age)+1}
    setIsLoading(false)
    await updateDoc(userDoc,newFields)
    getUsers()

  }
  const deleteUser=async(id)=>{
    setIsLoading(true)
    const userDoc=doc(db,"users",id)
    setIsLoading(false)
    await deleteDoc(userDoc)
    getUsers()
  }
  const createUser=async()=>{
    setIsLoading(true)
    await addDoc(usersCollectionRef,{name:name,age:age})
    setName('')
    setAge()
    getUsers()
    setIsLoading(false)
  }
  const getUsers=useCallback(async()=> {
    setIsLoading(true)
    const  data=await getDocs(usersCollectionRef)
    console.log(data);
    setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))  
    setIsLoading(false)
  },[])
  useEffect(() => {
   getUsers();
  },[getUsers])
  if(loading){
    return  <center><Loader type="TailSpin"  color="#00BFFF" height={150} width={150} /></center>
  }
  return (
    <div className="App">
    <input type='text' value={name} placeholder ='Name...' onChange={(event)=>{setName(event.target.value)}}/>
    <input type='number' value={age} placeholder='Age...' onChange={(event)=>{setAge(event.target.value)}}/>
    <button onClick={createUser}>Create User</button>
      {users.map((data,index)=>(
        <div key={index}>
        <h1>{data.name}</h1>
        <h1>{data.age}</h1>
        <button onClick={()=>{updateUser(data.id,data.age)}}>Update User</button>
        <button onClick={()=>{deleteUser(data.id)}}>Delete User</button>

        </div>
      ))}
    </div>
  );
  }
export default App;
