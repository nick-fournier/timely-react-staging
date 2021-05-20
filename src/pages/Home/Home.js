import './Home.css'
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

export default function Home() {

    const [iseHovered1, setiseHovered1] = useState(false)
    const [iseHovered2, setiseHovered2] = useState(false)

    const AnimateY = {
        transform: 'translateY(8.5em)',
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
        setScrollBig(window.scrollY > 400);
    });

    }, []);

    
    return (
        <div className='HomePageContainer'>
            <div style={scroll?AnimateNav:{}} className='HomeNav'>
                <div className="HomeLogo">
                    Timely
                </div>
                <div className="HomeButton" style={scrollBig?ScrolledButton:{}}>
                    Learn More
                </div>
            </div>
            <div className="HomeHero">
                <div className="HeroLHS">
                    <div className="HomeHeader">
                        Pay bills on your own terms,
                        get paid out immediately
                    </div>
                    <div className="HomeSubHeader">
                        Simplify your entire payments process and take charge of your working capital with our immediate payments solutions.
                    </div>
                    <div className="LearnMoreSection">
                        <input type="email" className='LearnMoreField' placeholder='Enter your email' />
                        <div className="LearnMoreButton">Learn More</div>
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
                    How It Works
                </div>
                <div className="HowItWorksView">
                    <div className="HowItWorksCard">
                        <div className="HowItWorksImgContainer">
                            <img src="\undraw_Add_files_re_v09g.svg" alt="" />
                        </div>
                        <div className="HowItWorksCardHeader">
                            Invoice/Bill Management 
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
                        	Specify how you’d like to be paid. Buyers schedule payments with a bank transfer or card, and we’ll take care of any reconciliations.
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
                            	Timely pays you up front for outstanding invoices so you can focus on growing your business. We’ll advance you ~90% of the invoice value within 24hrs and transfer the balance once the invoice is paid. We also offer full default protection and customer-friendly collections. 
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
                            	With Timely, you no longer have to make the tradeoff between burning through your working capital or paying vendors late. In addition to supporting credit cards, we also offer buy now pay later - so you can pay your bills in installments, improving your cash flow, while your vendor gets paid upfront. 
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
                <div className="WhoAreWeCard" onMouseEnter={()=>setiseHovered1(true)} onMouseLeave={()=>setiseHovered1(false)}>
                    <div className="WhoAreWeImage">
                        <img src="https://vistapointe.net/images/andy-samberg-2.jpg" alt="" />
                    </div>
                    <div className="WhoAreWeName">
                        Omar Mohamed
                    </div>
                    <div className="WhoAreWeTitle">
                        Co-Founder & Chief-Product Officer
                    </div>
                    <div className="WhoAreWeDescription" style={iseHovered1?AnimateY:{}}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum autem voluptatibus laboriosam libero. At exercitationem perferendis mollitia ea eveniet. Enim!
                    </div>   
                </div>

                <div className="WhoAreWeCard" onMouseEnter={()=>setiseHovered2(true)} onMouseLeave={()=>setiseHovered2(false)}>
                    <div className="WhoAreWeImage">
                        <img src="https://i.pinimg.com/originals/18/1d/6c/181d6c936ff2311d7ade14ca4a6622f6.jpg" alt="" />
                    </div>
                    <div className="WhoAreWeName">
                        Nick Fornier
                    </div>
                    <div className="WhoAreWeTitle">
                        Co-Founder & Chief-Technology Officer
                    </div>
                    <div className="WhoAreWeDescription" style={iseHovered2?AnimateY:{}}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam porro quo cumque eveniet corrupti eos repellat quasi, sit voluptates quam.
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

        </div>
    )
}
