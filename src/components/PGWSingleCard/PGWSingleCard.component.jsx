import './PGWSingleCard.component.css'

export default function PGWSingleCard({InvoiceOrPay, setInvoiceOrPay, invoiceToPay, setChooseOrPay}) {
    const logo = (invoiceToPay.from_business_name? invoiceToPay.from_business_name.split(' ').shift().charAt(0) + invoiceToPay.from_business_name.split(' ').pop().charAt(0).toUpperCase(): 'NA')

    return (
        <div className="PGWSingleCard">
            <div className="PGWLogo">
                {logo}
            </div>
            <div className="PGWTitle">
                {invoiceToPay.from_business_name}
            </div>
            <div className="PGWBio">
                Sent you an invoice so you can pay them through <b style={{color: 'black'}}>Pendulum</b>
            </div>
            <div className="PGWAmount">
                ${invoiceToPay.invoice_total_price}
            </div>
            <div className="PGWDetails">
                <div className="PGWInvoiceDetails">
                    <div className="PGWInvoiceTitle"> Invoice Number:</div>
                    <div className="PGWInvoiceField"> {invoiceToPay.invoice_name} </div>
                </div>
                <div className="PGWInvoiceDetails">
                    <div className="PGWInvoiceTitle"> Due Date:</div>
                    <div className="PGWInvoiceField">  {invoiceToPay.date_due}</div>
                </div>
            </div>
            <div className="PGWNote">
                <div className="PGWInvoiceTitle"> Note from business</div>
                <div className="PGWInvoiceField">  {invoiceToPay.notes}</div>
                
            </div>
            <div className="PGWButton" onClick={()=>{
                    setInvoiceOrPay(false)
                    setChooseOrPay(true)
                }}>
                Pay {invoiceToPay.from_business_name}
            </div>
        </div>

    )
}
