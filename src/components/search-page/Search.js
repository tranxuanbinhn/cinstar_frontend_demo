import SearchTheater from "./search-theater/SearchTheater";
import SlideList from "../slider-list/SlideLists";
const Search = () => {
    
    return (<div>
        <div className="mt-100 mt-1348 pt-100"></div>
        <SlideList nameTitle="Kết quả tìm kiếm"/>
        <SearchTheater></SearchTheater>
    </div>);
}
export default Search;