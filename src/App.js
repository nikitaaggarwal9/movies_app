import logo from './logo.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Movies from './Components/Movies'
import Favourites from './Components/Favourites'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { Component } from 'react'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path='/'  render={(props) => 
          <>
            <Banner {...props} />
            <Movies {...props} />
          </>
        } /> */}
        <Route path='/' element={<><Banner/><Movies/></> } />
        <Route path='/favourites' element={<Favourites/>} />
      </Routes>
    </Router>
  );
}

export default App;

// <ReturnRoute path="/" componenet={</C>}/>
// function ReturnRoute({Component:component, ...rest}) {
//   return (
//    <Route {...rest} render={(props)=> {
//       return (
//         <Component {...props}/>
//       )
//    }}></Route>
//   )
// }
