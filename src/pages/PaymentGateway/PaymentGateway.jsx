import './PaymentGateway.css'
import PGWSingleCard from '../../components/PGWSingleCard/PGWSingleCard.component'
import PGWItemizedCard from '../../components/PGWItemizedCard/PGWItemizedCard.component'
import PaymentSuccess from '../../components/PaymentSuccess/PaymentSuccess';
import InvoiceNotFound from '../../components/InvoiceNotFound/InvoiceNotFound';

import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';


import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'

import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';

export default function PaymentGateway() {

const { InvoiceId } = useParams()

const [invoiceID, setinvoiceID] = useState(InvoiceId)
const [invoiceToPay, setinvoiceToPay] = useState(null)
const [StripeObject, setStripeObject] = useState(null)

const [reLoad, setreLoad] = useState(false)
const [loading, setloading] = useState(null)
const [invalidID, setinvalidID] = useState(false)

const [SingleOrItemized, setSingleOrItemized] = useState(null)
const [InvoiceOrPay, setInvoiceOrPay] = useState(true)
const [Success, setSuccess] = useState(false)
const [Processing, setProcessing] = useState(false)
const [ErrorFlag, setErrorFlag] = useState(false)
const [ErrorMessage, setErrorMessage] = useState(null)

const stripe = useStripe()
const elements = useElements()


useEffect( async () => {
    console.log(invoiceID)
    
    const stripePromise = loadStripe(
        'pk_test_51J7P2UC6DO7oZMzwFigARqX8KyMNlZWjDuzas5oRbpgurPlCRrwwwb3ZGeZS5FbsC8RKZmpn7zSdCcwYftctUfz400GYOMb0BJ',
        {
            stripeAccount: `acct_1J7P2UC6DO7oZMzw`
        })
        
        setStripeObject(stripePromise)

    
        try {
            setloading(true)
            const InvoiceToPay = await fetch(`https://api.pendulumapp.com/api/stripe/payinvoice/${invoiceID}/`,{
                method: "GET",
              })
                const DataJson = await InvoiceToPay.json()
                setinvoiceToPay(DataJson[0])
                if (invoiceToPay){
                    console.log('Invoice is',invoiceToPay)
                    if (DataJson[0].items.length > 0){
                        setSingleOrItemized(false)
                    }
                    else {
                        setSingleOrItemized(true)
                    }
                }
                else {
                    setreLoad(!reLoad)
                }
                    
        } catch (error) {
            setinvoiceToPay(null)
            setinvalidID(true)
            setSingleOrItemized(null)

        }
        setloading(false)
        setinvalidID(false)

        return () => {
            setErrorMessage('')
            setSuccess(false)
            setProcessing(false)
            setErrorFlag(false)
            setInvoiceOrPay(null)
            setSingleOrItemized(null)
            setinvalidID(null)
            setinvoiceToPay(null)
        }

    }, [invoiceID, reLoad])


    async function handleSubmit(e){
        e.preventDefault()
        setProcessing(true)
        setErrorFlag(false)
        const Card = elements.getElement(CardNumberElement)
        const paymentMethodRes = await stripe.createPaymentMethod({
            type :'card',
            card: Card,
        })
        if (paymentMethodRes.error){
            console.log(paymentMethodRes.error)
            setErrorFlag(true)
            setErrorMessage(paymentMethodRes.error.message)
            return
            
        }

        const {id} = paymentMethodRes.paymentMethod
        console.log(id)
        
        if (!stripe || !elements){
            return;
        }

            try {
                const paymentData = await fetch(`https://api.pendulumapp.com/api/stripe/payinvoice/${invoiceID}/`,{
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }), 
                    body: JSON.stringify({
                        "payment_method":`${id}`
                    })
                })
                const JsonData = await paymentData.json()
                console.log(JsonData)
                if(JsonData.status == 'succeeded')
                {
                    console.log('Payment Successful')
                    setSuccess(true)       
                    setProcessing(false)   
                }
                else {
                    setErrorFlag(true)
                    setErrorMessage(`Something went wrong. Please contact ${invoiceToPay.from_business_name}.`)                    
                }
                
            } catch (error) {
                setProcessing(false)
                console.log(error)
                setErrorFlag(true)
                setErrorMessage(error)

            }
        }


if (!StripeObject)
    return (
      <div>Loading...</div>
    );

    else
  

    return (
            <>
            {!loading && invoiceToPay && !invalidID?
            <div className='PGWContainer'>
                {!Success?InvoiceOrPay?SingleOrItemized?
                <PGWSingleCard invoiceToPay={invoiceToPay} InvoiceOrPay={InvoiceOrPay} setInvoiceOrPay={setInvoiceOrPay} />
                
                :
                <PGWItemizedCard invoiceToPay={invoiceToPay} InvoiceOrPay={InvoiceOrPay} setInvoiceOrPay={setInvoiceOrPay} />
                :     
                <div className='PGWPaySingleCard'>
                    <div className="PGWPayTitle">
                        Input your card details
                    </div>
                    <div className="PGWBackButon" onClick={()=>{
                        setInvoiceOrPay(true)
                    }}>
                        <svg className='PGWBackIcon' xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </div>
                    <div className="PGWInvoiceTitle"> Invoice Number:</div>
                    <div className="PGWInvoiceField"> {invoiceToPay.invoice_name} </div>
                            
                    <div className="PGWCardDetailsLogos">
                        <img className='PGWTeaserLogoPM' src="\Visa_Inc._logoColor.svg" alt="" />
                        <img className='PGWTeaserLogoSmallPM' src="\American Express Logo for PGW.svg" alt="" />
                        <img className='PGWTeaserLogoMediumPM' src="\Mastercard-logocolor.svg" alt="" />
                        <img className='PGWTeaserLogoPM' src="\Discover_Card_logocolor.svg" alt="" />
                    </div>
                    <div className="PGWCardInformation">        
                        <label className='CardInfoLabel' htmlFor="">Card Number :</label>
                        <CardNumberElement className='CardNumberElement' />

                        <div className="CardEXPandCVC">
                            <div className="CardExpiryContainer">
                                <label className='CardInfoLabel' htmlFor="">Card Expiration Date :</label>
                                <CardExpiryElement className='CardNumberElement'/>
                            </div>
                            <div className="CardCVCContainer">
                                <label className='CardInfoLabel' htmlFor="">Card Security Code :</label>
                                <CardCvcElement className='CardNumberElement'/>
                            </div>
                        </div>
                    </div>
                    {Processing &&
                    !ErrorFlag? 
                    <div className="PGWProcessing">
                        Processing Payment...
                    </div>
                    :
                    <div className="PGWError">
                        {ErrorMessage}
                    </div>
                    }

                    <button className='PGWPayButton' onClick={handleSubmit}> Pay ${invoiceToPay.invoice_total_price} </button>
                </div>
                :
                <PaymentSuccess invoiceToPay={invoiceToPay}/>
            }
            </div>
            :
            <>{loading?
                <>Loading...</>
                :
                <div className='PGWContainer'>
                    <InvoiceNotFound/>
                </div>
                    }
                
            </>}
        </>
    )
}
