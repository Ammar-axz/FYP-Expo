import { createContext, useContext, useState } from "react";

const UserContext = createContext()

export const userData = ()=> useContext(UserContext)

export const UserContextProvider = ({children})=>{
    const [loggedInUserId, setLoggedInUserId] = useState("")
    const [loggedInUserChild, setLoggedInUserChild] = useState("")
    const [loggedInUser, setLoggedInUser] = useState("Demo User")
    const [loggedInUserRole, setLoggedInUserRole] = useState("Demo User")
    const [loggedInUserPfp, setLoggedInUserPfp] = useState("")
    const [loggedInUserPoints, setLoggedInUserPoints] = useState(0)
    const [loggedInUserClasses, setLoggedInUserClasses] = useState([])
    return(
    <UserContext.Provider value={{loggedInUser,loggedInUserId,loggedInUserChild,loggedInUserRole,
    loggedInUserPfp,loggedInUserPoints,loggedInUserClasses,setLoggedInUser, setLoggedInUserPfp,
    setLoggedInUserId,setLoggedInUserChild,setLoggedInUserRole,setLoggedInUserPoints, setLoggedInUserClasses}}>
        {children}
    </UserContext.Provider>
    )
}