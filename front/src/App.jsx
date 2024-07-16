import { Link } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import Header from "./Header"

const Title = () => {
  return (
    <h1>
      Team 25 Restaurant
    </h1>
  )
}

function App() {
  return (
    <div 
      className="bg-primary h-100 p-5"
      style={{ color: 'white' }}
    > 
      <Title />
    </div>
  )
}


export default App
