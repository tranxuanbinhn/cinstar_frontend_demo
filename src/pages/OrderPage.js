import Header from "~/components/header/Header";

import Order from "~/components/order/Order";
import SlideList from "~/components/slider-list/SlideLists";

import FooterCP from "~/components/footer/FooterCP";
import './style/homepage.css';
import '../components/utility/utility.css';
function HomePage()
{
    return (
        <div className="homepage ">
            <Header></Header>
            <div className=" background-color">
            <div className="container ">
            
      
            <Order></Order>
            <SlideList nameTitle="PHIM ĐANG CHẾU"/>
            <SlideList nameTitle="PHIM SẮP CHIẾU"/>
            
            </div>
            </div>
          
            
            <FooterCP></FooterCP>
        </div>
    );
}
export default HomePage;