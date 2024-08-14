import cards_data from "../../assets/cards/Cards_data.js";
import "./TitleCard.css"
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

const TitleCards = ({title, category}) => {


    const cardsRef = useRef();

    const [apiData, setApiData] = useState([]);
    
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmMwYWIyOTdiNzdhNzNjMTYxZDIwM2VkODk0YzIxOSIsIm5iZiI6MTcyMzYzOTQ2NC45NzUwNDgsInN1YiI6IjY2YmNhNWI5MmJhZWY3MDFlYmE0NTljNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QafKLNEkyJdF8wX3wD2qTUurbOzLBvxqF8Wl62UTwQQ'
        }
    };

    const handleWheel = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results))
            .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel)
    }, []);


    return (
        <div className="title-cards">
            <h2>{title?title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {
                    apiData.map((item, index) => {
                        return <Link className="card" key={index} to={`/player/${item.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500`+item.backdrop_path} alt="movie-thumbnail "/>
                            <p>{item.original_title}</p>
                        </Link>
                    })
                }
            </div>
        </div>
    );
};

export default TitleCards;
