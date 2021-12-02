import './SendRemind.css'
import { useRef, useState, useEffect } from 'react'

export default function SendRemind({CurrentItem, ShowSendRemind, setShowSendRemind, setshowPopup, PopupMessage, setPopupMessage, showPopup, setProceed, Proceed, setshowPopUpButton, ActionType, setActionType}) {

    const [emailBody, setemailBody] = useState('')
    const [ExtraRecipients, setExtraRecipients] = useState('')


    const RemindEmailBodyRef = useRef('')
    const ExtraRecipientsRef = useRef('')

    const RevealSendRemind = {
        transform: 'translateX(0%)'
    }
    const HideSendRemind = {
        transform: 'translateX(100%)',
        boxShadow: 'none'
    }

    useEffect( async () => {
        if (Proceed === false){
            return
        }

        if (ActionType === 'SendReminder') {
            let ReminderBody = {
                invoice_id: CurrentItem.invoice_id,
                notif_type: 'remind',
                custom_text: emailBody?emailBody:'',
                cc: ExtraRecipients?ExtraRecipients:''
            }

                setshowPopUpButton(false)
                setPopupMessage('Sending Reminder...')
    
                console.log('Running...')
                const httpResponse = await fetch('https://api.pendulumapp.com/api/notifications/',{
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': `token ${localStorage.token}`,
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(ReminderBody)
                })
                
                const JsonResponse = await httpResponse.json()
                console.log(JsonResponse)
                if (JsonResponse.Success){
                    setShowSendRemind(false)
                    RemindEmailBodyRef.current.value = ''
                    ExtraRecipientsRef.current.value = ''
                    setExtraRecipients('')
                    setemailBody('')
                    setPopupMessage(`Reminder email was sent successfully!`)
                    setProceed(false)
                }
                
                else {
                    setPopupMessage('Something went wrong.')
                    setProceed(false)
                }
        }
    }, [Proceed])

    const onSubmit = async (e) =>{
        e.preventDefault()
        setshowPopup(true)
        setshowPopUpButton(true)
        setPopupMessage('Are you sure you want to send the reminder?')
        setActionType('SendReminder')
    }


    return (
        <div style={ShowSendRemind? RevealSendRemind: HideSendRemind} className='SendRemindContainer'>
            <form className='AddBussinessForm' action="" method="post" onSubmit={()=>{}} >
                <div className="NewBussinessHeader">Send A Reminder</div>

                <div className="AddBusinessInputContainer">
                            <label className=''>To Business Name: </label>
                            <input className='FirstRowInputField' type="text" value={CurrentItem.to_business_name}  placeholder='Enter your business name' />
                </div>
                <div className="AddBusinessInputContainer">
                            <label className=''>To Business Email: </label>
                            <input className='FirstRowInputField' type="text" value={CurrentItem.to_business_email}   placeholder='Enter your business email' />
                </div>
                <div className="AddBusinessInputContainer">
                            <label className=''>Extra Recipients:<span className='optional'>(Optional)</span> </label> 
                            <textarea className='RemindExtraRecipients' ref={ExtraRecipientsRef} type="text" placeholder={`Example: \nbusiness1@gmail.com, business2@gmail.com, etc...`} onChange={(e)=>{setExtraRecipients(e.target.value)}} />
                </div>
                <div className="ReminderEmailBodyContainer">
                            <label className=''>Reminder Email Body:<span className='optional'>(Optional)</span> </label> 
                            <textarea className='RemindEmailBody' ref={RemindEmailBodyRef} type="text" placeholder={`Enter your message here`} onChange={(e)=>{setemailBody(e.target.value)}} />
                </div>
                {/* <div className="AddBusinessInputContainer">
                            <label className=''>Business fax: </label>
                            <input className='FirstRowInputField' type="text"  {...register('fax')} placeholder='Enter your business fax' />
                </div> */}

                <div className="SubmitAndDiscardContainer">
                    <button className="SubmitBusinessButton" type="submit" value="Submit" onClick={onSubmit}> Send Reminder</button>
                    <button className="DiscardInvoiceButton" onClick={(e)=>{
                               e.preventDefault()

                               setemailBody('')
                               RemindEmailBodyRef.current.value = ''
                               setExtraRecipients('')
                               ExtraRecipientsRef.current.value = ''
                               setShowSendRemind(false)
                            }}> Discard</button>
                </div>
            </form>
        </div>
    )
}
