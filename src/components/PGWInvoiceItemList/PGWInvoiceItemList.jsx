import './PGWInvoiceItemList.css'

import PGWInvoiceItem from "../PGWInvoiceItem/PGWInvoiceItem"
export default function PGWInvoiceItemList({invoiceToPay}) {
    return (
        <div className="PGWItemDetailsContainer">
            {invoiceToPay.invoice_id && invoiceToPay.items.map(item => (
                    <PGWInvoiceItem item={item}/>
                ))}
        </div>
    )
}
