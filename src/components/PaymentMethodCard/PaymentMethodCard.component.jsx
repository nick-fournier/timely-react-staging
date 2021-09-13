import { useState, useEffect } from "react"


export default function PaymentMethodCard({PaymentMethodsList, setSelectedPaymentMethod, setReloadList, ReloadList, SelectedPaymentMethod, item,}) {


    const [isActive, setisActive] = useState(false)


    useEffect(() => {   
        setisActive(false)
        console.log(isActive)
    }, [SelectedPaymentMethod])

    const Selected = {
        backgroundColor : 'rgba(204, 204, 204, 0.527)',
    }


    return (

        <div style={isActive?Selected:{}} className={'PaymentMethodCard'} onClick={()=>{
            console.log(item.id)
            setSelectedPaymentMethod(item.id)
            setTimeout(() => {
                setisActive(true)
            }, 0.1);
        }}>
            <div className="PaymentMethodCardLogo">
                <img className='TeaserLogoPM' src="\Visa_Inc._logoColor.svg" alt="" />
            </div>
            <div className="PaymentMethodCardInfo">
                <div className="PaymentMethodCardInfoLabel">
                    Debit Card
                </div>
                <div className="PaymentMethodCardInfoDetails">
                    {item.brand} (...{item.last4})
                </div>
            </div>
        </div>
    )
}
