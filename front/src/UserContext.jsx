import React,{ createContext, useState} from "react";



export const UserContext = createContext()

// Pass information that needs to be globally accessible across multiple components
const GlobalProvider = ({children}) => {

    const [user,setUser] =useState(null); // null when user is not logged in 
    const [credits, setCredits] = useState([]); //store credits (optional)
    const [cartItems, SetCartItems] =useState([]);

    const contextValues = {
        credits,
        setCredits,
        cartItems,
        SetCartItems,
    };

    return(
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    )
}

export default GlobalProvider;