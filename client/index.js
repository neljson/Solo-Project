import React from 'react'
import { render } from 'react-dom'
import App from '../client/components/App'
import './styles.css'
//react will render our App component in the body of our index.html
render(<App />, document.getElementById('app'))
