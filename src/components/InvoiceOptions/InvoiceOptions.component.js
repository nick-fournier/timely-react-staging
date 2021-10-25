import './InvoiceOptions.component.css'
import {useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons'


export default function InvoiceOptions({CurrentItem, setsearchField, setSearchMethod, DataSwitch, isMobile, setisMobile, ShowSchedulePayment, setShowSchedulePayment, PopupMessage, setPopupMessage, showPopup,setshowPopup, ShowSendRemind, setShowSendRemind}) {

    const [markDisabled, setmarkDisabled] = useState(CurrentItem.is_paid?true:false)
    const [currentTab, setcurrentTab] = useState(1)
    const [Hidden, setHidden] = useState(true)

    const handleChange = (e) => {
        setsearchField(e.target.value);
    }

    const handleClickInbox = () =>{
        setSearchMethod(1)
        setcurrentTab(1)
    }

    const handleClickScheduled = () =>{
        setSearchMethod(2)
        setcurrentTab(2)
    }
    const handleClickFlagged = () =>{
        setSearchMethod(3)
        setcurrentTab(3)
    }
    const handleClickPaid = () =>{
        setSearchMethod(4)
        setcurrentTab(4)
    }

    const showButtons = () => {
        setHidden(!Hidden)
    }

    const marginButtons = {
        marginRight: Hidden?'0':'0.5em'
    }

    const buttonStyles = {
        display: Hidden? 'none':'block',
    }


    const scheduleInvoice = async () =>{
        let ScheduledInvoice = CurrentItem
        ScheduledInvoice.is_scheduled = !ScheduledInvoice.is_scheduled
        const ScheduleURL = `https://api.pendulumapp.com/api/${(DataSwitch === 1 ? 'receivables': 'payables')}/${ScheduledInvoice.invoice_id}/`
        const ScheduleResponse = await fetch(ScheduleURL, {
           method: 'PUT',
           headers: new Headers({
            'Authorization': `token ${localStorage.token}`,
            "content-type":"application/json"
        }),
           body: JSON.stringify(ScheduledInvoice)
       })

       const resp = await ScheduleResponse.json()
       console.log(resp)
       if (resp.invoice_id === CurrentItem.invoice_id){
        alert(resp.is_scheduled ? `Invoice number ${CurrentItem.invoice_id} has been scheduled successfully!` : `Invoice number ${CurrentItem.invoice_id} has been Unscheduled successfully!`)
    }
    else{
        alert('Error while Scheduling invoice')
    }
    }

    const sendReminder= async () =>{
        // setshowPopup(true)
        // setPopupMessage('Sending reminder...')
        // setTimeout(() => {
        //     setPopupMessage('Reminder sent successfully!')
        // }, 3000);
        // let RemindBody = {
        //     invoice_id: CurrentItem.invoice_id,
        //     cc: 
        // }
        // const httpResponse = await fetch('https://api.pendulumapp.com/api/notifications/',{
        //     method: 'POST',
        //     headers: new Headers({
        //         'Authorization': `token ${localStorage.token}`,
        //         'Content-Type': 'application/json'
        //     }),
        //     body: JSON.stringify(RemindBody)
        // })

        // const JsonResponse = await httpResponse.json()
        // console.log(JsonResponse)
    }

    const flagInvoice = async () =>{
        let FlaggedInvoice = CurrentItem
        const FlagURL = `https://api.pendulumapp.com/api/${(DataSwitch === 1 ? 'receivables': 'payables')}/${FlaggedInvoice.invoice_id}/`
        FlaggedInvoice.is_flagged = !FlaggedInvoice.is_flagged
       const FlagResponse = await fetch(FlagURL, {
           method: 'PUT',
           headers: new Headers({
            'Authorization': `token ${localStorage.token}`,
            "content-type":"application/json"
        }),
           body: JSON.stringify(FlaggedInvoice)
       })

       const resp = await FlagResponse.json()
       console.log(resp)
       if (resp.invoice_id === CurrentItem.invoice_id){
           alert(resp.is_flagged ? `Invoice number ${CurrentItem.invoice_id} has been flagged successfully!` : `Invoice number ${CurrentItem.invoice_id} has been Unflagged successfully!`)
       }
       else{
           alert('Error while flagging invoice')
       }
    }

    const markInvoice = async () =>{ 
        let MarkedInvoice = CurrentItem
        const MarkURL = `https://api.pendulumapp.com/api/${(DataSwitch === 1 ? 'receivables': 'payables')}/${MarkedInvoice.invoice_id}/`
        MarkedInvoice.is_paid = true
        //console.log(MarkURL)
       const MarkResponse = await fetch(MarkURL, {
           method: 'PUT',
           headers: new Headers({
            'Authorization': `token ${localStorage.token}`,
            "content-type":"application/json"
        }),
           body: JSON.stringify(MarkedInvoice)
       })

       const resp = await MarkResponse.json()
       console.log(resp)
       if (resp.invoice_id === CurrentItem.invoice_id){
            setmarkDisabled(true)
           alert(`Invoice number ${CurrentItem.invoice_id} has been Marked successfully!`)
       }
       else{
           alert('Error while Marking invoice')
       }
    }


    return (

        <div className='InvoiceOptionsContainer'>
            <div className={`${isMobile?'HideOptions':'ShowOptions'} SearchAndTabsContainer`}>
                <div className="SearchAndTabs">
                    <div className="InvoicesTitleContainer">
                        {DataSwitch === 1?
                            <div className='ReceviableTitle'>Receivables</div>:
                            <div className='PayableTitle'>Payables</div>
                        }
                    </div>
                    <div className="InvoiceSearchAndTabsContainer">
                        <div className="InvoiceSearchContainer">
                                <input onChange={handleChange} className='SearchInput' type="search" placeholder='Search for an invoice'/>
                        </div>
                        <div className="InvoiceTabs">
                                <div onClick={handleClickInbox} className={currentTab===1?'CurrentTabItemClicked':"InvoiceTabItem"}>Inbox</div>
                                <div onClick={handleClickScheduled} className={currentTab===2?'CurrentTabItemClicked':"InvoiceTabItem"}>Scheduled</div>
                                <div onClick={handleClickFlagged} className={currentTab===3?'CurrentTabItemClicked':"InvoiceTabItem"}>Flagged</div>
                                <div onClick={handleClickPaid} className={currentTab===4?'CurrentTabItemClicked':"InvoiceTabItem"}>Paid</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={`${isMobile?'ShowButtons':'HideButtons'} ButtonContainer`}>
                
                <div  className="SecondaryButtonContainer">
                    <button onClick={()=> setisMobile(false)} className="BackToInvoiceList">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className="HamburgerButtonsContainer">
                        <button onClick={showButtons} className='BurgerButton' >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <button disabled={CurrentItem.invoice_id?false:true} style={buttonStyles} onClick ={flagInvoice} className={CurrentItem.invoice_id?'SecondaryInvoiceButton':'Disabled'}>Flag</button>  
                        <button style={buttonStyles} disabled={CurrentItem.is_paid?true:false} onClick={markInvoice} className={CurrentItem.is_paid?'Disabled':'SecondaryInvoiceButton'}>Mark as Paid</button>
                    </div>
                       
                    {DataSwitch === 1?
                    <button disabled={CurrentItem.invoice_id?false:true} onClick={() => {
                        setShowSendRemind(true)
                    }} className={CurrentItem.invoice_id?"Button":'Disabled'}>Remind</button>
                    :
                    <button disabled={CurrentItem.invoice_id?false:true} onClick={()=>{
                        setShowSchedulePayment(true)
                        // scheduleInvoice()
                    }} className={CurrentItem.invoice_id?"Button":'Disabled'}>Pay</button>
                }  
                </div>
            </div>
        </div>
    )
}
