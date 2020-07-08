import React, { useReducer } from "react";
import contacts  from "../contacts.js"

function Card(props) {
  return(
  <div>
    <div className="card">
        <div className="top">
          <h2 className="name">{props.name}</h2>
          <img
            class ="circle-img"
            src={props.img}
            alt="avatar_img"
          />
        </div>
        <div className="bottom">
          <p className="info">{props.tel}</p>
          <p className="info">{props.email}</p>
        </div>
      </div>
  </div>
  )
}


function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>

       contacts.forEach(user){ 
      <Card 
      name={user.name}
      img={user.imgURL}
      tel={user.phone}
      email={user.email}
      />
       }
       
    </div>
  );
}

export default App;
