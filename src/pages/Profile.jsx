import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

function Profile() {
  const { isAuthenticated, user, loading } = useContext(Context);
  // console.log(user);
  //ye dikhayengee hm loading hone ke baad
  return ( loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  )
  );        
};

export default Profile;
