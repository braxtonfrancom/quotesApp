import { useEffect, useState } from 'react'
import './App.css'

interface Quote {
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
  const [quotes, setQuotes] = useState< Quote[] | null >([])
  

  async function callApi() {
    setLoading(true);
    const result = await fetch("https://api.quotable.io/random");
    const quoteObject = await result.json();
    setLoading(false);
    setQuote(quoteObject.content);
    setAuthor(quoteObject.author);
  }

  async function callSearchApi() {
    setListQuotesBool(true);
    const listOfResults = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query=" + searchWord); 
    const quotesObject = await listOfResults.json();
    setQuotes(quotesObject['results'])
  }

      
  useEffect(() => {
    callApi()
  },[])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
              quotes?.map((quote) => (
                <div key={quote.content}>
                  <div className="listItem">
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