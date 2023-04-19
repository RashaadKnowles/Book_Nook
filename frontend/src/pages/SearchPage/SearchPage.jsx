import React, {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function SearchPage() {
    const [searchString, setSearchString] = useState('');
    const [results, setResults] = useState([]);
  
    const handleChange = (event) => {
      setSearchString(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchString}`);
        setResults(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <h1>Search for Books</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={searchString} onChange={handleChange} />
          <button type="submit">Search</button>
        </form>
        {results.map((result) => (
          <Link to = {`/bookinfo/${result.id}`}>
          
          <div key={result.id}>
            <h2>{result.volumeInfo.title}</h2>
            <p>{result.volumeInfo.authors.join(', ')}</p>
          </div>
          </Link>
        ))}
      </div>
    );
  }
  
  export default SearchPage;