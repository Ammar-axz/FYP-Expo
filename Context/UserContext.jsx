import { createContext,useContext, useState } from "react";

const UserContext = createContext()

export const userData = ()=> useContext(UserContext)

export const UserContextProvider = ({children})=>{
    const [loggedInUserId, setLoggedInUserId] = useState("")
    const [loggedInUser, setLoggedInUser] = useState("Demo User")
    const [loggedInUserPfp, setLoggedInUserPfp] = useState("")
    const [loggedInUserPoints, setLoggedInUserPoints] = useState(0)
    return(
    <UserContext.Provider value={{loggedInUser,loggedInUserId,
    loggedInUserPfp,loggedInUserPoints,setLoggedInUser, setLoggedInUserPfp,setLoggedInUserId,setLoggedInUserPoints}}>
        {children}
    </UserContext.Provider>
    )
}