import './Home.css'
import NavBar from "../../components/NavBar/NavBar.jsx";
import hero_banner from "../../assets/hero_banner.jpg"
import hero_title from "../../assets/hero_title.png"
import play_icon from "../../assets/play_icon.png"
import info_icon from "../../assets/info_icon.png"
import TitleCards from "../../components/TitleCard/TitleCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {

    const [movieId, setMovieId] = useState(null);
    const navigate = useNavigate();

    const searchMovie = () => {
        const query = 'The Protector'; // Movie/TV series name
        const year = 2018; // Release year

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE'
            }
        };

        // Include year in the query if searching for a movie
        fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&first_air_date_year=${year}&language=en-US`, options)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const result = data.results.find(item => item.name === 'The Protector' && item.first_air_date.includes('2018'));
                    if (result) {
                        const id = result.id;
                        setMovieId(id);
                    }
                }
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        searchMovie(); // Search for the TV series on component mount
    }, []);

    const handlePlayClick = () => {
        if (movieId) {
            navigate(`/player/${movieId}`);
        } else {
            console.error("Movie ID not found");
        }
    };
    return (
        <div>
            <NavBar />
            <div className="hero">
                <img src={hero_banner} alt="hero banner" className="banner-img"/>
                <div className="hero-caption">
                    <img src={hero_title} alt="hero title" className="caption-img"/>
                    <p>Lorem consequat dissentiunt diam commodo reprimique ceteros diam eam ullamcorper lectus sem mattis detraxit metus reprehendunt nam sapientem tota felis dolores sagittis vituperatoribus mucius postea sale fermentum varius molestiae morbi vocibus</p>
                <div className="hero-btns">
                    <button onClick={handlePlayClick} className="btn"><img src={play_icon} alt=""/>Play</button>
                    <button className="btn dark-btn"><img src={info_icon} alt=""/>More Info</button>
                </div>
                    <TitleCards />
                </div>
            </div>

            <div className="more-cards">
               <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
               <TitleCards title={"Only on Netflix"} category={"popular"}/>
               <TitleCards title={"Upcoming"} category={"upcoming"}/>
               <TitleCards title={"Top Picks for You"} category={"now_playing"}/>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
