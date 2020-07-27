import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const UserTypeContext = React.createContext();

export const UserTypeProvider = (props) => {

    const apiUrl = "/api/usertype";

    const { getToken } = useContext(UserProfileContext);
    const [userTypes, setUserTypes] = useState([]);

    const getAllUserTypes = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setUserTypes));

    return (
        <UserTypeContext.Provider value={{ userTypes, getAllUserTypes }}>
            {props.children}
        </UserTypeContext.Provider>
    );
};
