import SlideList from "~/components/slider-list/SlideLists";
import Header from "~/components/header/Header";
import FooterCP from "~/components/footer/FooterCP";
import '../components/utility/utility.css';
import Auth from "~/components/auth/Auth";
function LoginPage()
{
    return (
        <div>
        <Header></Header>
        <div className="background-color mt-1348">
            <div className="container">
                <Auth></Auth>
            </div>

        </div>
       
       <FooterCP></FooterCP>
        </div>
    );
}
export default LoginPage;