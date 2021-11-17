import React from 'react'
import './index.css'
import Slider from "react-slick";
import { HiCubeTransparent } from "react-icons/hi";
import Footer from '../../components/Footer';
import { useAuthContext } from '../../contexts/auth';
import { useHistory } from 'react-router-dom';
import { RiArrowRightSLine } from "react-icons/ri";

//import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

const About = () => {

    const { currentUser } = useAuthContext()
    const history = useHistory();

    const handleClick = () => {
        history.push(`/login`)
    }

    const handleRegister = () => {
        history.push(`/register`)
    }

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    // const colors = ["https://www.clawson.co.uk/wp-content/uploads/2016/03/Charity.jpg", "https://www.ledgerinsights.com/wp-content/uploads/2019/09/charity-810x476.jpg", "https://www.socialtables.com/wp-content/uploads/2016/10/iStock-540095978.jpg"];
    // const delay = 2500;
    //     const [index, setIndex] = React.useState(0);
    //     const timeoutRef = React.useRef(null);

    //     function resetTimeout() {
    //         if (timeoutRef.current) {
    //             clearTimeout(timeoutRef.current);
    //         }
    //     }

    //     React.useEffect(() => {
    //         resetTimeout();
    //         timeoutRef.current = setTimeout(
    //             () =>
    //                 setIndex((prevIndex) =>
    //                     prevIndex === colors.length - 1 ? 0 : prevIndex + 1
    //                 ),
    //             delay
    //         );

    //         return () => {
    //             resetTimeout();
    //         };
    //     }, [index]);

    return (
        <div className="about-page">
            <h1 className="about-title">What is <span className="green">Transparity?</span></h1>
            <p className="about-intro">Transparity is a hub that connects charitable organisations with potential donors with an emphasis on transparency. Many potential donors are hesitant to donate when they don't know where their money is going or hoq much of it is actually going to the cause.
                By creating a hub where charities can interact with donors and provide feedback, donors will have a more transparent experience which will encourage donations as well as help smaller charities gain traction.
            </p>
            <div>
                <Slider {...settings}>
                    <div>
                        <img className="size" src="https://www.clawson.co.uk/wp-content/uploads/2016/03/Charity.jpg" />
                    </div>
                    <div>
                        <img className="size" src="https://www.ledgerinsights.com/wp-content/uploads/2019/09/charity-810x476.jpg" />
                    </div>
                    <div>
                        <img className="size" src="https://www.socialtables.com/wp-content/uploads/2016/10/iStock-540095978.jpg" />
                    </div>
                    <div>
                        <img className="size" src="https://images.justgiving.com/image/c3124105-9abd-44fc-a6d2-843930699f9c.jpg?template=size563x300" />
                    </div>
                    <div>
                        <img className="size" src="https://www.ifrc.org/sites/default/files/styles/article_press_release_featured_image/public/Mongolia.jpg?itok=Rv8krSKK" />
                    </div>
                    <div>
                        <img className="size" src="https://supportkings.org.uk/sites/default/files/styles/homepage_banner/public/Kanayo-website-banner-3_0.jpg?itok=R8Cf0KzQ" />
                    </div>
                </Slider>
            </div>
            <div className="slide">
                <h1 className="slide-title">Creating Change <HiCubeTransparent /></h1>
                <div className="rounded-card">
                    {!currentUser ? <div className="rounded-description">You can join the <span className="green">Transparity</span> community today by signing up as a <span className="bold">donator</span> or a <span className="bold">charity</span>.
                        If you would like to sign up as a donator then click on the register button below, and in the registration form select the user option, otherwise
                        if you would like to sign up as a charity please select the charity option.
                        <div className="button-container">
                            <button onClick={handleRegister}>Register</button>
                            <button onClick={handleClick}>Login</button>
                        </div>
                    </div> : currentUser.sub.user == 'user' ?
                        <div className="user-functionality">
                            <p className="func-title">You have joined the <span className="green">Transparity</span> community as a <span className="bold">User.</span></p>
                            <p>With this account you have access to the following features:</p>
                            <ul>
                                <li><RiArrowRightSLine /><span>A timeline of charity campaigns</span></li>
                                <li><RiArrowRightSLine /><span>Make donations to charities through PayPal</span></li>
                                <li><RiArrowRightSLine /><span>Give campaign specific reviews to charities</span></li>
                                <li><RiArrowRightSLine /><span>Speak to Charities by opening a ticket</span></li>
                            </ul>
                        </div> :
                        <div>
                            <div className="user-functionality">
                                <p className="func-title">You have joined the <span className="green">Transparity</span> community as a <span className="bold">Charity.</span></p>
                                <p>With this account you have access to the following features:</p>
                                <ul>
                                    <li><RiArrowRightSLine /><span>Create campaign posts to increase awareness</span></li>
                                    <li><RiArrowRightSLine /><span>Receive donations from registered users through PayPal</span></li>
                                    <li><RiArrowRightSLine /><span>Profile page containing a bio and all of your campaigns</span></li>
                                    <li><RiArrowRightSLine /><span>A timeline of charity campaigns</span></li>
                                    <li><RiArrowRightSLine /><span>Respond to user tickets</span></li>
                                </ul>
                            </div>

                        </div>}


                </div>
                {/* <div className="lorem-container">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div> */}
            </div>
            <Footer />
            {/* <div
                    className="slideshowSlider"
                    style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
                >
                    {colors.map((src, index) => (
                        <img
                            className="slide"
                            key={index}
                            src={src}
                        ></img>
                    ))}
                </div>

                <div className="slideshowDots">
                    {colors.map((_, idx) => (
                        <div
                            key={idx}
                            className={`slideshowDot${index === idx ? " active" : ""}`}
                            onClick={() => {
                                setIndex(idx);
                            }}
                        ></div>
                    ))}
                </div> */}
        </div>
    )
}
export default About
