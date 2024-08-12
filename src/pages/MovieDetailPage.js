import MovieDetail from "~/components/movie-detail/MovieDetail";
import Header from "~/components/header/Header";
import FooterCP from "~/components/footer/FooterCP";
import '../components/utility/utility.css';

function MovieDetailPage()
{


    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
            <MovieDetail></MovieDetail>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default MovieDetailPage;