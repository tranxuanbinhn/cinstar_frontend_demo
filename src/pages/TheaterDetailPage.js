import Theaterdetail from "~/components/theaterdetail/Theaterdetail";
import Header from "~/components/header/Header";
import FooterCP from "~/components/footer/FooterCP";
import '../components/utility/utility.css';
import { useParams } from "react-router-dom";
function TheaterDetailPage()
{
  
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
            <Theaterdetail></Theaterdetail>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default TheaterDetailPage;