
import Header from "~/components/header/Header";
import FooterCP from "~/components/footer/FooterCP";
import '../components/utility/utility.css';
import MovieUpcomming from "~/components/movieupcomming/MovieUpcomming";

function MovieUpcomingPage()
{
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
            <MovieUpcomming></MovieUpcomming>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default MovieUpcomingPage;