
import './SchedulePayment.css'
import {useForm} from 'react-hook-form'
import { useState, useEffect, useRef } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PaymentMethodCard from '../PaymentMethodCard/PaymentMethodCard.component'
import { useHistory } from 'react-router';
//
export default function SchedulePayment({ShowSchedulePayment, setShowNewInvoice, setShowSchedulePayment, CurrentItem, setreFetchPM, reFetchPM, PayInvoiceImmediately, setPayInvoiceImmediately, ImmediatePayableID, setImmediatePayableID, showPopup, setshowPopup, PopupMessage, setPopupMessage, Proceed, setProceed, setshowPopUpButton, ActionType, setActionType, setSettingsOrInvoices, setPaymentLoaded, setPersonalLoaded, setBusinessLoaded, setProfileOrPayment, setCardOrACH, setPaymentOptionsOrPaymentMethods, currentNavItem, setcurrentNavItem, SelectedPaymentMethod, setSelectedPaymentMethod}) {
    
    // const [paymentMethodID, setpaymentMethodID] = useState('')
    const history = useHistory()

    const [PaymentMethodsList, setPaymentMethodsList] = useState([])
    const [ReloadList, setReloadList] = useState(false)
    
    const [CardOrACHForPayment, setCardOrACHForPayment] = useState(true)
    

    const Visible = {
        display: 'block'
    }

    const Hidden = {
        display: 'none'
    }

    // States for payment confirmation

    const [ProcessingPayment, setProcessingPayment] = useState(false)
    const [MessageReveal, setMessageReveal] = useState(false)
    const [PaymentSuccessOrFail, setPaymentSuccessOrFail] = useState(false)
    const ResMessage = useRef(null)


    useEffect(() => {
        
        const loadPMs = async () =>{
            const response = await fetch('https://api.pendulumapp.com/api/stripe/paymentmethods/',{
                method: "GET",
                headers: new Headers({
                  'Authorization': `token ${localStorage.token}`
              }),
              })
            const DataJson = await response.json()
            setPaymentMethodsList(DataJson)
            console.log(PaymentMethodsList)
            let NewArray = []
            PaymentMethodsList.forEach((item)=>{
                NewArray.push(item.last4)
            })
            console.log(NewArray)
            setreFetchPM(false)
        }
        loadPMs()
        console.log(PaymentMethodsList)

    }, [reFetchPM, currentNavItem])

    useEffect( async() => {
        if (!Proceed){
            return
        }

        if (ActionType === 'SendPayment') {
            let PaymentBody = {
                "payment_method":SelectedPaymentMethod,
                "invoice_id":PayInvoiceImmediately?ImmediatePayableID.invoice_id:CurrentItem.invoice_id,
                'type':CardOrACHForPayment?'card':'ach'
            }
            console.log(PaymentBody)
            setshowPopUpButton(false)
            setPopupMessage('Processing your payment...')
            const PaymentResponse = await fetch('https://api.pendulumapp.com/api/stripe/payinvoice/',{
                method: "POST",
                headers: new Headers({
                  'Authorization': `token ${localStorage.token}`,
                  'Content-Type': 'application/json'
              }),
              body: JSON.stringify(PaymentBody)
              })
            const PaymentJson = await PaymentResponse.json()
            console.log(PaymentJson)
            if (PaymentJson.status==='succeeded'){
                setPopupMessage(`Payment of $${CurrentItem.invoice_total_price} for Invoice: ${CurrentItem.invoice_name} to ${CurrentItem.from_business_name}  was successful!`)
                setShowSchedulePayment(false)
                setProceed(false)

                
                // setProcessingPayment(false)
                // setMessageReveal(true)
                // setPaymentSuccessOrFail(true)
                // setTimeout(() => {
                    // setMessageReveal(false)
                // }, 2000);
            }

            else {
                // setProcessingPayment(false)
                setPopupMessage(`${PaymentJson[Object.keys(PaymentJson)[0]]} !`)
                setProceed(false)

                // setPaymentSuccessOrFail(false)
                // setMessageReveal(true)
                // setTimeout(() => {
                    // setMessageReveal(false)
                // }, 2000);
            }

        }

    }, [Proceed])

    async function handleSubmit(e){
        e.preventDefault()
        setshowPopup(true)
        // setProcessingPayment(true)
        setshowPopUpButton(true)
        setPopupMessage(`Are you sure you want to pay $${CurrentItem.invoice_total_price}? to ${CurrentItem.from_business_name}`)
        setActionType('SendPayment')

    }


    const HandlePMKey = (e) => {
        const CurrentValue = e.target.value
        console.log(CurrentValue)
        const filteredPM = PaymentMethodsList.find(paymentMethod => paymentMethod.last4 === CurrentValue)
       }



    const ShowSchedulePaymentTab = {
        transform: 'translateX(0%)'
    }
    const HideSchedulePayment = {
        transform: 'translateX(100%)',
        boxShadow: 'none'
    }

    const Selected = {
        backgroundColor: 'black'
    }

    return (
            <div style={ShowSchedulePayment? ShowSchedulePaymentTab: HideSchedulePayment} className='SchedulePaymentContainer'>
                <form className='SchedulePaymentForm' action="" method="post" >
                <div className="NewPaymentHeader">Review Payment</div>
                <div className="PaymentTotalLabel">Total:</div>
                <div className="PaymentTotal">
                    {PayInvoiceImmediately && ImmediatePayableID?`$${ImmediatePayableID?ImmediatePayableID.invoice_total_price:'loading...'}`:`$${CurrentItem.invoice_total_price}`}
                </div>

                <div className="PaymentTotalLabel">Pay to:</div>
                <div className="PaymentInvoiceDetails">
                    <div className="PaymentInvoiceBusinessDetails">
                        <div className="PaymentInvoiceBusinesslabel"> Business Name</div>
                        <div className="PaymentInvoiceBusinessname"> {PayInvoiceImmediately && ImmediatePayableID?`${ImmediatePayableID?ImmediatePayableID.bill_from_name:'loading...'}`:`${CurrentItem.to_business_name}`}</div>
                    </div>
                    <div className="PaymentInvoiceBusinessDetails">
                        <div className="PaymentInvoiceBusinesslabel"> Invoice Name</div>
                        <div className="PaymentInvoiceBusinessname"> {PayInvoiceImmediately && ImmediatePayableID?`${ImmediatePayableID?ImmediatePayableID.invoice_name:'loading...'}`:`${CurrentItem.invoice_name}`}</div>
                    </div>
                </div>

                <div className="SchedulePaymentInputContainer">
                            <label className=''>Payment Method: </label>
                            <select defaultValue='Card Payments' onChange={(e)=>{
                                if (e.target.value === 'Card Payments'){
                                    console.log('card')
                                    setCardOrACHForPayment(true)
                                }
                                else if (e.target.value === 'ACH'){
                                    console.log('ACH')
                                    setCardOrACHForPayment(false)
                                }
                            }} className='SelectPaymentMethod'>
                                <option value="Card Payments" >Card</option>
                                <option value="ACH" >ACH</option>
                            </select>
                </div>
                {<>
                    
                {/*                     
                    <label className='CardDetailsLabel'>Schedule Date: </label> 
                <div className="SchedulePaymentDateContainer">
                    <input className="SchedulePaymentDateInput" type="date" />
                </div> */}


                { <label className=''>{CardOrACHForPayment?'Choose A Card:':'Choose a Bank Account'} </label>}
                {PaymentMethodsList?
                CardOrACHForPayment?
                <div className="PaymentMethodCardList">
                    {PaymentMethodsList.filter(item => item.type === 'card').length >= 1?
                     PaymentMethodsList.filter(item => item.type === 'card').map((item, index) =>
                     // , , , , , 
                    <PaymentMethodCard type='card' setProceed={setProceed} setshowPopUpButton={setshowPopUpButton} ActionType={ActionType} setActionType={setActionType} Proceed={Proceed} setPopupMessage={setPopupMessage} setshowPopup={setshowPopup} reFetchPM={reFetchPM} setreFetchPM={setreFetchPM} CardOrACHForPayment={CardOrACHForPayment} key={index} item={item} SelectedPaymentMethod={SelectedPaymentMethod} ReloadList={ReloadList} PaymentMethodsList={PaymentMethodsList} setSelectedPaymentMethod={setSelectedPaymentMethod} setReloadList={setReloadList}/>
                    ):
                    <>
                    <div className="PaymentTotalLabel">
                        Looks like you don't have any cards saved yet.
                    </div>
                    <div onClick={()=>{
                        setProfileOrPayment(false)
                        setBusinessLoaded(false)
                        setPersonalLoaded(false)
                        setPaymentLoaded(true)
                        setPaymentOptionsOrPaymentMethods(false)
                        setcurrentNavItem(4)
                        setCardOrACH(false)
                        history.push('/settings')
                        setSettingsOrInvoices(true)
                        setSelectedPaymentMethod(null)
                        setShowSchedulePayment(false)
                    }} className="RedirectToSettingsLink">
                        Click here to add a new card.
                    </div>
                    </>
                    }
                </div>
                :<>
                <div className="PaymentMethodCardList">
                    {PaymentMethodsList.filter(item => item.type === 'ach').length >= 1?
                    PaymentMethodsList.filter(item => item.type === 'ach').map((item, index) =>
                    <PaymentMethodCard type='ach' setProceed={setProceed} setshowPopUpButton={setshowPopUpButton} ActionType={ActionType} setActionType={setActionType} Proceed={Proceed} setPopupMessage={setPopupMessage} setshowPopup={setshowPopup} reFetchPM={reFetchPM} setreFetchPM={setreFetchPM} CardOrACHForPayment={CardOrACHForPayment}  key={index} item={item} SelectedPaymentMethod={SelectedPaymentMethod} ReloadList={ReloadList} PaymentMethodsList={PaymentMethodsList} setSelectedPaymentMethod={setSelectedPaymentMethod} setReloadList={setReloadList}/>
                    )
                    :
                    <>
                    <div className="PaymentTotalLabel">
                        Looks like you don't have any bank accounts saved yet.
                    </div>
                    <div onClick={()=>{
                        setProfileOrPayment(false)
                        setBusinessLoaded(false)
                        setPersonalLoaded(false)
                        setPaymentLoaded(true)
                        setPaymentOptionsOrPaymentMethods(false)
                        setCardOrACH(true)
                        setcurrentNavItem(4)
                        history.push('/settings')
                        setSettingsOrInvoices(true)
                        setSelectedPaymentMethod(null)
                        setShowSchedulePayment(false)
                        setPaymentLoaded(true)
                    }} className="RedirectToSettingsLink">
                        Click here to add a new bank account.
                    </div>
                    </>
                }
                </div>
                </>
                    :
                <>Loading...</>
                
                    }
                        {/* <input className='FirstRowInputField'  type="text" list="nums" placeholder='Last 4 Digits' onChange={(e) => {HandlePMKey(e)}} />
                            {PaymentMethodsList?
                                <datalist id="nums">
                                {PaymentMethodsList.map((item, index) =>
                                    <option key={index} value={item.last4} />
                                    )}
                            </datalist>:
                            <>Loading...</>
                            } */}
                </>}
                
                <div className="PaymentMessageContainer">
                                {ProcessingPayment?
                                <div className="PaymentMethodMessageSuccess">Processing Payment...</div>
                                :
                                <div style={MessageReveal?Visible:Hidden} ref={ResMessage} className="PaymentMethodResponseMessage">
                                    {PaymentSuccessOrFail?
                                        <div className="PaymentMethodMessageSuccess">Payment Successful!</div>
                                        :
                                        <div className="PaymentMethodMessageError">Something went wrong.</div>
                                    }
                                </div>
                                }
                </div>

                <div className="SubmitAndDiscardContainer">
                    <button className="SubmitPaymentButton" onClick={handleSubmit}> {`Pay $${PayInvoiceImmediately && ImmediatePayableID?ImmediatePayableID?ImmediatePayableID.invoice_total_price:'loading...':CurrentItem.invoice_total_price}`} </button>
                    <button className="DiscardInvoiceButton" onClick={(e)=>{
                        setShowNewInvoice(false)
                        e.preventDefault()
                        setSelectedPaymentMethod(null)
                        setShowSchedulePayment(false)
                            }}> Discard</button>
                </div>
                </form>
            </div>
    )
}
