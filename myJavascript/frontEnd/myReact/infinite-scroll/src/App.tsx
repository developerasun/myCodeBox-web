import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUser] = React.useState<any[]>([])
  let offset = 1
  const loadMoreUser = async () => {
    const newUser:any = []
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then((res)=>{

      res.data.map((user:any) => newUser.push(user))
      console.log(newUser)

      setUser((prev:any)=>[...prev, ...newUser])
    })
    offset+=1
    console.log("updated offset: ", offset)
  }
  React.useEffect(() => {
    loadMoreUser()
    window.addEventListener("scroll", () => {
      // window innerHeight + scrollTop = scroll height
      // console.log("window innerHeight: ", window.innerHeight)
      // console.log("scrollTop: ", document.documentElement.scrollTop)
      // console.log("height:", document.documentElement.scrollHeight)
      if (
        window.innerHeight + document.documentElement.scrollTop +1
        >= document.documentElement.scrollHeight) {
          console.log("page bottom")
          loadMoreUser()
      }
    })
    return () => {
      
    }
  }, [])
  
  return (
    <div className="App">
      {users?.map((user:any, index:number) => <p key={Math.random()} style={{"fontSize":"35px"}}>{index+1}: {user.name}</p>)}
    </div>
  );
}

export default App;
