import { useEffect, useState } from 'react'
import React from 'react'
import HomeFeed from './HomeFeed';

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');

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
    })
  return (
    <>
        { loading? 'Loading..' : <HomeFeed username={user}/> }
    </>
  )
}

export default Home