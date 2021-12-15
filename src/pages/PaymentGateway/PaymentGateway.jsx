import './PaymentGateway.css'
import PGWSingleCard from '../../components/PGWSingleCard/PGWSingleCard.component'
import PGWItemizedCard from '../../components/PGWItemizedCard/PGWItemizedCard.component'
import PaymentSuccess from '../../components/PaymentSuccess/PaymentSuccess';
import InvoiceNotFound from '../../components/InvoiceNotFound/InvoiceNotFound';
import Loading from '../../components/loading/loading';
import  { usePlaidLink } from 'react-plaid-link';


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

const [PaymentGatewayCardOrACH, setPaymentGatewayCardOrACH] = useState(false)
const [ChooseOrPay, setChooseOrPay] = useState(true)

const stripe = useStripe()
const elements = useElements()

// ACH Input states

const [ACHName, setACHName] = useState('')
const [ACHEmail, setACHEmail] = useState('')
const [plaidToken, setplaidToken] = useState('')

// ACH Plaid data

const [MetaData, setMetaData] = useState({})
const [PublicToken, setPublicToken] = useState('')


// -> Loading invoice data

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

    // Stripe Card Payment Logic


    async function handleSubmit(){
        setProcessing(true)
        const Card = elements.getElement(CardNumberElement)
        const paymentMethodRes = await stripe.createPaymentMethod({
            type :'card',
            card: Card,
        })
        if (paymentMethodRes.error){
            console.log(paymentMethodRes.error)
            setErrorFlag(true)
            setErrorMessage(paymentMethodRes.error.message)
            setErrorFlag(false)
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
                        "payment_method":`${id}`,
                        'type':'card'
                    })
                })
                const JsonData = await paymentData.json()
                console.log(JsonData)
                if(JsonData.status == 'succeeded')
                {
                    console.log('Payment Successful')
                    setSuccess(true)       
                    setProcessing(false)
                    setErrorFlag(false)   
                }
                else {
                    setProcessing(false)
                    setErrorFlag(true)
                    setErrorMessage(`Something went wrong. Please contact ${invoiceToPay.from_business_name}.`)                    
                }
                
            } catch (error) {
                setProcessing(false)
                console.log(error)
                setErrorFlag(true)
                setErrorMessage(`${error}`)

            }
        }


        // Plaid payment 

        async function handleACHPayment (){
            setErrorFlag(false)
            setProcessing(true)
            console.log(ACHName)
                console.log(ACHEmail)
                let linkTokenBody = {
                    'public_token': PublicToken,
                    'plaid_account_id': MetaData.accounts[0].id,
                    'oon_name':ACHName,
                    'oon_email':ACHEmail
                }
                console.log(linkTokenBody)
                const PlaidExchange = await fetch('https://api.pendulumapp.com/api/plaid/linktoken/',{
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(linkTokenBody)
            })
                const PlaidExchangeResponse = await PlaidExchange.json()
                console.log(PlaidExchangeResponse)
                // console.log(public_token);
                // console.log(metadata)

                // COninue logic here

                let PaymentBody = {
                    "payment_method":PlaidExchangeResponse.payment_method,
                    "invoice_id":invoiceID,
                    'type':'ach',
                    'stripe_cus_id':PlaidExchangeResponse.stripe_cus_id
                }

                console.log(PaymentBody)
                const PaymentResponse = await fetch('https://api.pendulumapp.com/api/stripe/payinvoice/',{
                    method: "POST",
                    headers: new Headers({
                      'Content-Type': 'application/json'
                  }),
                  body: JSON.stringify(PaymentBody)
                  })
                const PaymentJson = await PaymentResponse.json()
                console.log(PaymentJson)
                if (PaymentJson.status==='succeeded'){
                    console.log('payment succeeded')
                    setProcessing(false)
                    setSuccess(true)
                    // setProcessingPayment(false)
                    // setMessageReveal(true)
                    // setPaymentSuccessOrFail(true)
                    // setTimeout(() => {
                        // setMessageReveal(false)
                    // }, 2000);
                }
    
                else {
                    console.log(PaymentJson)
                    // setProcessingPayment(false)    
                    // setPaymentSuccessOrFail(false)
                    // setMessageReveal(true)
                    // setTimeout(() => {
                        // setMessageReveal(false)
                    // }, 2000);
                }

                //////////////////////////////
        }

        /////// Handle Pay Button disabled or not

        useEffect(() => {
            setProcessing(false)
            setTimeout(() => {
                setErrorMessage('')
                
            }, 3000);
        }, [ErrorFlag])


        /////////////

        useEffect( async () => {

            
            const PlaidLinkToken = await fetch('https://api.pendulumapp.com/api/plaid/linktoken/',{
                method: "GET",
                headers: new Headers({
                }),
            })
            const PlaidLinkTokenJSON = await PlaidLinkToken.json()
            // console.log(PlaidLinkTokenJSON)
            setplaidToken(PlaidLinkTokenJSON)
            console.log(plaidToken)
        }, [])
    
    
    
        const config = {
            onSuccess:  (public_token, metadata) => {
                console.log(public_token)
                console.log(metadata)
                setMetaData(metadata)
                setPublicToken(public_token)
                setChooseOrPay(false)
                setPaymentGatewayCardOrACH(false)
            },
            onExit: (err, metadata) => {},
            onEvent: (eventName, metadata) => {},
            token: `${plaidToken}`,
            // required for OAuth:
            receivedRedirectUri: window.location.href,
            // if not OAuth, set to null or do not include:
            receivedRedirectUri: null,
          };
          const { open, exit, ready } =  usePlaidLink(config);

          //
    
     


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
                <PGWSingleCard setChooseOrPay={setChooseOrPay} invoiceToPay={invoiceToPay} InvoiceOrPay={InvoiceOrPay} setInvoiceOrPay={setInvoiceOrPay} />
                
                :

                <PGWItemizedCard setChooseOrPay={setChooseOrPay} invoiceToPay={invoiceToPay} InvoiceOrPay={InvoiceOrPay} setInvoiceOrPay={setInvoiceOrPay} />
                :
                !ChooseOrPay?
                PaymentGatewayCardOrACH?     
                <div className='PGWPaySingleCard'>
                    <div className="PGWPayTitle">
                        Input your card details
                    </div>
                    <div className="PGWBackButon" onClick={()=>{
                        // setInvoiceOrPay(true)
                        setChooseOrPay(true)
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
                        <CardNumberElement options={{
                                                style: {
                                                base: {
                                                    fontSize: '1em',
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                                },
                            }} className='CardNumberElement' />

                        <div className="CardEXPandCVC">
                            <div className="CardExpiryContainer">
                                <label className='CardInfoLabel' htmlFor="">Card Expiration Date :</label>
                                <CardExpiryElement options={{
                                                style: {
                                                base: {
                                                    fontSize: '1em',
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                                },
                            }} className='CardNumberElement'/>
                            </div>
                            <div className="CardCVCContainer">
                                <label className='CardInfoLabel' htmlFor="">Card Security Code :</label>
                                <CardCvcElement options={{
                                                style: {
                                                base: {
                                                    fontSize: '1em',
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                },
                                                },
                            }} className='CardNumberElement'/>
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

                    <button className={Processing?'DisabledPGWACHPayButton':'PGWACHPayButton'} disabled={!Processing?false:true} onClick={()=>{handleSubmit()}}> Pay ${invoiceToPay.invoice_total_price} </button>
                </div>
                :
                <>
                    <div className="PGWPayTitle">
                        Provide us with your name and email <br /> and proceed with payment
                    </div>
                    <div className='PGWACHPaymentFormContainer'>
                        <div className="PGWInputsContainer">
                            <label className='PGWACHFormLabel'>Business Name: </label>
                            <input className='PGWFormInput' type="text"  placeholder='Enter your business name' onChange={(e)=>{
                                setACHName(e.target.value)
                                console.log(ACHName)
                            }} />
                        </div>
                        <div className="PGWInputsContainer">
                            <label className='PGWACHFormLabel'>Business Email: </label>
                            <input className='PGWFormInput' type="email" placeholder='Enter your business email' onChange={(e)=>{
                                setACHEmail(e.target.value)
                                console.log(ACHEmail)

                            }} />
                        </div>
                        <button className={Processing?'DisabledPGWACHPayButton':'PGWACHPayButton'} disabled={!Processing?false:true} onClick={handleACHPayment}> Submit and pay ${invoiceToPay.invoice_total_price} </button>
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
                </>
                :
                <>
                <h1 className='PGWChooseTitle'>Choose your payment method</h1>

                <div className="ChooseContainer">
                    <div className="ChooseCardCAndLabelontainer">
                        <div className="PGWExplanation">
                            <div className="TwoLines"> Put in your card details and pay immediately. </div>         
                        </div>
                        <div className="ChooseCard">
                            
                            <div className="PGWLogoContainer">
                                <img className='PGWACHOrCardLogo' src="\card2.svg" alt="" />
                            </div>
                                
                            <div className="PGWExplanationAndCardContainer">
                                <div className="PGWChooseButton" onClick={()=>{
                                    setChooseOrPay(false)
                                    setPaymentGatewayCardOrACH(true)
                                }}>
                                    Pay With Card    
                                </div>                            
                            </div>
                        </div>
                    </div>
                    <div className="ChooseCardCAndLabelontainer">
                        <div className="PGWExplanation">
                            <div className="TwoLines"> Login to your bank account and pay immediately. </div>         
                        </div>
                        <div className="ChooseCard">
                            <div className="PGWLogoContainer">
                                <img className='PGWACHOrCardLogo' src="\bank2.svg" alt="" />
                            </div>
                            <div className="PGWExplanationAndCardContainer">
                                <div className="PGWChooseButton" onClick={open}>
                                    Pay With Bank Account    
                                </div>  
                            </div>
                        </div>
                    </div>


                </div>
                <h4 className='PGWBackToInvoiceButton' onClick={()=>setInvoiceOrPay(true)}>Back to invoice</h4>
                </>

                :
                <PaymentSuccess invoiceToPay={invoiceToPay}/>
            }
            </div>
            :
            <>{loading?
                <Loading/>
                :
                <div className='PGWContainer'>
                    <InvoiceNotFound/>
                </div>
                    }
                
            </>}
        </>
    )
}
