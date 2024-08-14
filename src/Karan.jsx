// // import React, { useState } from 'react';

// // const Karan = () => {
// //     const [profile, setProfile] = useState(null);
// //     const [query, setQuery] = useState('');
// //     const [error, setError] = useState(null);

// //     const handleSearchSubmit = async (event) => {
// //         event.preventDefault();
// //         const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${query}&response_type=feeds&corsEnabled=true`;
// //         const options = {
// //             method: 'GET',
// //             headers: {
// //                 'X-RapidAPI-Key': '5c1884b7e0msh77124ca6c295885p12cc0cjsnbf6e21d5faa5', // Replace with your RapidAPI key
// //                 'X-RapidAPI-Host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
// //             }
// //         };

// //         try {
// //             const response = await fetch(url, options);
// //             const result = await response.json();
// //             if (result && result[0] && result[0].hd_profile_pic_url_info) {
// //                 setProfile(result[0]);
// //                 setError(null);
// //             } else {
// //                 setProfile(null);
// //                 setError('Profile not found or no profile picture available.');
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             setError('An error occurred while fetching the profile.');
// //         }
// //     };

// //     return (
// //         <>
// //             <nav className="navbar navbar-expand-lg bg-light">
// //                 <div className="container-fluid">
// //                     <a className="navbar-brand" href="#">Navbar</a>
// //                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// //                         <span className="navbar-toggler-icon"></span>
// //                     </button>
// //                     <div className="collapse navbar-collapse" id="navbarNav">
// //                         <ul className="navbar-nav">
// //                             <li className="nav-item">
// //                                 <nav className="navbar bg-light">
// //                                     <div className="container-fluid">
// //                                         <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
// //                                             <input 
// //                                                 className="form-control me-2" 
// //                                                 type="search" 
// //                                                 placeholder="Search" 
// //                                                 aria-label="Search" 
// //                                                 value={query} 
// //                                                 onChange={(e) => setQuery(e.target.value)} 
// //                                             />
// //                                             <button className="btn btn-outline-success" type="submit">Search</button>
// //                                         </form>
// //                                     </div>
// //                                 </nav>
// //                             </li>
// //                         </ul>
// //                     </div>
// //                 </div>
// //             </nav>
// //             <div className="container mt-4">
// //                 {profile ? (
// //                     <>
// //                         <div className="card mb-3">
// //                             <div className="row g-0">
// //                                 <div className="col-md-4">
// //                                     <img src={profile.hd_profile_pic_url_info.url} className="img-fluid rounded-start" alt={profile.username} />
// //                                 </div>
// //                                 <div className="col-md-8">
// //                                     <div className="card-body">
// //                                         <h5 className="card-title">{profile.full_name} ({profile.username})</h5>
// //                                         <p className="card-text">{profile.biography}</p>
// //                                         <p className="card-text"><small className="text-muted">Followers: {profile.follower_count}</small></p>
// //                                         <p className="card-text"><small className="text-muted">Following: {profile.following_count}</small></p>
// //                                         <a href={profile.external_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit Website</a>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <div className="row">
// //                             {profile.feed.data.map((post) => (
// //                                 <div key={post.id} className="col-md-4 mb-3">
// //                                     <div className="card">
// //                                         <img src={post.image_versions2.candidates[0].url} className="card-img-top" alt="Post" />
// //                                         <div className="card-body">
// //                                             <p className="card-text">{post.caption ? post.caption.text : ''}</p>
// //                                             <p className="card-text"><small className="text-muted">Likes: {post.like_count}</small></p>
// //                                             <p className="card-text"><small className="text-muted">Comments: {post.comment_count}</small></p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </>
// //                 ) : (
// //                     <p>No profile data available</p>
// //                 )}
// //             </div>
// //         </>
// //     );
// // };

// // export default Karan;


// import React, { useState } from 'react';
// import Loader from './Loader'; // Make sure to import the Loader component

// const Karan = () => {
//     const [profile, setProfile] = useState(null);
//     const [query, setQuery] = useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false); // Add loading state

//     const handleSearchSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true); // Set loading to true when starting fetch
//         setError(null); // Clear any previous error
//         setProfile(null); // Clear previous profile data

//         const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${query}&response_type=feeds&corsEnabled=true`;
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '5c1884b7e0msh77124ca6c295885p12cc0cjsnbf6e21d5faa5', // Replace with your RapidAPI key
//                 'X-RapidAPI-Host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
//             }
//         };

//         try {
//             const response = await fetch(url, options);
//             const result = await response.json();
//             console.log(result); 
//             if (result && result[0] && result[0].hd_profile_pic_url_info) {
//                 setProfile(result[0]);
//                 setError(null);
//             } else {
//                 setError('Profile not found or no profile picture available.');
//             }
//         } catch (error) {
//             console.error(error);
//             setError('An error occurred while fetching the profile.');
//         } finally {
//             setLoading(false); // Set loading to false when fetch is complete
//         }
//     };

