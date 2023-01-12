import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App 



const result = await fetch("https://api.quotable.io/random");
      console.log(await result.json());


function GrabQuotes() {  //add async at start
  
  // const result = await fetch("https://api.quotable.io/random");
  // console.log(await result.json());
  return <div>I am a component</div>
}



export function App() {
  return (
    <div>
      <h1>Quote Search</h1>
      <form id="form">
        <input type="search" placeholder="Search..."/>
      </form>
      <h2>Random quote here</h2>
      <GrabQuotes/>
    </div>
  )
}
