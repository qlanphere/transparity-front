import React from 'react'
import './index.css'

const About = () => {

    const colors = ["https://www.clawson.co.uk/wp-content/uploads/2016/03/Charity.jpg", "https://www.ledgerinsights.com/wp-content/uploads/2019/09/charity-810x476.jpg", "https://www.socialtables.com/wp-content/uploads/2016/10/iStock-540095978.jpg"];
    const delay = 2500;
        const [index, setIndex] = React.useState(0);
        const timeoutRef = React.useRef(null);

        function resetTimeout() {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }

        React.useEffect(() => {
            resetTimeout();
            timeoutRef.current = setTimeout(
                () =>
                    setIndex((prevIndex) =>
                        prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                    ),
                delay
            );

            return () => {
                resetTimeout();
            };
        }, [index]);

        return (
            <>
                <h1>What is Transparity?</h1>
                <p>Transparity is a hub that connects charitable organisations with potential donors with an emphasis on transparency. Many potential donors are hesitant to donate when they don't know where their money is going or hoq much of it is actually going to the cause.
                    By creating a hub where charities can interact with donors and provide feedback, donors will have a more transparent experience which will encourage donations as well as help smaller charities gain traction.
                </p>
                <div
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
                </div>
            </>
        )
    }
export default About
