import { useState } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate= useNavigate();

    const body= { first_name, last_name, email, username, password};

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch('http://localhost:5000/user/register', {
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
                navigate('/log-in');
            }
            else{
                throw data;
            }
            console.log(data);
        }).catch((err) =>{
            console.log(err);
            alert(err.message);
        })
    }

  return (
    <>
        <form onSubmit={handleSubmit} class="form-signup">
            <div class="form-group">
                <label for="first_name">First Name</label>
                <input type={Text} id="first_name" class="form-control" value={first_name} onChange={(e) =>{setFirst_name(e.target.value)}} placeholder="Enter first name" required></input>
            </div>
            <div class="form-group">
                <label for="last_name">Last Name</label>
                <input type={Text} id="last_name" class="form-control" value={last_name} onChange={(e) =>{setLast_name(e.target.value)}} placeholder="Enter last name" required></input>
            </div>
            <div class="form-group">
                <label for="email">email</label>
                <input type={Text} id="email" class="form-control" value={email} onChange={(e) =>{setEmail(e.target.value)}} placeholder="Enter email" required></input>
            </div>
            <div class="form-group">
                <label for="username">username</label>
                <input type={Text} id="username" class="form-control" value={username} onChange={(e) =>{setUsername(e.target.value)}} placeholder="Enter username" required></input>
            </div>
            <div class="form-group">
                <label for="password">password</label>
                <input type={password} id="password" class="form-control" value={password} onChange={(e) =>{setPassword(e.target.value)}} placeholder="Password" required></input>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">submit</button>
            </div>
        </form>
    </>
  )
}

export default Register