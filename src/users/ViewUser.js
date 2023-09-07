import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {

    const [user, setUser] = useState({
        name: "",
        userName: "",
        email: "",
      });
    
      const { id } = useParams();
    
      useEffect(() => {
        loadUser()
      }, []);
    
      const loadUser = async () => {
        try{
        const result = await axios.get(`http://localhost:8080/UserData/getUserInfoByID/${id}`);
        setUser(result.data);
        }
        catch(error){
          console.log('User not found here',error)
        }
      };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>
          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>User ID: </b>
                  {user.userId}
                </li>
                <li className="list-group-item">
                  <b>UserName: </b>
                  {user.userName}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {user.email}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
          </div>
        </div>
    </div>
  )
}