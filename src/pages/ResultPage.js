import FooterCP from "~/components/footer/FooterCP";
import Header from "~/components/header/Header";
import PromtionComponent from "~/components/promotion/PromotionComponent";

import '../components/utility/utility.css';
import Result from "~/components/resultppayment/Result";
function ResultPage()
{
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
            <Result></Result>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default ResultPage;