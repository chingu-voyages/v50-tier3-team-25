import { Link } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import Header from "./Header"

const Title = () => {
  return (
    <h1>
      Hello World!
    </h1>
  )
}

function App() {
  return (
    <div 
      className="bg-primary h-100 p-5"
      style={{ color: 'white' }}
    > 
      <Header/>
      <NavBar/>
      <Link className="text-light" to='/about'>About</Link>
      <Title />
      <Footer/>
    </div>
  )
}


export default App
