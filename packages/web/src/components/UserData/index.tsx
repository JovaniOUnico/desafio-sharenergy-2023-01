import React from "react";
import * as U from './styles';

interface UserDataProps {
  foto:     string | undefined,
  name:     string | null,
  email:    string | null,
  username: string | null,
  age:      string | null
}

const UserData = ({foto, name, email, username, age}: UserDataProps) => {

  return (<U.Container>
            <div className="flex-row first"
                 role="cell">
              <U.Img src={foto}/>
            </div>
            <div className="flex-row"
                 role="cell">
              {name}
            </div>
            <div className="flex-row"
                 role="cell">
              {email}
            </div>
            <div className="flex-row"
                 role="cell">
              {username}
            </div>
            <div className="flex-row"
                 role="cell">
              {age}
            </div>
          </U.Container>)
}

export default UserData