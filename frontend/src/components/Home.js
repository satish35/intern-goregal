import { useEffect, useState } from 'react'
import {
    useNavigate
} from 'react-router-dom'
import React from 'react'
import HomeFeed from './HomeFeed';

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');

    const navigate= useNavigate();

    useEffect(() =>{
        fetch('http://localhost:5000/', {
            method: 'GET',
            credentials: 'include'
        }).then((response) =>{
            return response.json();
        }).then((data) =>{
            if(data.status === 'success'){
                setUser(data.user);
                setLoading(false);
            }
            else{
                alert(data.message);
            }
        }).catch((err) =>{
            console.log(err);
        })
    });
    const handleLogout = (e) =>{
        e.preventDefault();
        fetch('http://localhost:5000/user/log-out', {
            method: 'GET',
            credentials: 'include'
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
        }). catch((err) =>{
            alert(err.message);
        })
    }
  return (
    <>
        { loading? 'Loading..' : <>
         <HomeFeed username={user}/>
         <button type='submit' onClick={handleLogout}>Logout</button>
          </> }
    </>
  )
}

export default Home