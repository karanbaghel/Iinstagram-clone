import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profile, setProfile] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=${searchQuery}&response_type=feeds&corsEnabled=true`;
    // const url = `https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=karanbaghel007&response_type=feeds&corsEnabled=true`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5c1884b7e0msh77124ca6c295885p12cc0cjsnbf6e21d5faa5', 
        'X-RapidAPI-Host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setProfile(result.data[0]);
      console.log(result.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
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
                        value={searchQuery}
                        onChange={handleSearchChange}
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
        {profile ? (
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
                    <a href={profile.external_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit Website</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {profile.feed.data.map((post) => (
                <div key={post.id} className="col-md-4 mb-3">
                  <div className="card">
                    <img src={post.image_versions2.candidates[0].url} className="card-img-top" alt="Post" />
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
          <p>No profile data available</p>
        )}
      </div> */}
    </>
  );
};

export default App;
