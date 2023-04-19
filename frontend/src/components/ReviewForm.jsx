import React, {useState} from "react";
import axios from "axios"

const CreateReview = () => {
    
    async function createReview(review) {
        try {
            let response = await axios.post("http://127.0.0.1:5000/api/songs",review)
            console.log("Thanks for the Review!!!")
        } catch (error) {
            console.log(error)
        }

    }
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
   





    function handleSubmit (e){
        let newReview = {
        rating: rating,
        comment: comment,
        
    }
        e.preventDefault()
        createReview(newReview)
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>Rating</label>
            <input type="integer" value={rating}  onChange={(event) => setRating(event.target.value)} data-test="rating"></input>
            <lablel>comment</lablel>
            <input type="text" value={comment}  onChange={(event) => setComment(event.target.value)} data-test="comment"></input>
            <button type="submit" data-testid="submit btn">Submit</button>
            
            
        </form>
            
        
    );
}

export default CreateReview;
