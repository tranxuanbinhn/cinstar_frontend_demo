
import Header from "~/components/header/Header";
import FooterCP from "~/components/footer/FooterCP";
import '../components/utility/utility.css';
import MovieShowing from "~/components/movieshowing/MovieShowing";
function MovieShowingPage()
{
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
            <MovieShowing></MovieShowing>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default MovieShowingPage;