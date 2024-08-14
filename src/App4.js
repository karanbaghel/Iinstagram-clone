import React, { useEffect, useState } from 'react';

const App4 = () => {
    const [profile, setProfile] = useState(null);

    const url = 'https://instagram-bulk-profile-scrapper.p.rapidapi.com/clients/api/ig/ig_profile?ig=danielamelchior&response_type=feeds&corsEnabled=true';
   
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '77636b06d5mshce8dd38fa80098cp16391djsn80fb66a1db4d',
            'x-rapidapi-host': 'instagram-bulk-profile-scrapper.p.rapidapi.com'
        }
       
    };

    const handleSearchSubmit = async (event) => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // setProfile(result.data.items[0].image_versions.items[0].url);
            // console.log(result.data.items[0].image_versions.items[0].url)
            // console.log(result[0]);
            console.log(result);
            setProfile(result[0]);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        handleSearchSubmit()
    }, [])


    return (
        <>
           
            <div>
                <img src={profile} alt="dvs" />
                {profile ? (
                    <>
                        <div className="row">
                            {profile.feed.data.map((post) => {
                                if (post.media_type === 8) {
                                    console.log(post.carousel_media)
                                    {post.carousel_media.map(()=>{
                                        <img src='' alt='karanimg'></img>

                                    })}
                                }
                                else if (post.media_type === 1) {
                                    console.log(post.image_versions2)
                                } else {
                                    console.log(post.video_versions)
                                }

                            })}
                        </div>
                    </>
                ) : (
                    <p>No profile data available</p>
                )}
            </div>
        </>
    );
};

export default App4;