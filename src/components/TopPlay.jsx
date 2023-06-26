import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";


const TopChartCard = ({song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#308a54] py-2 p-4 rounded-lg mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i+1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img className="w-20 h-20 rounded-lg" src={song?.images?.coverart} alt={song?.title} />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/song/${song.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-ase text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
    isPlaying={isPlaying}
    activeSong={activeSong}
    song={song}
    handlePause={handlePauseClick}
    handlePlay={handlePlayClick}
    />
  </div>
)


const TopPlay = () => {
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector((state) => state.player);
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'});
  });

  const topPlays = data?.slice(0,5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };

  return (
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col" ref={divRef}>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">
            Top Charts
          </h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">
              See more
            </p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, i)}
            i={i}
             />
          ))}
        </div>
      </div>
      
      <div className="w-full flex flex-col mt-8">
      <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">
            Top Artists
          </h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">
              See more
            </p>
          </Link>
        </div>
        <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
            key={song?.key}
            style={{width: '25%', height: 'auto'}}
            className="shadow-lg rounded-full animate-slideright"
            >
              <Link
              to={`/artists/${song?.artists[0].adamid}`}
              >
                <img src={song?.images.background} alt="Name" className="rounded-full w-full object-cover"/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
    </div>
  )

}

export default TopPlay;