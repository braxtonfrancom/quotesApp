import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react'



interface Quote {
  quote: string;
  author: string;

}

export function App() {

  const [quoteContent, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [loading, setLoading] = useState(false)
  const [listQuotesBool, setListQuotesBool] = useState(false)
  const [listQuotes, setListQuotes] = useState([''])
  const [listQuotes2, setListQuotes2] = useState([''])
  const [listQuotes3, setListQuotes3] = useState([''])

  const [searchWord, setSearchWord] = useState('')
  


  async function callApi() {  //add async at start
    setLoading(true);
    const result = await fetch("https://api.quotable.io/random");
    const quoteObject = await result.json();
    await timeout(500);
    setLoading(false);
    setQuote(quoteObject.content);
    setAuthor(quoteObject.author);
  }

  async function callSearchApi() {
    setListQuotesBool(true);
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + searchWord);    //https://the-trivia-api.com/api/questions 
    const quotesObject = await result.json();
    // console.log(await result.json());
    console.log(quotesObject.results)
    //console.log(searchWord)
    setListQuotes(quotesObject.results[0].content + quotesObject.results[0].author)
    setListQuotes2(quotesObject.results[1].content + quotesObject.results[1].author)
    setListQuotes3(quotesObject.results[2].content + quotesObject.results[2].author)


    //console.log(quotesObject[0].question)
    // setListQuotes(quotesObject[0].question + quotesObject[0].correctAnswer); //[0].question    //["bru", "bru"]
    // setListQuotes2(quotesObject[1].question + quotesObject[1].correctAnswer)
    // setListQuotes3(quotesObject[2].question + quotesObject[2].correctAnswer)
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
      <form id="form" onSubmit={handleSubmit}> {/*onSubmit={handleSubmit}*/}
        <input 
        type="search" 
        placeholder="Search..." 
        id="search" 
        onChange={(event) =>
          setSearchWord(event.target.value)
        }
        // onSubmit={  
        //   (e) => handleSubmit(e)
          
        // }
        // onChange={(e) => setListQuotes(e.target.valueAsNumber)}

         />                      {/*(e) => e.preventDefault()*/}
      </form>
      <div>  
        {
          <div>
            {listQuotesBool ? <>
            <h3 className='listItem'>{listQuotes}</h3>
            <h3 className='listItem'>{listQuotes2}</h3>
            <h3 className='listItem'>{listQuotes3}</h3></> : <><h3>{loading ? <>Loading..</> : <>{quoteContent}</>}</h3>
            <h4>{author}</h4></>}


            <h4>{searchWord}</h4>
          </div>
        }
      </div>
    </div>
  )
}


{/*gitignore the node_modules!

SIde Effect*/}