import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";


function BookDetailPage() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const [favoriteData, setFavoriteData] = useState(null);
  const [user, token] = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      console.log(response.data);
      setBookData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const listReviews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/book?book_id=${bookId}`);
      console.log(response.data)
      // setReviewData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const listFavorites = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/favorite`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data)
      setFavoriteData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    listReviews();
    listFavorites();
  }, [bookId]);



  if (!reviewData) {
    return <div>Loading...</div>
  }

  if (!bookData) {
    return <div>Loading...</div>;
  }

  const { title, authors, description } = bookData.volumeInfo;

  return (
    !bookData ?
      <div>Loading... <button onClick={() => fetchData()}>Click For Book Data!</button></div>
    :

    <div>
    <div>
        Apparently there's book data holding {bookData.id}
      </div>
      <div>
      <h1>{title}</h1>
        <h2> by {authors.join(', ')}</h2>
        <p>{description}</p>
        <p>{reviewData["Average Rewview"]}</p>
       {reviewData.data.map(review => (
          <p>{review.comment}{review.rating}</p>))}
         {favoriteData.data?.map(favorite => (
           <p>{favorite.title}{favorite.thumbnail_nail}</p>
         ))}
     </div>
  ;
    </div>)
      
}

export default BookDetailPage;