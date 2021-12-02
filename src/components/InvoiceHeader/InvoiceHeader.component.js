import React from 'react'
import '../../pages/receivables/receivables.css'
import './InvoiceHeader.component.css'


export default function InvoiceHeader({CurrentItem, setisMobile, DataSwitch}) {
    const Business = DataSwitch === 1?CurrentItem.to_business_name:CurrentItem.from_business_name
    const logo = (Business? Business.split(' ').shift().charAt(0) +  Business.split(' ').pop().charAt(0).toUpperCase(): 'NA')
    return (

        <div className="TopPart">
                <div className="TopPartLHS">
                    <div className="logo" id='logo'>
                        {logo}
                    </div>
                    <div className="InvoiceHeaders">
                        <div className="BusinessName" id='BusinessName'>
                            {Business}
                        </div>
                        <div className="TopPartRHS">
                            <div className="DateDue" id='DateDue'>
                                Due Date: {CurrentItem.date_due}
                            </div>
                            
                        </div>
                        <div className="InvoiceNumber" id='InvoiceNumber'>
                            #{CurrentItem.invoice_name}
                        </div>
                    </div>
                </div>
            </div>

    )
}
