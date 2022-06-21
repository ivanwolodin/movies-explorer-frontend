
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import aboutMe from "../AboutMe/AboutMe";
import AboutMe from "../AboutMe/AboutMe";

function Main() {
    return (
        <div className="main">
            <div className="page">
                <Header/>
                <Promo/>
                <AboutProject/>
                <Techs/>
                <AboutMe/>
            </div>
        </div>
    );
}

export default Main;
