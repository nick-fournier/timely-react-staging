
import './SchedulePayment.css'
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';


export default function SchedulePayment({ShowSchedulePayment, setShowNewInvoice, setShowSchedulePayment, CurrentItem, setreFetchPM, reFetchPM}) {
    
    // const [paymentMethodID, setpaymentMethodID] = useState('')
    const [PaymentMethodsList, setPaymentMethodsList] = useState([])
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

    }, [reFetchPM])

    async function handleSubmit(e){
        e.preventDefault()
        const PaymentResponse = await fetch('https://api.pendulumapp.com/api/stripe/payinvoice',{
                method: "POST",
                headers: new Headers({
                  'Authorization': `token ${localStorage.token}`,
                  'Content-Type': 'application/json'
              }),
              body: JSON.stringify({
                  "id":PaymentMethodsList[1],
                  "invoice_id":CurrentItem.invoice_id
              })
              })
            const PaymentJson = await PaymentResponse.json()
            console.log(PaymentJson)
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

    return (
            <div style={ShowSchedulePayment? ShowSchedulePaymentTab: HideSchedulePayment} className='SchedulePaymentContainer'>
                <form className='SchedulePaymentForm' action="" method="post" >
                <div className="NewPaymentHeader">Payment Details</div>


                <div className="SchedulePaymentInputContainer">
                            <select className='SelectInput'>
                            <label className=''>Payment Method: </label>
                                <option value="Card Payments" >Card</option>
                                <option value="ACH" >ACH</option>
                                <option value="Paper Check" >Paper Check</option>
                            </select>
                </div>

                <label className='CardDetailsLabel'>Schedule Date: </label> 
                <div className="SchedulePaymentDateContainer">
                    <input className="SchedulePaymentDateInput" type="date" />
                </div>


                <label className=''>Choose A Card: </label>
                        <input className='FirstRowInputField'  type="text" list="nums" placeholder='Last 4 Digits' onChange={(e) => {HandlePMKey(e)}} />
                            {PaymentMethodsList?
                            <datalist id="nums">
                                {PaymentMethodsList.map((item, index) =>
                                <option key={index} value={item.last4} />
                                )}
                            </datalist>:
                            <>Loading...</>
                            }


                <div className="SubmitAndDiscardContainer">
                    <button className="SubmitPaymentButton" onClick={handleSubmit}> {`Pay $${CurrentItem.invoice_total_price}`} </button>
                    <button className="DiscardInvoiceButton" onClick={(e)=>{
                                setShowSchedulePayment(false)
                                setShowNewInvoice(false)
                                e.preventDefault()
                            }}> Discard</button>
                </div>
                </form>
            </div>
    )
}
