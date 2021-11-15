import React from 'react'
import './index.css'
import Slider from "react-slick";
//import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

const About = () => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
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
        <>
            <h1>What is Transparity?</h1>
            <p>Transparity is a hub that connects charitable organisations with potential donors with an emphasis on transparency. Many potential donors are hesitant to donate when they don't know where their money is going or hoq much of it is actually going to the cause.
                By creating a hub where charities can interact with donors and provide feedback, donors will have a more transparent experience which will encourage donations as well as help smaller charities gain traction.
            </p>
            <div>
                <h2>Promoting Change!</h2>
                <Slider {...settings}>
                    <div>
                        <img className = "size" src = "https://www.clawson.co.uk/wp-content/uploads/2016/03/Charity.jpg"/>
                    </div>
                    <div>
                        <img className = "size" src = "https://www.ledgerinsights.com/wp-content/uploads/2019/09/charity-810x476.jpg"/>
                    </div>
                    <div>
                        <img className = "size" src = "https://www.socialtables.com/wp-content/uploads/2016/10/iStock-540095978.jpg"/>
                    </div>
                    <div>
                        <img className = "size" src = "https://images.justgiving.com/image/c3124105-9abd-44fc-a6d2-843930699f9c.jpg?template=size563x300"/>
                    </div>
                    <div>
                        <img className = "size" src = "https://www.ifrc.org/sites/default/files/styles/article_press_release_featured_image/public/Mongolia.jpg?itok=Rv8krSKK"/>
                    </div>
                    <div>
                        <img className = "size" src = "https://supportkings.org.uk/sites/default/files/styles/homepage_banner/public/Kanayo-website-banner-3_0.jpg?itok=R8Cf0KzQ"/>
                    </div>
                </Slider>
            </div>
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
        </>
    )
}
export default About
