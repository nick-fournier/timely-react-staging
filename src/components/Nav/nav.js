import {useState, useRef, useEffect} from 'react'
import './nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {useHistory} from 'react-router-dom'

export default function Nav({setitemList, CurrentItem, setCurrentItem, loadPayables, loadReceivables, setcurrentNavItem, currentNavItem, ShowNewInvoice, setShowNewInvoice, setShowNewBusiness, isActive, setisActive, setisMobile, ShowNewPayment, setShowNewPayment, setShowSchedulePayment, ShowPaymentSettings, setShowPaymentSettings, setSettingsOrInvoices, SettingsOrInvoices, HideAddInvoiceBackButton, setHideAddInvoiceBackButton, HideAddPaymentBackButton, setHideAddPaymentBackButton, setShowSendRemind}) {
    const [showNav, setshowNav] = useState(false)
    const [showNavSettings, setshowNavSettings] = useState(false)

    const History = useHistory()
    const [showMobileNavList1, setshowMobileNavList1] = useState(false)
    const [showMobileNavList2, setshowMobileNavList2] = useState(false)

    const RefListLeft = useRef(null);
    const RefListRight = useRef(null);

    const handleClickOutsideLeft = (event) => {
        if (RefListLeft.current && !RefListLeft.current.contains(event.target)) {
            setshowMobileNavList1(false)
        }
    }

    const handleClickOutsideRight = (event) => {
        if (RefListRight.current && !RefListRight.current.contains(event.target)) {
            setshowMobileNavList2(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideLeft, true)
        document.addEventListener('click', handleClickOutsideRight, true)
        return () => {
            document.removeEventListener('click', handleClickOutsideLeft, true)
            document.removeEventListener('click', handleClickOutsideRight, true)
        }
    })

    const black = {
        color: 'rgb(180, 180, 180)',
        fontWeight: 'bold'
    }
    const showNav1 = {
        transform: 'translate(0%,51%)'
    }
    const showNav2 = {
        transform: 'translate(147.5%,51%)'
    }



    return (
        <div className='NavContainer'>
            <ul className="navbar">
                <li className="navLogo">
                    {/* <span className="icon ">
                        <FontAwesomeIcon icon={faStopwatch} />
                    </span> */}
                    <img className='PendulumLogo' src="white_logo_transparent_background.png" alt="" />
                    {/* <img className='PendulumIcon' src="https://uploads-ssl.webflow.com/61294d9880807a7d67ee9e19/61294d9880807a5eacee9e2a_dark_logo_transparent_background%202-1.png" alt="" /> */}
                    {/* <span className="text">
                        Pendulum
                    </span> */}
                </li>
                <li className={currentNavItem === 1?'ActiveNavItem':"nav-item"} onClick={()=>{
                    setshowNav(!showNav)
                    setshowNavSettings(false)
                    if (!showNav){
                        setcurrentNavItem(1)
                        setisActive(false)
                    }
                    else{
                        return
                    }}}>
                    <span className="icon">
                        <FontAwesomeIcon icon ={faPlus} />
                    </span>
                    <span className="text">
                        New
                    </span>
                </li>
                <li style={isActive? black : {}} className={showNav?'ShowNav':'SubNavItem'} onClick ={()=>{
                    setShowNewBusiness(false)
                    setShowNewPayment(false)
                    setShowNewInvoice(!ShowNewInvoice)
                    setShowSchedulePayment(false)
                    setShowSendRemind(false)
                    {isActive?setisActive(false):setisActive(true)
                    }
                    setHideAddPaymentBackButton(true)
                    HideAddInvoiceBackButton?setHideAddInvoiceBackButton(false):setHideAddInvoiceBackButton(true)

                }}>
                    <span className="icon">
                        <FontAwesomeIcon icon ={faPlus} />
                    </span>
                    <span className="text">
                        Invoice To Send
                    </span>
                </li>
                <li className={showNav?'ShowNav':'SubNavItem'} onClick ={()=>{
                    setShowNewBusiness(false)
                    setShowNewInvoice(false)
                    setShowNewPayment(!ShowNewPayment)
                    setShowSchedulePayment(false)
                    setShowSendRemind(false)
                    setisActive(false)
                    setHideAddInvoiceBackButton(true)
                    HideAddPaymentBackButton?setHideAddPaymentBackButton(false):setHideAddPaymentBackButton(true)

                }}>
                    <span className="icon">
                        <FontAwesomeIcon icon ={faPlus} />
                    </span>
                    <span className="text">
                        Bill To Pay
                    </span>
                </li>
                <li className={currentNavItem === 2? 'ActiveReceivables':'nav-item'} onClick={()=>{
                    setSettingsOrInvoices(false)
                    History.push('/invoices')
                    loadReceivables()
                    setshowNav(false)
                    setshowNavSettings(false)

                    setShowNewInvoice(false)
                    setShowNewPayment(false)
                    setShowSendRemind(false)

                    setisActive(false)
                    setisMobile(false)

                    setHideAddPaymentBackButton(true)
                    setHideAddInvoiceBackButton(true)

                    setCurrentItem({})
                    setitemList([])

                }}>
                    <span className="icon IconRed">
                        <FontAwesomeIcon icon={faMoneyCheckAlt} />
                    </span>
                    <span className="text">
                        Receivables
                    </span>
                </li>
                <li className={currentNavItem === 3?'ActivePayables':"nav-item"}onClick={()=>{
                    setSettingsOrInvoices(false)
                    History.push('/invoices')
                    loadPayables()
                    setshowNav(false)
                    setshowNavSettings(false)
                    setShowNewInvoice(false)
                    setShowNewPayment(false)
                    setisActive(false)
                    setisMobile(false)
                    
                    setHideAddPaymentBackButton(true)
                    setHideAddInvoiceBackButton(true)
                    setCurrentItem({})
                    setitemList([])
                    

                }}>
                    <span className="icon IconGreen">
                        <FontAwesomeIcon icon={faMoneyCheckAlt} />
                    </span>
                    <span className="text">
                        Payables
                    </span>
                </li>

                <li className={currentNavItem === 4?'ActiveNavItem':"nav-item"} onClick={()=>{
                    setSettingsOrInvoices(true)
                    History.push('/settings')
                    // setshowNavSettings(!showNavSettings)
                    setShowNewInvoice(false)
                    setShowNewPayment(false)
                    setShowNewBusiness(false)
                    setShowNewPayment(false)
                    setShowSendRemind(false)
                    setshowNav(false)
                    setcurrentNavItem(4)

                    setHideAddPaymentBackButton(true)
                    setHideAddInvoiceBackButton(true)
                    setCurrentItem({})
                    setitemList([])

                }}>
                    <span className="icon">
                        <FontAwesomeIcon icon ={faCog} />
                    </span>
                    <span className="text">
                        Settings
                    </span>
                </li>
                <li className={showNavSettings?'ShowNav':'SubNavItem'} onClick ={()=>{
                    setShowNewBusiness(false)
                    setShowNewPayment(false)
                    setShowPaymentSettings(!ShowPaymentSettings)
                    setShowSchedulePayment(false)
                    {isActive?setisActive(false):setisActive(true)}
                }}>
                    <span className="icon">
                        <FontAwesomeIcon icon ={faCog} />
                    </span>
                    <span className="text">
                        Payment Settings
                    </span>
                </li>
                <li className="nav-item">
                    <span className="icon">
                        <FontAwesomeIcon icon ={faQuestionCircle} />
                    </span>
                    <span className="text">
                        Support
                    </span>
                </li>
                <li className="nav-item">
                    <span className="icon">
                        <FontAwesomeIcon icon ={faSignOutAlt} />
                    </span>
                    <span onClick={()=>{
                        setisActive(false)
                        localStorage.setItem('token', '')
                        History.push('/login')
                    }} className="text">
                        Log out
                    </span>
                </li>

            </ul>

            <div className="MobileNavContainer">
                <div className="MobileNavFirstRow">
                    <span onClick={()=>{
                        setshowMobileNavList1(!showMobileNavList1)
                        setshowMobileNavList2(false)
                    }} className="icon">
                        <FontAwesomeIcon icon ={faPlus} />
                    </span>
                    <div className="MobileNavLogo">
                        <span className="icon ">
                            <FontAwesomeIcon icon={faStopwatch} />
                        </span>
                        <span className="text">
                            Pendulum
                        </span>
                    </div>
                    <div className="MobileNavSettings">
                        <span onClick={()=>{
                            setshowMobileNavList2(!showMobileNavList2)
                            setshowMobileNavList1(false)
                            }} className="icon iconCog" >
                            <FontAwesomeIcon icon ={faCog} />
                        </span>
                    </div>
                </div>
                <div className="MobileNavSecondRow">
                    <div className={currentNavItem === 2? 'ActiveNavItem1':'nav-item'} onClick={()=>{
                        loadReceivables()
                        setshowNav(false)
                        setShowNewInvoice(false)
                        setisActive(false)
                        setisMobile(false)
                    }}>
                        <span className="icon">
                            <FontAwesomeIcon icon={faMoneyCheckAlt} />
                        </span>
                        <span className="text">
                            Receivables
                        </span>
                    </div>
                    <div className={currentNavItem === 3?'ActiveNavItem2':"nav-item2"} onClick={()=>{
                        loadPayables()
                        setshowNav(false)
                        setShowNewInvoice(false)
                        setisActive(false)
                        setisMobile(false)
                    }}>
                        <span className="icon">
                            <FontAwesomeIcon icon={faMoneyCheckAlt} />
                        </span>
                        <span className="text">
                            Payables
                        </span>
                    </div>
                </div>

                <div ref={RefListLeft} style={showMobileNavList1?showNav1:{}} className='MobileNavListLeft'>
                    <div className="navItemMobile" onClick ={()=>{
                        setShowNewBusiness(false)
                        setShowNewInvoice(!ShowNewInvoice)
                        {isActive?setisActive(false):setisActive(true)
                        ShowNewInvoice?setshowMobileNavList1(true):setshowMobileNavList1(false)
                        setHideAddPaymentBackButton(true)
                        HideAddInvoiceBackButton?setHideAddInvoiceBackButton(false):setHideAddInvoiceBackButton(true)
                    }}}>
                        <span className="icon">
                            <FontAwesomeIcon icon ={faPlus} />
                        </span>
                        <span className="text">
                            New Invoice
                        </span>
                    </div>
                    <div className="navItemMobile" onClick ={()=>{
                        setShowNewBusiness(false)
                        setShowNewInvoice(false)
                        setShowNewPayment(!ShowNewPayment)
                        ShowNewInvoice?setshowMobileNavList1(true):setshowMobileNavList1(false)
                        setHideAddInvoiceBackButton(true)
                        HideAddPaymentBackButton?setHideAddPaymentBackButton(false):setHideAddPaymentBackButton(true)
                        
                    }}>
                        <span className="icon">
                            <FontAwesomeIcon icon ={faPlus} />
                        </span>
                        <span className="text">
                            New Payment
                        </span>
                    </div>
                </div>

                <div ref={RefListRight} style={showMobileNavList2?showNav2:{}} className='MobileNavListRight'>
                    <div className="navItemMobile2">
                        <span className="icon">
                            <FontAwesomeIcon icon ={faQuestionCircle} />
                        </span>
                        <span className="text">
                            Support
                        </span>
                    </div>
                    <div className="navItemMobile2">
                        <span className="icon">
                            <FontAwesomeIcon icon ={faSignOutAlt} />
                        </span>
                        <span onClick={()=>{
                            setisActive(false)
                            localStorage.setItem('token', '')
                            History.push('/login')
                        }} className="text">
                            Log out
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
