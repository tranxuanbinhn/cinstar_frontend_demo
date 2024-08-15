import SearchTheater from "./search-theater/SearchTheater";
import SlideList from "../slider-list/SlideLists";
import { useSelector } from "react-redux";
const Search = () => {
    const moviesfind = useSelector((state)=> state.movie.moviesfind);
    const theatersfind = useSelector((state)=> state.movie.theatersfind);
    console.log('moviesfind',moviesfind);
    console.log('theatersfind',theatersfind);


    
    return (<div>
        <div className="mt-100 mt-1348 pt-100"></div>
        {
            moviesfind?(<SlideList movieshowings={moviesfind} nameTitle="Kết quả tìm kiếm"/>):(<div></div>)
        }
         {
            theatersfind?( <SearchTheater theatersfind={theatersfind}></SearchTheater>):(<div></div>)
        }
       
    </div>);
}
export default Search;