import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import React from 'react'

export default function DashBoard() {
    const {user}=useContext(UserContext);
  return (
    <center>
      <h1>DashBoard</h1>
      <>
      {!!user && (<h1>Hii {user.name}!</h1>)}
      </>     
    </center>
  )
}
