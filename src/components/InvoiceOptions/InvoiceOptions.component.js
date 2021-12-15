import './InvoiceOptions.component.css'
import {useState, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons'


export default function InvoiceOptions({setCurrentItem, CurrentItem, setsearchField, setSearchMethod, DataSwitch, isMobile, setisMobile, ShowSchedulePayment, setShowSchedulePayment, PopupMessage, setPopupMessage, showPopup,setshowPopup, ShowSendRemind, setShowSendRemind, ActionType, setActionType, setshowPopUpButton, Proceed, setProceed, setloading, SearchedData, ShowImmediateSolutions, setShowImmediateSolutions}) {

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

    const DeleteInvoice = () => {
        setActionType('DeleteInvoice')
        setPopupMessage('Are you sure you want to delete this invoice?')
        setshowPopUpButton(true)
        setshowPopup(true)
    }


    useEffect( async () => {

        if (!Proceed) {
            return
        }

        else if (ActionType === 'DeleteInvoice'){

            setPopupMessage('Deleting Invoice...')
            setshowPopUpButton(false)
            let DeletedInvoice = CurrentItem
            DeletedInvoice.is_deleted = true
            const DeleteInvoiceRequest = await fetch(`https://api.pendulumapp.com/api/${DataSwitch === 1?'receivables':'payables'}/${DeletedInvoice.invoice_id}/`, {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `token ${localStorage.token}`,
                "content-type":"application/json",

            }),
            body: JSON.stringify(DeletedInvoice)
            })
            SearchedData = []
            setloading(true)
            const resp = await DeleteInvoiceRequest.json()
            console.log(resp)
            setPopupMessage(`Invoice was deleted successfully!`)
            setCurrentItem({})
            setloading(false)
            


        }
        setProceed(false)

    }, [Proceed])

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
                        <button disabled={CurrentItem.invoice_id?false:true} style={buttonStyles} onClick ={DeleteInvoice} className={CurrentItem.invoice_id?'DeleteInvoicButton':'Disabled'}>Delete</button>  
                    </div>
                       
                    {DataSwitch === 1?
                    <div>
                        <button onClick={()=>{
                            setShowImmediateSolutions(true)
                        }} disabled={CurrentItem.invoice_id?false:true} className={CurrentItem.invoice_id?"Button":'Disabled'}> 
                            Get Paid Out
                        </button>
                        <button disabled={CurrentItem.invoice_id?false:true} onClick={() => {
                            setShowSendRemind(true)
                        }} className={CurrentItem.invoice_id?"Button":'Disabled'}>Send Reminder</button>
                        
                    </div>
                    :
                    <div>
                        <button onClick={()=>{
                            setShowImmediateSolutions(true)
                        }} disabled={CurrentItem.invoice_id?false:true} className={CurrentItem.invoice_id?"Button":'Disabled'}>
                            Pay In Installments
                        </button>
                        <button disabled={CurrentItem.invoice_id?false:true} onClick={()=>{
                            setShowSchedulePayment(true)
                            // scheduleInvoice()
                        }} className={CurrentItem.invoice_id?"Button":'Disabled'}>Pay Now</button>
                    </div>
                }  
                </div>
            </div>
        </div>
    )
}
