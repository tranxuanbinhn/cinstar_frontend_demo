import FooterCP from "~/components/footer/FooterCP";
import Header from "~/components/header/Header";
import PromtionComponent from "~/components/promotion/PromotionComponent";
import '../components/utility/utility.css';
function PromotionPage()
{
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
            <PromtionComponent></PromtionComponent>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default PromotionPage;