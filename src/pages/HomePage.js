import Header from "~/components/header/Header";
import SliderPage from "~/components/slider/slider";
import Order from "~/components/order/Order";
import SlideList from "~/components/slider-list/SlideLists";
import Promotion from "~/components/promotion/Promotion";
import Member from "~/components/member/Member";
import Entertaiment from "~/components/entertaiment/Entertaiment";
import FooterCP from "~/components/footer/FooterCP";
import './style/homepage.css';
import '../components/utility/utility.css';
function HomePage()
{
    return (
        <div className="homepage ">
            <Header></Header>
            <div className=" background-color">
            <div className="container">
            
            <SliderPage></SliderPage>
            <Order></Order>
            <SlideList nameTitle="PHIM ĐANG CHẾU"/>
            <SlideList nameTitle="PHIM SẮP CHIẾU"/>
            <Promotion></Promotion>
            <Member></Member>
            <Entertaiment></Entertaiment>
            </div>
            </div>
          
            
            <FooterCP></FooterCP>
        </div>
    );
}
export default HomePage;