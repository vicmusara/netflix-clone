import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmMwYWIyOTdiNzdhNzNjMTYxZDIwM2VkODk0YzIxOSIsIm5iZiI6MTcyMzYzOTQ2NC45NzUwNDgsInN1YiI6IjY2YmNhNWI5MmJhZWY3MDFlYmE0NTljNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QafKLNEkyJdF8wX3wD2qTUurbOzLBvxqF8Wl62UTwQQ',
        },
    };

    const fetchData = useCallback(() => {
        setLoading(true);
        setError(null);
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => {
                if (response.results && response.results.length > 0) {
                    setApiData(response.results[0]);
                } else {
                    setApiData({});
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load data');
                setLoading(false);
            });
    }, [id, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleBackClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="player">
            <img src={back_arrow_icon} alt="back" onClick={handleBackClick} />
            {apiData && apiData.key ? (
                <iframe
                    width='90%'
                    height='90%'
                    src={`https://www.youtube.com/embed/${apiData.key}`}
                    title='trailer'
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Trailer not available</p>
            )}
            <div className="player-info">
                <p>{apiData && apiData.published_at ? apiData.published_at.slice(0, 10) : 'N/A'}</p>
                <p>{apiData && apiData.name ? apiData.name : 'N/A'}</p>
                <p>{apiData && apiData.type ? apiData.type : 'N/A'}</p>
            </div>
        </div>
    );
};

export default Player;