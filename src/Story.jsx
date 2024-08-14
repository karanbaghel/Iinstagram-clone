import React, { useState, useEffect } from 'react';

const Story = ({ username }) => {
    const [stories, setStories] = useState(null);

    useEffect(() => {
        const fetchStories = async () => {
            const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${username}&response_type=story&corsEnabled=true`;

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
                console.log(result);
                setStories(result[0].story.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStories();
    }, [username]);

    return (
        <div className="container">
            {stories ? (
                <div className="row">
                    {stories.map((story, index) => (
                        <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
                            <div className="card">
                                {story.media_type === 1 ? (
                                    <img
                                        src={story.image_versions2.candidates[0].url}
                                        alt="Story"
                                        className="card-img-top img-fluid"
                                        style={{ height: '250px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <video
                                        controls
                                        className="card-img-top img-fluid"
                                        style={{ height: '250px', objectFit: 'cover' }}
                                    >
                                        <source src={story.video_versions[0].url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No stories available</p>
            )}
        </div>
    );
};

export default Story;