//     return (
//         <>
//             <nav className="navbar navbar-expand-lg bg-light">
//                 <div className="container-fluid">
//                     <a className="navbar-brand" href="#">Navbar</a>
//                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarNav">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <nav className="navbar bg-light">
//                                     <div className="container-fluid">
//                                         <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
//                                             <input 
//                                                 className="form-control me-2" 
//                                                 type="search" 
//                                                 placeholder="Search" 
//                                                 aria-label="Search" 
//                                                 value={query} 
//                                                 onChange={(e) => setQuery(e.target.value)} 
//                                             />
//                                             <button className="btn btn-outline-success" type="submit">Search</button>
//                                         </form>
//                                     </div>
//                                 </nav>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             <div className="container mt-4">
//                 {loading ? (
//                     <Loader /> // Show loader while loading is true
//                 ) : profile ? (
//                     <>
//                         <div className="card mb-3">
//                             <div className="row g-0">
//                                 <div className="col-md-4">
//                                     <img src={profile.hd_profile_pic_url_info.url} className="img-fluid rounded-start" alt={profile.username} />
//                                 </div>
//                                 <div className="col-md-8">
//                                     <div className="card-body">
//                                         <h5 className="card-title">{profile.full_name} ({profile.username})</h5>
//                                         <p className="card-text">{profile.biography}</p>
//                                         <p className="card-text"><small className="text-muted">Followers: {profile.follower_count}</small></p>
//                                         <p className="card-text"><small className="text-muted">Following: {profile.following_count}</small></p>
//                                         <a href={profile.external_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit Website</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="row">
//                             {profile.feed.data.map((post) => (
//                                 <div key={post.id} className="col-md-4 mb-3">
//                                     <div className="card">
//                                         <img src={post.image_versions2.candidates[0].url} className="card-img-top" alt="Post" />
//                                         <div className="card-body">
//                                             <p className="card-text">{post.caption ? post.caption.text : ''}</p>
//                                             <p className="card-text"><small className="text-muted">Likes: {post.like_count}</small></p>
//                                             <p className="card-text"><small className="text-muted">Comments: {post.comment_count}</small></p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </>
//                 ) : (
//                     <p>{error || 'No profile data available'}</p>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Karan;

// =========================================================

// ===================================================================================================


// this is my third try code
import React, { useState } from 'react';
import Loader from './Loader'; // Make sure to import the Loader component
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

const Karan = () => {
    const [profile, setProfile] = useState(null);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when starting fetch
        setError(null); // Clear any previous error
        setProfile(null); // Clear previous profile data

        const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${query}&response_type=feeds&corsEnabled=true`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5c1884b7e0msh77124ca6c295885p12cc0cjsnbf6e21d5faa5', // Replace with your RapidAPI key
                'X-RapidAPI-Host': 'instagram-bulk-profile-scrapper.p.rapidapi.com',
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            if (result && result[0] && result[0].hd_profile_pic_url_info) {
                setProfile(result[0]);
                setError(null);
            } else {
                setError('Profile not found or no profile picture available.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred while fetching the profile.');
        } finally {
            setLoading(false); // Set loading to false when fetch is complete
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <button className="navbar-brand btn btn-link" onClick={() => {}}>Navbar</button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <nav className="navbar bg-light">
                                    <div className="container-fluid">
                                        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                                            <input
                                                className="form-control me-2"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                            />
                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                        </form>
                                    </div>
                                </nav>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                {loading ? (
                    <Loader /> // Show loader while loading is true
                ) : profile ? (
                    <>
                        <div className="card mb-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={profile.hd_profile_pic_url_info.url} className="img-fluid rounded-start" alt={profile.username} />
                                </div>
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

                        <div className="row">
                            {profile.feed.data.map((post) => (
                                <div key={post.id} className="col-md-4 mb-3">
                                    <div className="card">
                                        {post.media_type === 1 && (
                                            <img src={post.image_versions2.candidates[0].url} className="card-img-top" alt="Post" />
                                        )}
                                        {post.media_type === 2 && (
                                            <video controls className="card-img-top">
                                                <source src={post.video_versions[0].url} type="video/mp4" />
                                            </video>
                                        )}
                                        {post.media_type === 8 && (
                                            <Carousel>
                                                {post.carousel_media.map((mediaItem, idx) => (
                                                    <Carousel.Item key={idx}>
                                                        {mediaItem.media_type === 1 ? (
                                                            <img src={mediaItem.image_versions2.candidates[0].url} className="d-block w-100" alt="Carousel Post" />
                                                        ) : (
                                                            <video controls className="d-block w-100">
                                                                <source src={mediaItem.video_versions[0].url} type="video/mp4" />
                                                            </video>
                                                        )}
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        )}
                                        <div className="card-body">
                                            <p className="card-text">{post.caption ? post.caption.text : ''}</p>
                                            <p className="card-text"><small className="text-muted">Likes: {post.like_count}</small></p>
                                            <p className="card-text"><small className="text-muted">Comments: {post.comment_count}</small></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>{error || 'No profile data available'}</p>
                )}
            </div>
        </>
    );
};

export default Karan;


