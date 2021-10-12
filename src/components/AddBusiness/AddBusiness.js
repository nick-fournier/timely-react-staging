
import './AddBusiness.css'
import {useForm} from 'react-hook-form'

export default function AddBusiness({ShowNewBusiness, setShowNewBusiness, setShowNewInvoice, setreFetchBusinesses, RedirectToNewReceivableOrPayable, setShowNewPayment, SetDefaultValueForBusiness, setSetDefaultValueForBusiness, setHideAddInvoiceBackButton, HideAddInvoiceBackButton}) {




    const {register, handleSubmit, setValue } = useForm();

    const resetValue = () => {
        setValue('business_name', '')
        setValue('email', '')
        setValue('phone', '')
     //   setValue('fax', '')
    }

    const ShowAddBusiness = {
        transform: 'translateX(0%)'
    }
    const HideAddBusiness = {
        transform: 'translateX(100%)',
        boxShadow: 'none'
    }

    async function onSubmit(data){
        const NewInvoice = new FormData()
        NewInvoice.append('business_name', data.business_name)
        NewInvoice.append('business_email', data.email)
        NewInvoice.append('business_phone', data.phone)



        const httpResponse = await fetch('https://api.pendulumapp.com/api/businesses/',{
            method: 'POST',
            headers: new Headers({
                'Authorization': `token ${localStorage.token}`,
            }),
            body: NewInvoice
        })

        const JsonResponse = await httpResponse.json()
        console.log(JsonResponse)
        
        if (JsonResponse.id){
            alert('Business added successfully')
            resetValue()
            setShowNewBusiness(false)
            {RedirectToNewReceivableOrPayable?setShowNewInvoice(true):setShowNewPayment(true)}
            setreFetchBusinesses(true)
            setSetDefaultValueForBusiness(true)
        }
        else{
            alert('something went wrong')
            setSetDefaultValueForBusiness(false)
        }


    }

    return (
        <div style={ShowNewBusiness? ShowAddBusiness: HideAddBusiness} className='AddBusinessContainer'>
            <form className='AddBussinessForm' action="" method="post" onSubmit={handleSubmit(onSubmit)} >
            <div className="NewBussinessHeader">Add A New Business</div>

            <div className="AddBusinessInputContainer">
                        <label className=''>Business Name: </label>
                        <input className='FirstRowInputField' type="text"   {...register('business_name', {shouldUnregister: true})} placeholder='Enter your business name' />
            </div>
            <div className="AddBusinessInputContainer">
                        <label className=''>Business Email: </label>
                        <input className='FirstRowInputField' type="text"  {...register('email')} placeholder='Enter your business email' />
            </div>
            <div className="AddBusinessInputContainer">
                        <label className=''>Business phone:<span className='optional'>(Optional)</span> </label> 
                        <input className='FirstRowInputField' type="text"  {...register('phone')} placeholder='Enter your business phone' />
            </div>
            {/* <div className="AddBusinessInputContainer">
                        <label className=''>Business fax: </label>
                        <input className='FirstRowInputField' type="text"  {...register('fax')} placeholder='Enter your business fax' />
            </div> */}

            <div className="SubmitAndDiscardContainer">
                <button className="SubmitBusinessButton" type="submit" value="Submit"> Add Business</button>
                <button className="DiscardInvoiceButton" onClick={(e)=>{
                            resetValue()
                            setShowNewBusiness(false)
                            setHideAddInvoiceBackButton(false)
                            {RedirectToNewReceivableOrPayable?setShowNewInvoice(true):setShowNewPayment(true)}
                            e.preventDefault()
                        }}> Discard</button>
            </div>
            </form>
        </div>
    )
}
