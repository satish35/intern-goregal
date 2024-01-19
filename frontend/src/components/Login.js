import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate= useNavigate();

    const body={username, password};

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch('http://localhost:5000/user/log-in',{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body),
        }).then((response) =>{
            return response.json();
        }).then((data) =>{
            if(data.status === 'success'){
                alert(data.message);
                navigate('/home');
            }
            else{
                throw data
            }
        }).catch((err) =>{
            console.log(err);
            alert(err.message);
        })
    }
  return (
    <>
        <form onSubmit={handleSubmit} class="form-signup">
            <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input type={Text} value={username} onChange={(e) =>{setUsername(e.target.value)}} id="username" class="form-control" aria-describedby="emailHelp" placeholder="Enter username"></input>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type={"password"} value={password} onChange={(e) =>{setPassword(e.target.value)}} class="form-control" id="password" placeholder="Password" required></input>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary" onClick={() =>{navigate('/register')}}>create new</button>
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </>
  )
}

export default Login