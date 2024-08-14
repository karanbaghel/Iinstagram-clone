// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const InstagramPosts = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           'https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=thegautitoons',
//           {
//             headers: {
//               'X-RapidAPI-Key': '13fa5c5e10msh54a03f194479495p1b30eajsn2fd08ce4bd4d',
//               'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
//             }
//           }
//         );
//         console.log(response.data);
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Instagram Posts</h1>
//       <div>
//         {posts.map((post, index) => (
//           <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
//             <h2>{post.username}</h2>
//             {post.profile_pic_url && (
//               <img 
//                 src={post.profile_pic_url} 
//                 alt={`${post.username}'s profile`} 
//                 style={{ width: '50px', borderRadius: '50%' }} 
//               />
//             )}
//             <img src={post.image} alt={post.caption} style={{ width: '100%' }} />
//             <p>{post.caption}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InstagramPosts;

// ==================================================================================================================/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader'; // Import the Loader component

const App3 = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (username) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=${username}&corsEnabled=true`,
        {
          headers: {
            'X-RapidAPI-Key': '13fa5c5e10msh54a03f194479495p1b30eajsn2fd08ce4bd4d',
            'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
          }
        }
      );
      console.log(response.data);
      // Assuming response.data.data.items is the array of posts
      setPosts(response.data.data.items || []); // Ensure posts is always an array
    } catch (error) {
      console.error('Error fetching data: ', error);
      setPosts([]); // Set posts to an empty array in case of error
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(searchTerm);
  };

  return (
    <>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-3">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{post.caption.user.username}</h5>
                  {post.caption.user.profile_pic_url && (
                    <img
                      src={post.caption.user.profile_pic_url}
                      alt={`${post.caption.user.username}'s profile`}
                      className="rounded-circle"
                      style={{ width: '50px' }}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      )}
    </>
  );
};

export default App3;

