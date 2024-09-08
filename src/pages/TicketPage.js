import Theaterdetail from "~/components/theaterdetail/Theaterdetail";
import Header from "~/components/header/Header";
import FooterCP from "~/components/footer/FooterCP";
import '../components/utility/utility.css';
import { useParams } from "react-router-dom";
import Ticket from "~/components/ticket/Ticket";
function TicketPage()
{
  
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
            <Ticket></Ticket>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default TicketPage;