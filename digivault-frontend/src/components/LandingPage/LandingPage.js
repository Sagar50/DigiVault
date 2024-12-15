import React, {useEffect, useState} from 'react';
import './LandingPage.css';
import notif from '../../res/notif.svg';
import CoinGeckoWidget from "../Animated/CoinGeckoWidget";

export const LandingPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const questions = [
        {
            question: "What is cryptocurrency?",
            answer: "Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates independently of a central authority.",
        },
        {
            question: "How does blockchain technology work?",
            answer: "Blockchain is a decentralized ledger that records transactions across many computers. Each block is linked to the previous one, creating a chain.",
        },
        {
            question: "What is the difference between Bitcoin and Ethereum?",
            answer: "Bitcoin is primarily a digital currency, while Ethereum is a platform that allows developers to build decentralized applications using smart contracts.",
        },
        {
            question: "How do I keep my cryptocurrency secure?",
            answer: "Use hardware wallets, enable two-factor authentication, and avoid sharing your private keys or seed phrases with anyone.",
        },
    ];


    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <div><CoinGeckoWidget/></div>
            <div className="landing-page py-8 px-0.25 lg:px-20 xl:px-24 flex flex-col">
                <div className="div2 mx-auto">
                    <div className="div3">
                        <div className="heroContainer pt-20 px-6 pb-10 lg:px-12">
                            <div className="heroTextContainer">
                                <h1 className="text-3xl md:text-4xl lg:text-6xl">Stay informed, stay ahead</h1>
                                <h2 className="text-sm md:text-md lg:text-xl">Whether you're a trader, investor or just
                                    curious, we offer the tools to help you track your crypto holdings</h2>
                            </div>
                            <label>
                                <div className="getStartedContainer">
                                    <a className="getStartedHeroImage"
                                       href={localStorage.getItem('token') ? '/' : "/register"}>
                                        {localStorage.getItem('token') ? (
                                            <span className="text-center justify-center my-auto items-center "><img src={notif} alt="notification icon" className="inline my-auto" />Stay updated</span>) : (
                                            <span>Get started</span>)}
                                    </a>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="featureTitleCardContainer pt-10 pb-5 md:pb-10 md:pt-20 px-4">
                        <h1 className="text-center md:text-left text-lg md:text-2xl">Why manage your crypto with
                            DigiVault</h1>
                        <div className="featuresContainer min-[876px]:grid-cols-[repeat(auto-fit,_minmax(158px,_1fr))]">
                            <div className="featureCards" id="featureOne">
                                <div className="svgContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                         fill="currentColor"
                                         viewBox="0 0 256 256">
                                        <path
                                            d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="featureDescription">
                                    <h2 className="text-lg lg:text-xl pt-4 py-2">Track your portfolio performance</h2>
                                    <p className="text-md lg:text-l">Real-time balance tracking, historical performance,
                                        and
                                        more</p>
                                </div>
                            </div>
                            <div className="featureCards" id="featureTwo">
                                <div className="svgContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                         fill="currentColor"
                                         viewBox="0 0 256 256">
                                        <path
                                            d="M224,71.1a8,8,0,0,1-10.78-3.42,94.13,94.13,0,0,0-33.46-36.91,8,8,0,1,1,8.54-13.54,111.46,111.46,0,0,1,39.12,43.09A8,8,0,0,1,224,71.1ZM35.71,72a8,8,0,0,0,7.1-4.32A94.13,94.13,0,0,1,76.27,30.77a8,8,0,1,0-8.54-13.54A111.46,111.46,0,0,0,28.61,60.32,8,8,0,0,0,35.71,72Zm186.1,103.94A16,16,0,0,1,208,200H167.2a40,40,0,0,1-78.4,0H48a16,16,0,0,1-13.79-24.06C43.22,160.39,48,138.28,48,112a80,80,0,0,1,160,0C208,138.27,212.78,160.38,221.81,175.94ZM150.62,200H105.38a24,24,0,0,0,45.24,0ZM208,184c-10.64-18.27-16-42.49-16-72a64,64,0,0,0-128,0c0,29.52-5.38,53.74-16,72Z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="featureDescription">
                                    <h2 className="text-lg lg:text-xl pt-4 py-2">Stay informed with price alerts</h2>
                                    <p className="text-md lg:text-l">Set up price alerts for any asset and get notified
                                        when
                                        it hits your target</p>
                                </div>
                            </div>
                            <div className="featureCards" id="featureThree">
                                <div className="svgContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                         fill="currentColor"
                                         viewBox="0 0 256 256">
                                        <path
                                            d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="featureDescription">
                                    <h2 className="text-lg lg:text-xl pt-4 py-2">Easily export your data</h2>
                                    <p className="text-md lg:text-l">Download your portfolio data in seconds and use it
                                        however you like</p>
                                </div>
                            </div>
                            <div className="featureCards" id="featureFour">
                                <div className="svgContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                         fill="currentColor"
                                         viewBox="0 0 256 256">
                                        <path
                                            d="M144,157.68a68,68,0,1,0-71.9,0c-20.65,6.76-39.23,19.39-54.17,37.17a8,8,0,1,0,12.24,10.3C50.25,181.19,77.91,168,108,168s57.75,13.19,77.87,37.15a8,8,0,0,0,12.26-10.3C183.18,177.07,164.6,164.44,144,157.68ZM56,100a52,52,0,1,1,52,52A52.06,52.06,0,0,1,56,100Zm188.25,43.07-4.66-2.69a23.6,23.6,0,0,0,0-8.76l4.66-2.69a8,8,0,0,0-8-13.86l-4.67,2.7a23.92,23.92,0,0,0-7.58-4.39V108a8,8,0,0,0-16,0v5.38a23.92,23.92,0,0,0-7.58,4.39l-4.67-2.7a8,8,0,1,0-8,13.86l4.66,2.69a23.6,23.6,0,0,0,0,8.76l-4.66,2.69a8,8,0,0,0,8,13.86l4.67-2.7a23.92,23.92,0,0,0,7.58,4.39V164a8,8,0,0,0,16,0v-5.38a23.92,23.92,0,0,0,7.58-4.39l4.67,2.7a7.92,7.92,0,0,0,4,1.07,8,8,0,0,0,4-14.93ZM208,136a8,8,0,1,1,8,8A8,8,0,0,1,208,136Z"
                                        ></path>
                                    </svg>
                                </div>
                                <div className="featureDescription">
                                    <h2 className="text-lg lg:text-xl pt-4 py-2">Customize your watchlist</h2>
                                    <p className="text-md lg:text-l">Add and reorder assets in your watchlist and view
                                        in
                                        your preferred order</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq-container">
                        <h2 className="text-center md:text-left text-lg md:text-2xl pb-4">Frequently Asked Questions</h2>
                        {questions.map((item, index) => (
                            <div
                                key={index}
                                className="faq-item"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="faq-question"
                                >
                                    {item.question}
                                    <span>
                                  {activeIndex === index ? '-' : '+'}
                                </span>
                                </button>
                                {activeIndex === index && (
                                    <div className="faq-answer" onClick={() => toggleAccordion(index)}>
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
