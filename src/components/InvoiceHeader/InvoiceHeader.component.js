import React from 'react'
import '../../pages/receivables/receivables.css'
import './InvoiceHeader.component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function InvoiceHeader({CurrentItem, setisMobile}) {
    const logo = (CurrentItem.to_business_name? CurrentItem.to_business_name.split(' ').shift().charAt(0) + CurrentItem.to_business_name.split(' ').pop().charAt(0).toUpperCase(): 'NA')
    return (

        <div className="TopPart">
                <div className="TopPartLHS">
                    <div onClick={()=> setisMobile(false)} className="BackToInvoiceList">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                    <div className="logo" id='logo'>
                        {logo}
                    </div>
                    <div className="InvoiceHeaders">
                        <div className="BusinessName" id='BusinessName'>
                            {CurrentItem.to_business_name}
                        </div>
                        <div className="InvoiceNumber" id='InvoiceNumber'>
                            #{CurrentItem.invoice_id}
                        </div>
                    </div>
                </div>
                <div className="TopPartRHS">
                    <div className="DateDue" id='DateDue'>
                        Due Date: {CurrentItem.date_due}
                    </div>
                    
                </div>
            </div>

    )
}
