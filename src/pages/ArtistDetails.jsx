import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {

    const { activeSong, isPlaying } = useSelector((state) => state.player);
    
    // it takes songid as defined in route, checks route and fetches route param
    const {id: artistId} = useParams();
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
    
    if(isFetchingArtistDetails) return <Loader title="Loading artist details" />;

    if(error) return <Error/>;

    return (
        <div className="flex flex-col">
            <DetailsHeader
            artistId={artistId}
            artistData={artistData?.data[0]}
            />
            
            <RelatedSongs
                data={artistData?.data[0].views['top-songs']?.data}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    );

}


export default ArtistDetails;
