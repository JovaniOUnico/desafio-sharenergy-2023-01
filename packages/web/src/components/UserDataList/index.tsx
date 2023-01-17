import React from "react";
import UserData from "../UserData";

type UserDataListProps = {
  usuarios: Array<{name: string, username: string, email: string, foto: string, age: string}>;
};

const UserDataList = ({ usuarios }: UserDataListProps) => {
  return (
    <>
      {usuarios.map((value, index) => {
          const name     = value['name'];
          const username = value['username'];
          const foto     = value['foto'];
          const email    = value['email'];
          const age      = value['age'];

          return(<div key={index}>
                   <UserData name={name}
                             username={username}
                             foto={foto}
                             email={email}
                             age={age}/>
                 </div>);
        }
      )}
    </>
  )
}

export default UserDataList;