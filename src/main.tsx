import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import './index.css'
import scurry from '../src/assets/img/scurry.gif';
import dancer from '../src/assets/img/buckey_dance.gif'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="background-circle"></div>
    <div className='scurry'><img src={scurry} /></div>
    <div className='dancer'><img src={dancer} /></div>
    <App />
  </React.StrictMode>,
)
