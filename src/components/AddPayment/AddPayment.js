
import './AddPayment.css'
import {useForm} from 'react-hook-form'

export default function AddPayment({ShowNewPayment, setShowNewInvoice, setShowNewPayment}) {




    const {register, handleSubmit, setValue } = useForm();

    const resetValue = () => {
    }

    const ShowAddPayment = {
        transform: 'translateX(0%)'
    }
    const HideAddPayment = {
        transform: 'translateX(100%)'
    }

    async function onSubmit(data){




    }

    return (
        <div style={ShowNewPayment? ShowAddPayment: HideAddPayment} className='AddPaymentContainer'>
            <form className='AddPaymentForm' action="" method="post" onSubmit={handleSubmit(onSubmit)} >
            <div className="NewPaymentHeader">Add Payment Details</div>

            <div className="AddPaymentInputContainer">
                        <label className=''>Account Type: </label>
                        <select className='SelectInput'>
                            <option value="Standard" >Standard</option>
                            <option value="Express" >Express</option>
                            <option value="Custom" >Custom</option>
                        </select>
            </div>
            <div className="AddPaymentInputContainer">
                        <label className=''>Business Type: </label>
                        <select className='SelectInput'>
                            <option value="Business" >Business</option>
                            <option value="Individual" >Individual</option>
                        </select>
            </div>
            <div className="AddPaymentInputContainer">
                        <label className=''>Payment Methods: </label>
                        <select className='SelectInput'>
                            <option value="Card Payments" >Card Payments</option>
                            <option value="Transfers" >Transfers</option>
                        </select>
            </div>
            <div className="AddPaymentInputContainer">
                        <label className=''>Associated Phone:</label> 
                        <input className='FirstRowInputField' type="text"  {...register('phone')} placeholder='Enter your phone' />
            </div>
            {/* <div className="AddPaymentInputContainer">
                        <label className=''>Business fax: </label>
                        <input className='FirstRowInputField' type="text"  {...register('fax')} placeholder='Enter your business fax' />
            </div> */}

            <div className="SubmitAndDiscardContainer">
                <button className="SubmitPaymentButton" type="submit" value="Submit"> Add Payment</button>
                <button className="DiscardInvoiceButton" onClick={(e)=>{
                            setShowNewPayment(false)
                            setShowNewInvoice(false)
                            e.preventDefault()
                        }}> Discard</button>
            </div>
            </form>
        </div>
    )
}
