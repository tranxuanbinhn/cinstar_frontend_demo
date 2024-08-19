import SlideList from "~/components/slider-list/SlideLists";
import Header from "~/components/header/Header";
import FooterCP from "~/components/footer/FooterCP";
import '../components/utility/utility.css';

import { Checkout } from "~/components/checkout/Checkout";
function CheckOutPage()
{
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
                <Checkout></Checkout>
            </div>

        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default CheckOutPage;