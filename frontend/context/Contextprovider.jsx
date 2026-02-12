import {createContext,useContext,useState} from 'react'

const authContext = createContext()


export default function ContentProvider ({children}){
      

    const [user,setUser]=useState(null);

    return(
        <div>
           <authContext.Provider value ={{user}}>
           {children}
           </authContext.Provider>
        </div>

    )
}
 export const useAuth =()=>useContext(authContext)