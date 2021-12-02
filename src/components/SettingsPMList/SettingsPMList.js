import {useEffect, useState} from 'react'
import PaymentMethodCard from '../PaymentMethodCard/PaymentMethodCard.component'
import Skeleton from '../Skeletons/Skeleton'
import './SettingsPMList.css'



export default function SettingsPMList({ loadingPMS,setreFetchPM, reFetchPM, setshowPopup, setProceed, setshowPopUpButton, ActionType, Proceed, setPopupMessage, setActionType, SelectedPaymentMethod, setSelectedPaymentMethod, setAddPaymentMethodOrListPaymentMethods, AddPaymentMethodOrListPaymentMethods, setPaymentOptionsOrPaymentMethods, setCardOrACH, setloadingPMS }) {
    const [PaymentMethodsList, setPaymentMethodsList] = useState([])


    useEffect(() => {
        
        const loadPMs = async () =>{
            if (AddPaymentMethodOrListPaymentMethods == true) return
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
            setloadingPMS(false)
        }
        loadPMs()
        console.log(PaymentMethodsList)

    }, [loadingPMS, reFetchPM])



    return (
        <div className='SettingsPMListContainer'>

                {PaymentMethodsList.filter(item => item.type==='ach').map((item, key) => (
                    <PaymentMethodCard setloadingPMS={setloadingPMS} Source='SettingsPMList' type='ach' setPopupMessage={setPopupMessage} setshowPopUpButton={setshowPopUpButton} setshowPopup={setshowPopup} setProceed={setProceed} Proceed={Proceed} setActionType={setActionType} SelectedPaymentMethod={SelectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} item={item} key={key}/>
                    
                ))
                }
                    { !loadingPMS && 
                    <div onClick={()=>{
                        setAddPaymentMethodOrListPaymentMethods(true)
                        setPaymentOptionsOrPaymentMethods(false)
                        setCardOrACH(true)
                        }} className='AddPMLink'> + Add another bank account
                    </div>}
                
                {PaymentMethodsList.filter(item => item.type==='card').map((item, key) => (
                    <PaymentMethodCard setloadingPMS={setloadingPMS} Source='SettingsPMList' type='card' setPopupMessage={setPopupMessage} setshowPopUpButton={setshowPopUpButton} setshowPopup={setshowPopup} setProceed={setProceed} Proceed={Proceed} setActionType={setActionType} SelectedPaymentMethod={SelectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} item={item} key={key}/>
                    
                ))
                }
                    {loadingPMS &&
                    <>
                        <Skeleton type='PaymentMethodCardSkeleton'/>
                        <Skeleton type='PaymentMethodCardSkeleton'/>
                        <Skeleton type='PaymentMethodCardSkeleton'/>
                        <Skeleton type='PaymentMethodCardSkeleton'/>
                        <Skeleton type='PaymentMethodCardSkeleton'/>
                        <Skeleton type='PaymentMethodCardSkeleton'/>
                    </>
                        }
                    {!loadingPMS &&
                     <div onClick={()=>{
                        setAddPaymentMethodOrListPaymentMethods(true)
                        setPaymentOptionsOrPaymentMethods(false)
                        setCardOrACH(false)
                        }} className='AddPMLink'> + Add another credit card
                    </div>}
        </div>
    )
}
