
import './SchedulePayment.css'
import {useForm} from 'react-hook-form'
import { useState, useEffect, useRef } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PaymentMethodCard from '../PaymentMethodCard/PaymentMethodCard.component'


export default function SchedulePayment({ShowSchedulePayment, setShowNewInvoice, setShowSchedulePayment, CurrentItem, setreFetchPM, reFetchPM, PayInvoiceImmediately, setPayInvoiceImmediately, ImmediatePayableID, setImmediatePayableID}) {
    
    // const [paymentMethodID, setpaymentMethodID] = useState('')

    const [PaymentMethodsList, setPaymentMethodsList] = useState([])
    const [ReloadList, setReloadList] = useState(false)
    const [SelectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    
    const [CardOrACH, setCardOrACH] = useState(true)
    

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
            const response = await fetch('https://api.pendulumapp.com/api/stripe/payinvoice',{
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

    }, [reFetchPM])

    async function handleSubmit(e){
        e.preventDefault()
        setProcessingPayment(true)
        const PaymentResponse = await fetch('https://api.pendulumapp.com/api/stripe/payinvoice',{
                method: "POST",
                headers: new Headers({
                  'Authorization': `token ${localStorage.token}`,
                  'Content-Type': 'application/json'
              }),
              body: JSON.stringify({
                  "id":SelectedPaymentMethod,
                  "invoice_id":PayInvoiceImmediately?ImmediatePayableID.invoice_id:CurrentItem.invoice_id
              })
              })
            const PaymentJson = await PaymentResponse.json()
            console.log(PaymentJson)
            if (PaymentJson.status==='succeeded'){
                setProcessingPayment(false)
                setMessageReveal(true)
                setPaymentSuccessOrFail(true)
                setTimeout(() => {
                    setMessageReveal(false)
                    setShowSchedulePayment(false)
                }, 2000);
            }
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
        transform: 'translateX(100%)'
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
                                    setCardOrACH(true)
                                }
                                else if (e.target.value === 'ACH'){
                                    console.log('ACH')
                                    setCardOrACH(false)
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


                {CardOrACH && <label className=''>Choose A Card: </label>}
                {PaymentMethodsList?
                CardOrACH?
                <div className="PaymentMethodCardList">
                    {PaymentMethodsList.map((item, index) =>
                    <PaymentMethodCard  key={index} item={item} SelectedPaymentMethod={SelectedPaymentMethod} ReloadList={ReloadList} PaymentMethodsList={PaymentMethodsList} setSelectedPaymentMethod={setSelectedPaymentMethod} setReloadList={setReloadList}/>
                    )}
                </div>
                :<>
                Coming Soon
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
                                setShowSchedulePayment(false)
                                setShowNewInvoice(false)
                                e.preventDefault()
                                setSelectedPaymentMethod(null)
                            }}> Discard</button>
                </div>
                </form>
            </div>
    )
}
