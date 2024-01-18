import { useState } from 'react'
import './App.scss'
import Products from './components/Products';
import { Container } from 'react-bootstrap';

function App() {

  return (
    <Container>
      <Products/>
    </Container>
  )
}

export default App
