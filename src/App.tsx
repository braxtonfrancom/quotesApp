import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react'


let ID_COUNT = 0;
interface Quote {  //Never used interface 
  id: number;
  content: string;
  author: string;
}

export function App() {

  const [content, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [loading, setLoading] = useState(false)
  const [listQuotesBool, setListQuotesBool] = useState(false)

  const [searchWord, setSearchWord] = useState('')

  const [quotes, setQuotes] = useState< Quote[] | null >([])  //Trying to get the list of 20 quotes
  


  async function callApi() {
    setLoading(true);
    const result = await fetch("https://api.quotable.io/random");
    const quoteObject = await result.json();
    await timeout(200);
    setLoading(false);
    setQuote(quoteObject.content);
    setAuthor(quoteObject.author);
  }

  async function callSearchApi() {
    setListQuotesBool(true);
    const listOfResults = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + searchWord); 
    const quotesObject = await listOfResults.json();
    
    console.log(quotesObject)

    setQuotes(quotesObject['results'])
    console.log(quotes) //WHY IS IT AN EMPTY LIST??
  }



  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

      
  useEffect(() => { //On the first time you render, do this, and then never do it again
    callApi()
    
  },[])  //If you put something in the array, ex: [author] --> THIS means that anytime the author is changed, callApi() is called 


  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchWord(searchWord);
    callSearchApi()
  };


  return (
    <div>
      <h1>Quote Search</h1>
      <form id="form" onSubmit={handleSubmit}>
        <input 
        type="search" 
        placeholder="Search..." 
        id="search" 
        onChange={(event) =>
          setSearchWord(event.target.value)
        }
         />
      </form>
      <div>  
        {
          <div>

            {listQuotesBool ? <>
            
              {
              quotes.map((quote) => (
                <div key={quote.id}>
                  <div className="unique">
                    {quote.content}
                    <br />
                    <div>{"- " + quote.author}</div>
                  </div>
                </div>
              ))
            }
            </> : <>
            <h3>{loading ? <>Loading..
            </> : <>
            {content}</>}</h3>
            <h4>{author}</h4></>}

          </div>
        }
      </div>
    </div>
  )
}