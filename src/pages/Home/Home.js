import './Home.css'
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"


export default function Home() {

    const [iseHovered1, setiseHovered1] = useState(false)
    const [iseHovered2, setiseHovered2] = useState(false)

    const AnimateY = {
        transform: 'translateY(-4.5em)',
    }

    const BlurredCard = {
        opacity: '0.3'
    }

    const AnimateNav = {
        height: '12vh',
        borderBottom: '0.5px solid rgba(0, 0, 0, 0.158)',
    }

    const ScrolledButton = {
        border: 'none',
        color: 'white',
        backgroundColor: '#027fd8'
    }

    const [scroll, setScroll] = useState(false);
    const [scrollBig, setScrollBig] = useState(false);
    useEffect(() => {
    window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 70);
        setScrollBig(window.scrollY > 380);
    });

    }, []);

    
    return (
        <div className='HomePageContainer'>
            <div style={scroll?AnimateNav:{}} className='HomeNav'>
                <div className="HomeLogo">
                    Timely
                </div>
                <div className="HomeButton" style={scrollBig?ScrolledButton:{}}>
                    Request Early Access
                </div>
            </div>
            <div className="HomeHero">
                <div className="HeroLHS">
                    <div className="HomeHeader">
                        Pay bills on your own terms,
                        get paid out immediately
                    </div>
                    <div className="HomeSubHeader">
                    	Simplify your business payments and take charge of your working capital with our immediate payments solutions.
                    </div>
                    <div className="LearnMoreSection">
                        <input type="email" className='LearnMoreField' placeholder='Enter your email' />
                        <div className="LearnMoreButton">Request Early Access</div>
                    </div>
                </div>
                <div className="HeroRHS">
                    <img src="\undraw_Agreement_re_d4dv.svg" alt="" />
                </div>
            </div>

            
            <div className="TeaserSection">
                <div className="TeaserContainer">
                    <img className='TeaserImage' src="https://i.imgur.com/KoZ18EV.png" alt="" />
                    <video className='TeaserVideo' loop muted autoPlay src="\Timely - Google Chrome 2021-05-16 00-28-38.mp4"></video>
                </div>
            </div>
            <div className="LogosSection">
                <img className='TeaserLogo' src="\Visa_Inc._logo.svg" alt="" />
                <img className='TeaserLogoSmall' src="\americanexpress.svg" alt="" />
                <img className='TeaserLogoMedium' src="\MasterCard_Logo.svg" alt="" />
                <img className='TeaserLogo' src="\DiscoverCard.svg" alt="" />
                <img className='TeaserLogo' src="\quickbooks-logo.png" alt="" />

            </div>

            <div className="HowItWorks">
                <div className="HowItWorksHeader">
                    What You Get With Timely
                </div>
                <div className="HowItWorksSubHeader">
                    One network to manage your payables, receivables, and working capital
                </div>
                <div className="HowItWorksView">
                    <div className="HowItWorksCard">
                        <div className="HowItWorksImgContainer">
                            <img src="\undraw_Add_files_re_v09g.svg" alt="" />
                        </div>
                        <div className="HowItWorksCardHeader">
                            Invoice Management 
                        </div>
                        <div className="HowItWorksParagraph">
                        	Create (or upload) invoices with customized branding and all the key terms. Buyers can access bills by email, or on our portal. 
                        </div>
                    </div>
                    
                    <div className="HowItWorksCard">
                        <div className="HowItWorksImgContainer">
                            <img src="\undraw_Mobile_pay_re_sjb8.svg" alt="" />  
                        </div>
                        <div className="HowItWorksCardHeader">
                            Payments Processing
                        </div>
                        <div className="HowItWorksParagraph">
                        	Choose how you’d like to be paid. Buyers schedule payments with a bank transfer or card, and we’ll take care of any reconciliations.
                        </div>
                    </div>
                    
                    <div className="HowItWorksCard">
                        <div className="HowItWorksImgContainer">
                            <img src="\undraw_wallet_aym5.svg" alt="" />
                        </div>
                        <div className="HowItWorksCardHeader">
                            Immediate Payments
                        </div>
                        <div className="HowItWorksParagraph">
                        	Get paid immediately on outstanding invoices through our personalized payout solutions. Buyers can also choose to pay in custom installments.

                        </div>
                    </div>
                </div>
            </div>

            <div className="OurImmediatePaymentsSection">
                <div className="OurImmediatePaymentsHeader">
                    Our Immediate Payments Solutions
                </div>
                <div className="OurImmediatePaymentsSubheader">
                    Custom tools to help you manage your working capital
                </div>
                <div className="OurImmediatePaymentsView">
                    <div className="OurImmediatePaymentsCard">
                        <div className="ImmediateCardTopHalf">
                            <img className='ImmediateCardImg' src="\undraw_revenue_3osh.svg" alt="" />
                            <div className="ImmediateCardHeader">
                                Timely Payouts
                            </div>
                            <div className="ImmediateCardSubHeader">
                                Turn unpaid invoices into working capital
                            </div>
                        </div>
                        <div className="ImmediateCardBottomHalf">
                            <div className="ImmediateCardParagraph">
                                Timely pays you up front for outstanding invoices so you can focus on growing your business. No hidden fees or terms, just choose the offer that works best for you. 
                            </div>
                            <div className="ImmediateCardButton">
                                Coming Soon
                            </div>
                        </div>      
                    </div>

                    <div className="OurImmediatePaymentsCard">
                        <div className="ImmediateCardTopHalf">
                            <img className='ImmediateCardImg' src="\undraw_financial_data_es63.svg" alt="" />
                            <div className="ImmediateCardHeader">
                                Timely Installments 
                            </div>
                            <div className="ImmediateCardSubHeader">
                                Pay off invoices on your own schedule
                            </div>
                        </div>
                        <div className="ImmediateCardBottomHalf">
                            <div className="ImmediateCardParagraph">
                            	With Timely, you no longer have to make the tradeoff between burning through your working capital or paying vendors late. You get a transparent payment schedule, and your vendor gets fully paid up front. 
                            </div>  
                            <div className="ImmediateCardButton">
                                Coming Soon
                            </div>
                        </div>      
                    </div>

                </div>
            </div>
            <div className="WhoAreWeHeader">
                Who We Are
            </div>
            <div className="WhoAreWeSection">
                <div className="WhoAreWeCard"  onMouseEnter={()=>setiseHovered1(true)} onMouseLeave={()=>setiseHovered1(false)}>
                    <div style={iseHovered1?BlurredCard:{}} className="WhoAreWeImage">
                        <img src="\Omar.png" alt="" />
                    </div>
                    <div style={iseHovered1?BlurredCard:{}} className="WhoAreWeName">
                        Omar Mohamed
                    </div>
                    <div style={iseHovered1?BlurredCard:{}} className="WhoAreWeTitle">
                        Co-Founder & Chief-Product Officer
                    </div>
                    <div className="WhoAreWeDescription" style={iseHovered1?AnimateY:{}}>
                    	Prior to founding Timely, Omar worked at Bridgewater Associates, where he advised institutional investors on their portfolio construction and provided them with analytical tools to work through their deepest challenges. Omar holds a B.A. in Political Economy from UC Berkeley.
                    </div>   
                </div>

                <div className="WhoAreWeCard"  onMouseEnter={()=>setiseHovered2(true)} onMouseLeave={()=>setiseHovered2(false)}>
                    <div style={iseHovered2?BlurredCard:{}} className="WhoAreWeImage">
                        <img src="\Nick.png" alt="" />
                    </div>
                    <div style={iseHovered2?BlurredCard:{}} className="WhoAreWeName">
                        Nick Fornier
                    </div>
                    <div style={iseHovered2?BlurredCard:{}} className="WhoAreWeTitle">
                        Co-Founder & Chief-Technology Officer
                    </div>
                    <div className="WhoAreWeDescription" style={iseHovered2?AnimateY:{}}>
                    	Nick is a transportation engineering and urban planning post-doctoral scholar at UC Berkeley. His expertise is in network modeling and price optimization, but also human factors and safety. He understands complex human systems and is applying his skills for making safe and efficient transportation systems towards business finance.

                    </div>   
                </div>
            </div>

            <div className="LearnMore2">
                <div className="GetEarlyAccessHeader">
                    Join Mailing List
                </div>
                <div className="LearnMoreSection">
                    <input type="email" className='LearnMoreField' placeholder='Enter your email' />
                    <div className="LearnMoreButton">Join</div>
                </div>
            </div>
            <div className="LandingFooter">
                <div className="LandingFooterLHS">

                </div>
                <div className="LandingFooterMiddle">
                    <div className="LandingFotterMiddleLeft">
                        TIMELY
                    </div>
                    <div className="LandingFotterMiddleMiddle">
                        Coming Soon
                    </div>


                    <div className="LandingFooterMiddleRightPart">
                        <div className="LandingFooterRHSHeader">
                            Follow Us
                        </div>

                        <div className="LandingFooterLogosContainer">
                            <div className="LandingFooterRHSLogo">
                                <FontAwesomeIcon icon ={faFacebook } />
                            </div>
                            <div className="LandingFooterRHSLogo">
                                <FontAwesomeIcon icon ={faInstagram} />
                            </div>
                            <div className="LandingFooterRHSLogo">
                                <FontAwesomeIcon icon ={faLinkedin} />
                            </div>
                        </div>
                        
                    </div>
                </div>

                    
                <div className="LandingFooterRHS">
                    
                </div>
            </div>

        </div>
    )
}
