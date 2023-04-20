import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function BookDetailPage() {
    const { bookId } = useParams();
    const [bookData, setBookData] = useState(null);
    const [ reviewData, setReviewData] = useState(null);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
          setBookData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();

      const listReviews = async () => {
        try{
            const response = await axios.get(`http://127.0.0.1:5000/api/book?book_id=${bookId}`);
            setReviewData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      listReviews();

    }, [bookId]);

   
    if (!bookData) {
      return <div>Loading...</div>;
    }
  
    const { title, authors, description, reviews} = bookData.volumeInfo;
  
    return (
      <div>
        <h1>{title}</h1>
        <h2>by {authors.join(', ')}</h2>
        <p>{description}</p>
        <p>{reviews}</p>
      </div>
    );
  }
  
  export default BookDetailPage;