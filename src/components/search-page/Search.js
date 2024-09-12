import SearchTheater from "./search-theater/SearchTheater";
import SlideList from "../slider-list/SlideLists";
import { useSelector } from "react-redux";
import './search.css';
const Search = () => {
    const moviesfind = useSelector((state)=> state.movie.moviesfind);
    const theatersfind = useSelector((state)=> state.movie.theatersfind);


    
    return (<div>
        <div className="mt-100 mt-1348 pt-100"></div>
        {
            moviesfind.length>0?(<SlideList movieshowings={moviesfind} nameTitle="Kết quả tìm kiếm"/>):(<div className="pb-100" style={{ color: '#FFFFFF' }}>Không có kết quả</div>)
        }
         {
            theatersfind?( <SearchTheater theatersfind={theatersfind}></SearchTheater>):(<div className="pb-100" style={{ color: '#FFFFFF'}}>Không có kết quả</div>)
        }
       
    </div>);
}
export default Search;