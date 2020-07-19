import React, { useState, useEffect } from 'react';
import './customers.css';

function Customers() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [customers, setCustomers] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("/api/customers")
        .then(res => res.json())
        .then(
          (customers) => {
            setIsLoaded(true);
            setCustomers(customers);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

    
    return (
    <div>
    <h2>Customers</h2>
    <ul>
        {customers.map((customer) =>
        <li key={customer.id}> {customer.firstName} {customer.lastName}</li>
        )}
    </ul>
    </div>
    );

}

export default Customers;
