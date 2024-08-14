import React, { useState, useEffect } from 'react';

const Highlight = ({ username }) => {
    const [highlights, setHighlights] = useState(null);
    const [fetched, setFetched] = useState(false); // State to track if data is fetched

    useEffect(() => {
        const fetchHighlights = async () => {
            const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${username}&response_type=story_highlights&corsEnabled=true`;

            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '77636b06d5mshce8dd38fa80098cp16391djsn80fb66a1db4d',
                    'x-rapidapi-host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result); // Log the fetched data to the console
                setHighlights(result[0].highlights.data.tray);
                setFetched(true); // Set fetched to true after data is fetched
            } catch (error) {
                console.error(error);
                setFetched(false); // In case of error, ensure fetched is false
            }
        };

        if (!fetched) { // Fetch data only if it hasn't been fetched yet
            fetchHighlights();
        }
    }, [username, fetched]); // Add fetched to dependency array

    return (
        <div className="container">
            {highlights ? (
                <div className="row">
                    {highlights.map((highlight, index) => (
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
                            <div className="card">
                                <img
                                    src={highlight.cover_media.cropped_image_version.url}
                                    alt={highlight.title}
                                    className="card-img-top img-fluid"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{highlight.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No highlights available</p>
            )}
        </div>
    );
};

export default Highlight;
