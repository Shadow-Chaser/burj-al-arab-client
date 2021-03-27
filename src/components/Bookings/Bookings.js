import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [bookings, setBookings] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:8000/bookings?email='+loggedInUser.email, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [])
    
    return (
        <div>
            <h1>You have {bookings.length} bookings!</h1>

            {
                bookings.map(book=> <div>
                    <h3>Name: {book.name}</h3>
                    <h5>From: {(new Date(book.checkIn).toDateString('dd/mm/yyyy'))}</h5>
                    <h5>To: {(new Date(book.checkOut).toDateString('dd/mm/yyyy'))}</h5>
                    
                     </div>)
            }
        </div>
    );
};

export default Bookings;