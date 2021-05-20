import React from 'react'
import './InvoiceFooter.component.css'

export default function InvoiceFooter({CurrentItem}) {
    return (
        <div className="BottomPart">
            <div className="From">
                <div className="FromLabel">
                    FROM:
                </div>
                <div className="FromName" id='FromName'>
                    {CurrentItem.from_business_name} 
                </div>
            </div>
            <div className="To">
                <div className="ToLabel">
                    TO:
                </div>
                <div className="ToName" id='ToName'>
                    {CurrentItem.to_business_name}
                </div>
            </div>
            <div className="NoteContainer">
                <div className="PaymentMedium">
                    PAYMENT MEDIUM: Credit Card Accepted.
                </div>
                <div className="Note">
                    Note:
                </div>
                <div className="NoteContent">
                    {CurrentItem.notes}
                </div>                       
            </div>
        </div>
    )
}
