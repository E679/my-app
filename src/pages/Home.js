import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams  } from 'react-router-dom';

export default function Home() {

const[users, setUsers]=useState([]);

const { id } = useParams();

useEffect(()=>{
    loadUsers();
},[]);

const getURL="http://localhost:8080/UserData/getAllUsersInfo";

const loadUsers=async()=>{
    try{
    const result= await axios.get(getURL);
    setUsers(result.data);
    }
    catch(error){
        console.log('User list is empty',error);
        alert("There is No Data here please click on Add User");
    }
}

const deleteUser = async (id) => {
    try{
    await axios.delete(`http://localhost:8080/UserData/deleteUserInfoByID/${id}`);
    loadUsers();
    }
    catch(error){
        console.log('User not found to Delete',error)
    }
  };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">userId</th>
                            <th scope="col">username</th>
                            <th scope="col">email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,index)=>(
                            <tr>
                                {/* <th scope="row" key={index}>{index + 1}</th> */}
                                <td>{user.userId}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-primary mx-2"
                                    to={`/viewuser/${user.userId}`}
                                    >View</Link>
                                    <Link className="btn btn-outline-primary mx-2"
                                    to={`/edituser/${user.userId}`}
                                    >Edit</Link>
                                    <button className="btn btn-danger mx-2"
                                    onClick={() => deleteUser(user.userId)}
                                    >Delete</button>
                                </td>
                            </tr>
                            ))
                        }  
                    </tbody>
                </table>
            </div>
        </div>
    )
}
