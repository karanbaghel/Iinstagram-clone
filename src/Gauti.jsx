import React, { useEffect, useState } from 'react';

const Gauti = () => {
    const [profile, setProfile] = useState(null);

    const url = 'https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=karanbaghel007&response_type=feeds&corsEnabled=true';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5c1884b7e0msh77124ca6c295885p12cc0cjsnbf6e21d5faa5', // Replace with your RapidAPI key
            'X-RapidAPI-Host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
          }
    };

    const handleSearchSubmit = async (event) => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();

            console.log(result[0].hd_profile_pic_url_info.url);
            setProfile(result[0].hd_profile_pic_url_info.url);
           
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        handleSearchSubmit()
    }, [])


    return (
        <>
            {/* <div>
                <img src={profile} alt="dvs" />
            </div> */}

<nav class="navbar bg-light">
  <div class="container-fluid">
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
        </>
    );
};

export default Gauti;