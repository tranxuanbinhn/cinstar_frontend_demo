import FooterCP from "~/components/footer/FooterCP";
import Header from "~/components/header/Header";
import PromtionComponent from "~/components/promotion/PromotionComponent";
import '../components/utility/utility.css';
import { Person } from "~/components/persionalinformation/Person";
function PersonPage()
{
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
            <Person></Person>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default PersonPage;