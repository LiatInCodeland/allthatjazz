import Logo from "./logo";
import ProfilePic from "./profilePic";
import Menu from "./menu";
// import Menu from "./menu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header(props) {
    // console.log("mql media: ", mql.media);
    // console.log("mql matches: ", mql.matches);
    const [mQuery, setMQuery] = useState();
    const [screenSize, setScreenSize] = useState();

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        setScreenSize(window.innerWidth);
    });

    const updateSize = () => {
        // console.log("size updated");
        let mql = window.matchMedia("(max-width: 1074px)");
        setMQuery(mql.matches);
        // console.log(mql.matches); // true or false
    };

    const [burgerOpen, setBurgerOpen] = useState(false);

    const toggleBurgerMenu = () => {
        // console.log("toggle open");
        setBurgerOpen(!burgerOpen);
    };

    let src;
    burgerOpen ? (src = "/images/close-w.svg") : (src = "/images/burger.svg");

    return (
        <>
            <header>
                <Link className="logo-link" to="/">
                    <Logo onClick={toggleBurgerMenu} className="logo" />
                </Link>
                <div className="menu-box">
                    {screenSize < 900 || mQuery ? (
                        <img
                            onClick={toggleBurgerMenu}
                            className="icon burger"
                            src={src}
                        />
                    ) : (
                        <p className="menu" onClick={toggleBurgerMenu}>
                            MENU
                        </p>
                    )}
                    <ProfilePic {...props} />
                </div>
            </header>

            {burgerOpen ? (
                <Menu className="" toggleBurgerMenu={toggleBurgerMenu} />
            ) : null}
        </>
    );
}
