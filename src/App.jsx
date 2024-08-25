import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {

  return(
    <div>
      <Navbar />
      <Manager />
      <Footer />
    </div>
  )
}

export default App
