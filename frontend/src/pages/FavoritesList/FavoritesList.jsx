import React from "react";
import axios from "axios"

const CreateFavorite = () => {
    
    async function createFavorite(favorite) {
        try {
            let response = await axios.post(`127.0.0.1:5000/api/favorite`,favorite)
            console.log("You loved it!!")
        } catch (error) {
            console.log(error)        }

    }
    const [title, setTitle] = useState('');
    const [thumbnail_nail, setThumbnail_Nail] = useState('');

    function handleSubmit (e){
        let newFavorite = {
        title: title,
        thumbnail_nail: thumbnail_nail
        
    }
        e.preventDefault()
        createFavorite(newFavorite)
    }


    return (
        <form onSubmit={handleSubmit}>
             <label>Title</label>
            <input type="text" value={title}  onChange={(event) => setTitle(event.target.value)} data-test="title"></input>
            <lablel>Thumbnail_url</lablel>
            <input type="text" value={thumbnail_nail}  onChange={(event) => setThumbnail_Nail(event.target.value)} data-test="thumbnail_nail"></input>
            <button type="submit" data-testid="submit btn">Favorite</button>
        </form>
            
        
    );
}
export default CreateFavorite;