import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Story from './Story';
import Highlight from './Highlight';
import Loader from './Loader'; // Import the Loader component

const Karan = () => {
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState('danielamelchior');
    const [modalContent, setModalContent] = useState(null);
    const [showStory, setShowStory] = useState(false); 
    const [showHighlight, setShowHighlight] = useState(false); 
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        let modal;
        if (modalContent) {
            modal = new window.bootstrap.Modal(document.getElementById('carouselModal'), {
                backdrop: 'static',
                keyboard: false
            });
            modal.show();
        }
        return () => {
            if (modal) {
                modal.hide();
            }
        };
    }, [modalContent]);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading
        const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${username}&response_type=feeds&corsEnabled=true`;

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
            setProfile(result[0]);
            setShowStory(false); 
            setShowHighlight(false); 
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleCarouselClick = (carouselMedia) => {
        setModalContent(carouselMedia);
    };

    return (
        <div className="container">
            <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Instagram username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </form>

            {loading && <Loader />} {/* Show loader when loading */}

            {!loading && profile && (
                <>
                    <div className="card mb-3">
                        <div className="row g-0">
                            {profile.hd_profile_pic_url_info && (
                                <div className="col-md-4">
                                    <img src={profile.hd_profile_pic_url_info.url} className="img-fluid rounded-start" alt={profile.username} />
                                </div>
                            )}
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{profile.full_name} ({profile.username})</h5>
                                    <p className="card-text">{profile.biography}</p>
                                    <p className="card-text"><small className="text-muted">Followers: {profile.follower_count}</small></p>
                                    <p className="card-text"><small className="text-muted">Following: {profile.following_count}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-4">
                        <button className="btn btn-primary me-2" onClick={() => setShowStory(!showStory)}>
                            {showStory ? "Show Profile Posts" : "Show Story"}
                        </button>
                        <button className="btn btn-primary" onClick={() => setShowHighlight(!showHighlight)}>
                            {showHighlight ? "Show Profile Posts" : "Show Highlight"}
                        </button>
                    </div>
                </>
            )}

            {!loading && profile && !showStory && !showHighlight && (
                <div className="row mb-4">
                    {profile.feed.data.map((post, postIndex) => {
                        if (post.media_type === 1) {
                            return (
                                <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={post.id}>
                                    <div className="card">
                                        <img
                                            src={post.image_versions2.candidates[0].url}
                                            alt={post.caption ? post.caption.text : "Instagram Post"}
                                            className="card-img-top img-fluid"
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>
                            );
                        } else if (post.media_type === 8) {
                            return (
                                <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={postIndex}>
                                    <div className="card">
                                        <div className="carousel-thumbnail" onClick={() => handleCarouselClick(post.carousel_media)}>
                                            <img
                                                src={post.carousel_media[0].image_versions2.candidates[0].url}
                                                alt="Carousel thumbnail"
                                                className="card-img-top img-fluid"
                                                style={{ height: '250px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        } else if (post.media_type === 2) {
                            return (
                                <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={post.id}>
                                    <div className="card">
                                        <video
                                            controls
                                            className="card-img-top img-fluid"
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        >
                                            <source src={post.video_versions[0].url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            )}

            {profile && showStory && <Story username={username} />}
            {profile && showHighlight && <Highlight username={username} />}

            <div className="modal fade" id="carouselModal" tabIndex="-1" aria-labelledby="carouselModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="carouselModalLabel">Carousel</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {modalContent && (
                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {modalContent.map((carouselPost, carouselIndex) => (
                                            carouselPost.image_versions2.candidates.map((image, index) => (
                                                <div className={`carousel-item ${carouselIndex === 0 && index === 0 ? 'active' : ''}`} key={`${carouselIndex}-${index}`}>
                                                    <img src={image.url} alt="Carousel image" className="d-block w-100" style={{ objectFit: 'cover', height: 'auto' }} />
                                                </div>
                                            ))
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Karan;
