import SlideList from "~/components/slider-list/SlideLists";
import Header from "~/components/header/Header";
import FooterCP from "~/components/footer/FooterCP";
import '../components/utility/utility.css';
import Search from "~/components/search-page/Search";
function SearchPage()
{
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
                <Search></Search>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default SearchPage;