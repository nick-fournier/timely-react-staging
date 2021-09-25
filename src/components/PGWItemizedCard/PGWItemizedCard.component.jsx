import PGWInvoiceItemList from '../PGWInvoiceItemList/PGWInvoiceItemList'
import './PGWItemizedCard.component.css'

export default function PGWItemizedCard({InvoiceOrPay, setInvoiceOrPay, invoiceToPay}) {

    const logo = (invoiceToPay.from_business_name? invoiceToPay.from_business_name.split(' ').shift().charAt(0) + invoiceToPay.from_business_name.split(' ').pop().charAt(0).toUpperCase(): 'NA')
    return (
        <div className="PGWItemizedCard">
                <div className="PGWLogo">
                    {logo}
                </div>
                <div className="PGWTitle">
                    {invoiceToPay.from_business_name}
                </div>
                <div className="PGWBio">
                    Sent you an invoice so you can pay them through <b style={{color: 'black'}}>Pendulum</b>
                </div>
                <div className="PGWDItemizedetails">
                    <div className="PGWInvoiceDetails">
                        <div className="PGWInvoiceTitle"> Invoice Number:</div>
                        <div className="PGWInvoiceField"> {invoiceToPay.invoice_name} </div>
                    </div>
                    <div className="PGWInvoiceDetails">
                        <div className="PGWInvoiceTitle"> Due Date:</div>
                        <div className="PGWInvoiceField">  {invoiceToPay.date_due}</div>
                    </div>
                </div>
                    
                <div className='PGWItemListHeaders'>
                    <div className="ItemDescriptionHeader">
                        DESCRIPTION
                    </div>
                    <div className="QuantityPriceAmountContainer">
                        <div className="QuantityHeader">
                            QUANTITY
                        </div>
                        <div className="ItemPriceHeader">
                            PRICE
                        </div>
                        <div className="ItemsTotalPriceHeader">
                            AMOUNT
                        </div>
                    </div>
                </div>

                <PGWInvoiceItemList invoiceToPay={invoiceToPay}/>
                <div className="PGWPriceContainer">
                    <div className="PGWTotalPriceSection">
                        <div className="TotalAmountWord">
                            Total Due:
                        </div>
                        <div className='TotalAmountNumberPayable'>
                            ${invoiceToPay.invoice_total_price}
                        </div>
                    </div>
                </div>

                <div className="PGWItemizedButton" onClick={()=>{
                    setInvoiceOrPay(false)
                }}>
                    Pay {invoiceToPay.from_business_name}
                </div>
        </div>
    )
}
