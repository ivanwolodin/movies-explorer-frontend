
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";


function Main() {
    return (
        <div className="main">
            <div className="page">
                <Header/>
                <Promo/>
                <AboutProject/>
            </div>
        </div>
    );
}

export default Main;
