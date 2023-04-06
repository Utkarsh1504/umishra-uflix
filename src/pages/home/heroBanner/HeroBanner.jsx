import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.scss'
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data])


  // const searchQueryHandler = (e) => {
  //   if (e.key === "Enter" && query.length > 0) {
  //     navigate(`/search/${query}`);
  //   }
  // }

  const handleSearch = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const searchQueryHandler = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className='heroBanner'>
      {!loading && <div className="backdrop_img">
        <Img src={background} />
      </div>}
      <div className="opacity_layer"></div>
      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title'>Welcome</span>
          <span className='subTitle'>Millons of Movies, TV shows and People to discover. Explore Now.</span>
          <div className="searchInput">
            <input
              type="text"
              placeholder='Search for a movie or tv show...'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              tabIndex={2}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
