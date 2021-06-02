import './Home.css'
import {useEffect, useState, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import {useForm} from 'react-hook-form'
import {TimelineLite, Power3, gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'


export default function Home() {




    const LearnMore = useRef();
    const EmailInputField1 = useRef();
    const EmailInputField2 = useRef();

    function scrollToComponent() {
        if (window.location.hash === '#LearnMore') {
            LearnMore.current.scrollIntoView();
            LearnMore.current.focus();
        }
    }




    const AnimateY = {
        transform: 'translateY(-4.5em)',
    }

    const BlurredCard = {
        opacity: '0.1'
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
    const [ScrollForButton, setScrollForButton] = useState(false);
    const [scrollHide, setScrollHide] = useState(false);

    const [iseHovered1, setiseHovered1] = useState(false)
    const [iseHovered2, setiseHovered2] = useState(false)
    const [UserEmail1, setUserEmail1] = useState('')
    const [UserEmail2, setUserEmail2] = useState('')
    const [successfulEntry, setsuccessfulEntry] = useState(true)
    const [emptyEntry, setemptyEntry] = useState(true)
    const [existingEntry, setexistingEntry] = useState(false)

    const t1 = new TimelineLite({delay: 0.3})

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        window.addEventListener("scroll", () => {
            setScroll(window.pageYOffset > 70);
            setScrollForButton(window.pageYOffset > 380);
            setScrollForButton((window.pageYOffset > 3480)?false:(window.pageYOffset > 380)?true:false);
            //scrollToComponent()
            // setScrollHide(window.pageYOffset > 3600);
        });

        t1.from('.HeroRHS', {x:100, duration: 1, opacity: 0, ease: Power3.easeOut, delay: 1.2}, 'Start')
        t1.from('.HeroLHSTYPEGsap', {x:-100, duration: 1, stagger:0.4, opacity: 0, ease: Power3.easeOut, delay: 0.1}, 'Start')
        gsap.from('.TeaserLogoGSAP',{
            y:'-100',
            duration: 1,
            stagger: 0.25,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.TeaserSection',
                start: 'bottom 90%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.HowItWorksCard',{
            x:'-300',
            duration: 1,
            stagger: 0.5,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.HowItWorksView',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.TeaserContainer',{
            y:200,
            duration: 1,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.TeaserSection',
                start: 'top 50%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.HowItWorksTypeGSAP',{
            y:200,
            duration: 1,
            stagger: 0.25,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.HowItWorksView',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.ImmediateSolutionsTypeGSAP',{
            y:200,
            duration: 1,
            stagger: 0.25,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.OurImmediatePaymentsSection',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.ImmediateCardGSAPLeft',{
            x:-200,
            duration: 1,
            stagger: 0.25,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.OurImmediatePaymentsSection',
                start: 'top 20%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.ImmediateCardGSAPRight',{
            x:200,
            duration: 1,
            stagger: 0.25,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.OurImmediatePaymentsSection',
                start: 'top 10%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.WhoAreWeHeader',{
            y:200,
            duration: 1,
            stagger: 0.25,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.WhoAreWeSection',
                start: 'top 100%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.WhoAreWeCardGSAPLeft',{
            y:150,
            duration: 1,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.WhoAreWeSection',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.WhoAreWeCardGSAPRight',{
            y:150,
            duration: 1,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.WhoAreWeSection',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        })
        gsap.from('.EarlyAccessGSAP',{
            y:150,
            duration: 1,
            stagger:0.5,
            opacity:0,
            ease: "ease-out",
            scrollTrigger: {
                trigger: '.LearnMore2',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        })

        // t1.from('.TeaserLogoGSAP', {y:100, duration: 1, stagger:{each:0.5, from:'start'}, opacity: 0, ease: Power3.easeOut, delay: 0.1}, 'Start')
        // t1.from('.HowItWorksCard', {x:-300, duration: 1, stagger:0.5, opacity: 0, ease: Power3.easeOut, delay: 0.1}, 'Start')
    }, []);

    const AnimateSubmitMessage = () => {
        gsap.to('.EarlyAccessSubmitMessage', {
            x:150,
            duration: 1,
            opacity:1,
            ease: "ease-out",
            delay: 0.5,
         });
         gsap.to('.EarlyAccessSubmitMessage', {
            x:400,
            duration: 1,
            opacity:0,
            ease: "ease-out",
            delay: 3.5,
         });
         gsap.to('.EarlyAccessSubmitMessage', {
            x:0,
            duration: 0.001,
            opacity:0,
            ease: "ease-out",
            delay: 0,
         });
    }


    const { handleSubmit } = useForm();

    async function onSubmit(data){
        const special_key = 'p!OOR&E[WnxP(o6?p~m$AOi1d]Gc_`'
        const NewsLetterData = new FormData()
        NewsLetterData.append('email', UserEmail1?UserEmail1:UserEmail2)
        NewsLetterData.append('special_key', special_key)

        const httpResponse = await fetch('http://localhost:8000/api/newsletter/',{
            method: 'POST',
            body: NewsLetterData,
            headers: new Headers({
                'Authorization': `token ${localStorage.token}`
            }),
        })

        const JsonResponse = await httpResponse.json()
        console.log(JsonResponse)
        
        if (JsonResponse.first_name === null){
            setemptyEntry(false)
            setsuccessfulEntry(true)
            AnimateSubmitMessage()

        }

        else if (JsonResponse.email =='This field may not be blank.'){
            setemptyEntry(true)
            setexistingEntry(false)
            setsuccessfulEntry(false)
            AnimateSubmitMessage()
        }   
        else if (JsonResponse.email =='newsletter with this email already exists.'){
            setemptyEntry(false)
            setexistingEntry(true)
            setsuccessfulEntry(false)
            AnimateSubmitMessage()
        }   
        else {
            setexistingEntry(false)
            setemptyEntry(false)
            setsuccessfulEntry(false)
            AnimateSubmitMessage()

        }

        setUserEmail1('')
        setUserEmail2('')
        EmailInputField1.current.value=''
        EmailInputField2.current.value=''

    }

    // const handleFormChange = (e) =>{
    //     const CurrentValue = e.target.value
    //     console.log(CurrentValue)
    //     setUserEmail(e.target.value)
    // }
    
    return (
        <div className='HomePageContainer'>
            <div className={scrollHide?'HomeNavHide':'HomeNav'} style={scroll?AnimateNav:{}}>
                <div className="HomeLogo">
                    Timely
                </div>
                <div onClick={()=>{
                    LearnMore.current.scrollIntoView()
                }} className="HomeButton" style={ScrollForButton?ScrolledButton:{}}>
                    Request Early Access
                </div>
            </div>
            <div className="HomeHero">
                <div className="HeroLHS">
                    <div className="HomeHeader HeroLHSTYPEGsap">
                        Pay bills on your own terms,
                        get paid out immediately
                    </div>
                    <div className="HomeSubHeader HeroLHSTYPEGsap">
                    	Simplify your business payments and take charge of your working capital with our immediate payments solutions.
                    </div>
                    <form action="" method='post' onSubmit={handleSubmit(onSubmit)}>
                        <div className="LearnMoreSection HeroLHSTYPEGsap">
                            <input onClick={()=>{
                                setUserEmail2('')
                                EmailInputField2.current.value=''
                            }} ref={EmailInputField1} onChange={(e)=>{
                                setUserEmail1(e.target.value)
                                setUserEmail2('')
                                EmailInputField2.current.value=''
                                }} type="email" className='LearnMoreField'  placeholder='Enter your email' />
                            <button type='submit' className="LearnMoreButton">Request Early Access</button>
                        </div>
                    </form>
                    <div className="EarlyAccessSubmitMessage">
                        {successfulEntry?
                        <div className="EarlyAccessSuccessMessage">
                            Thank you, we’ll get back to you soon!
                        </div>
                        :
                        <div className="EarlyAccessFailureMessage">
                            {emptyEntry?
                            <span>Please enter your email before submitting.</span>
                            :existingEntry?
                            <span>You're already on our list!</span>
                            :
                            <span>Please enter a valid Email Address.</span>
                            }
                        </div>
                        }
                    </div>
                </div>
                <div className="HeroRHS">
                    <img src="\undraw_Agreement_re_d4dv.svg" alt="" />
                </div>
            </div>

            
            <div className="TeaserSection">
                <div className="TeaserContainer">
                    <img className='TeaserImage' src="\portrait_black_edited.png" alt="" />
                    <video className='TeaserVideo' loop muted autoPlay src="\Timely - Google Chrome 2021-05-16 00-28-38.mp4"></video>
                </div>
            </div>
            <div className="LogosSection">
                <img className='TeaserLogo TeaserLogoGSAP' src="\Visa_Inc._logo.svg" alt="" />
                <img className='TeaserLogoSmall TeaserLogoGSAP' src="\americanexpress.svg" alt="" />
                <img className='TeaserLogoMedium TeaserLogoGSAP' src="\MasterCard_Logo.svg" alt="" />
                <img className='TeaserLogo TeaserLogoGSAP' src="\DiscoverCard.svg" alt="" />
                <img className='TeaserLogo TeaserLogoGSAP' src="\quickbooks-logo.png" alt="" />

            </div>

            <div className="HowItWorks">
                <div className="HowItWorksHeader HowItWorksTypeGSAP">
                    What You Get With Timely
                </div>
                <div className="HowItWorksSubHeader HowItWorksTypeGSAP">
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
                <div className="OurImmediatePaymentsHeader ImmediateSolutionsTypeGSAP">
                    Our Immediate Payments Solutions
                </div>
                <div className="OurImmediatePaymentsSubheader ImmediateSolutionsTypeGSAP">
                    Custom tools to help you manage your working capital
                </div>
                <div className="OurImmediatePaymentsView">
                    <div className="OurImmediatePaymentsCard ImmediateCardGSAPLeft">
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

                    <div className="OurImmediatePaymentsCard ImmediateCardGSAPRight">
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
                <div className="WhoAreWeCard WhoAreWeCardGSAPLeft" onMouseEnter={()=>setiseHovered1(true)} onMouseLeave={()=>setiseHovered1(false)}>
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

                <div className="WhoAreWeCard WhoAreWeCardGSAPRight"  onMouseEnter={()=>setiseHovered2(true)} onMouseLeave={()=>setiseHovered2(false)}>
                    <div style={iseHovered2?BlurredCard:{}} className="WhoAreWeImage">
                        <img src="\Nick.png" alt="" />
                    </div>
                    <div style={iseHovered2?BlurredCard:{}} className="WhoAreWeName">
                        Nick Fournier
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
                <div className="GetEarlyAccessHeader EarlyAccessGSAP">
                	Join Timely
                </div>
                <div className="GetEarlyAccessSubHeader EarlyAccessGSAP">
                	Focus on what matters most for your business
                </div>
                <form action="" method='post' onSubmit={handleSubmit(onSubmit)}>
                    <div className="LearnMoreSection2 EarlyAccessGSAP">
                        <input onClick={()=>{
                            setUserEmail1('')
                            EmailInputField1.current.value=''
                        }} ref={EmailInputField2} onChange={(e)=>{
                            setUserEmail2(e.target.value)
                            setUserEmail1('')
                            EmailInputField1.current.value=''
                            }} type="email" className='LearnMoreField2' placeholder='Enter your email' />
                        <button ref={LearnMore} id='LearnMore' type='submit' className="LearnMoreButton2">Request Early Access</button>
                    </div>
                    <div className="EarlyAccessSubmitMessage">
                        {successfulEntry?
                        <div className="EarlyAccessSuccessMessage">
                            Thank you, we’ll get back to you soon!
                        </div>
                        :
                        <div className="EarlyAccessFailureMessage">
                            {emptyEntry?
                            <span>Please enter your email before submitting.</span>
                            :existingEntry?
                            <span>You're already on our list!</span>
                            :
                            <span>Please enter a valid Email Address.</span>
                            }
                        </div>
                        }
                    </div>
                </form>
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
