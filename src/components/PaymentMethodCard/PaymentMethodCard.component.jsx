import { useState, useEffect } from "react"
import './PaymentMethodCard.css'

//setProceed={} setshowPopUpButton={} ActionType={} setActionType={} Proceed={} setPopupMessage={} setshowPopup={} 
export default function PaymentMethodCard({setSelectedPaymentMethod, SelectedPaymentMethod, item, CardOrACHForPayment,reFetchPM, setreFetchPM, setshowPopup, setPopupMessage, Proceed, setActionType, ActionType, setshowPopUpButton, setProceed, type, Source, setloadingPMS}) {


    const [isActive, setisActive] = useState(false)


    useEffect(() => {   
        setisActive(false)
        console.log(isActive)
    }, [SelectedPaymentMethod])



    const Selected = {
        border: '1px solid rgb(0,0,0)'
    }
    
    const marginLess = {
    }

    const DeletePM = () => {
        setActionType('DeletePM')
        setPopupMessage('Are you sure you want to delete this payment method?')
        setshowPopUpButton(true)
        setshowPopup(true)
    }


    useEffect( async () => {

        if (!Proceed) {
            return
        }

        else if (ActionType === 'DeletePM'){

            setPopupMessage('Deleting payment method...')
            setshowPopUpButton(false)
            const DeletePMrequest = await fetch(`https://api.pendulumapp.com/api/stripe/paymentmethods/`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `token ${localStorage.token}`,
                "content-type":"application/json",

            }),
            body: JSON.stringify({
                'payment_method':`${SelectedPaymentMethod}`,
                'action':'detach'
            })
            })
            const resp = await DeletePMrequest.json()
            console.log(resp)
            setPopupMessage(`Payment method was deleted successfully!`)
            setreFetchPM(!reFetchPM)
            if (Source === 'SettingsPMList'){
                setloadingPMS(true)
            }

        }
        setProceed(false)

    }, [Proceed])



    return (

        <div style={isActive?Selected:{}} className={'PaymentMethodCard'} onClick={()=>{
            console.log(item.id)
            setSelectedPaymentMethod(item.id)
            setTimeout(() => {
                setisActive(true)
            }, 0.1);
        }}>
            <div onClick={DeletePM} className="PaymentMethodCardDeleteButton">
                Delete
            </div>
            <div className="PaymentMethodCardLogo">
                <img className='TeaserLogoPM' src={type ==='card'?"\Visa_Inc._logoColor.svg":"\../bank-svgrepo-com.svg"} alt="" />
            </div>
            <div className="PaymentMethodCardInfo">
                <div style={Source==='SettingsPMList'?marginLess:{}} className={Source==='SettingsPMList'?'PMCardInfoLabelFromSettings':"PaymentMethodCardInfoLabel"}>
                    {type ==='card'?'Debit Card':'Bank Account'}
                </div>
                <div style={Source==='SettingsPMList'?marginLess:{}} className={Source==='SettingsPMList'?'PMCardInfoDetailsFromSettings':"PaymentMethodCardInfoDetails"}>
                    {item.brand} (...{item.last4})
                </div>
            </div>
        </div>
    )
}
