import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './PaymentSuccess.css'
import { useHistory } from 'react-router'
export default function PaymentSuccess({invoiceToPay}) {

    const history = useHistory()

    return (
        <div className="PGWSingleCard">
                    <div className="PGWSuccessLogo">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div className="PGWSuccessTitle">
                        Payment Successful!
                    </div>
                    <div className="PGWBio">
                        Transaction Number: {invoiceToPay.invoice_name}
                    </div>

                    <div className="PGWDetails">
                        <div className="PGWInvoiceDetails">
                            <div className="PGWInvoiceTitle"> Invoice From:</div>
                            <div className="PGWSuccessInvoiceField"> {invoiceToPay.from_business_name} </div>
                        </div>
                        <div className="PGWInvoiceDetails">
                            <div className="PGWInvoiceTitle">Invoice To:</div>
                            <div className="PGWSuccessInvoiceField"> {invoiceToPay.to_business_name} </div>
                        </div>
                    </div>
                    <div className="PGWNote">
                        <div className="PGWInvoiceTitle"> Note on Invoice:</div>
                        <div className="PGWSuccessInvoiceField"> {invoiceToPay.notes} </div>
                    </div>
                    <div className="PGWNote">
                        <div className="PGWInvoiceTitle"> Amount Paid:</div>
                        <div className="PGWSuccessInvoiceField"> ${invoiceToPay.invoice_total_price}</div>
                    </div>

                    <div className="PGWSuccessNote">
                        <div className="PGWInvoiceTitle"> Not a Pendulum member?</div>
                    </div>
                    <div className="PGWSuccessButton" onClick={()=>{
                        history.push('/register')
                        }}>
                        Sign Up
                    </div>
                </div>
    )
}
