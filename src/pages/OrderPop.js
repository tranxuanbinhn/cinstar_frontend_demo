import Orderpopcorn from "~/components/orderpopcorn/Orderpopcorn";
import Header from "~/components/header/Header";
import FooterCP from "~/components/footer/FooterCP";
import '../components/utility/utility.css';
function OrderPop()
{
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
            <Orderpopcorn></Orderpopcorn>
            </div>
       
        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default OrderPop;