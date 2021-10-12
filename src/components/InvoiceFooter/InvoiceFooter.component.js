import React from 'react'
import './InvoiceFooter.component.css'

export default function InvoiceFooter({CurrentItem}) {
    return (
        <div className="BottomPart">
            <div className="From">
                <div className="FromLabel">
                    - FROM:
                </div>
                <div className="FromName" id='FromName'>
                    {CurrentItem.from_business_name} 
                </div>
                <div className="Address">
                    - Address:
                </div>
                <div className="FromName" id='FromName'>
                    {CurrentItem.from_billing_address} 
                </div>
                <div className="Address">
                    - Phone:
                </div>
                <div className="FromName" id='FromName'>
                    {CurrentItem.from_business_phone?CurrentItem.from_business_phone:'Not Included'} 
                </div>
            </div>
            <div className="NoteContainer">
                <div className="PaymentMedium">
                    <div className="PaymentMediumLabel">
                        - PAYMENT MEDIUM:
                    </div>
                    <div className="PaymentMediumContent">
                        Credit Card Accepted.  
                    </div>
                </div>
                <div className="Note">
                    - Note:
                </div>
                <div className="NoteContent">
                    {CurrentItem.notes?CurrentItem.notes:'Not Included'}
                </div>  
                <div className="Address">
                    {CurrentItem.to_business_name?'-':''}
                </div>
                <div className="NoteContent">
                    {CurrentItem.to_business_name?'-':''}
                </div>                       
            </div>
            <div className="To">
                <div className="ToLabel">
                    - TO:
                </div>
                <div className="ToName" id='ToName'>
                    {CurrentItem.to_business_name}
                </div>
                <div className="Address">
                    - Address:
                </div>
                <div className="ToName" id='ToName'>
                    {CurrentItem.to_billing_address}
                </div>
                <div className="Address">
                    - Phone:
                </div>
                <div className="FromName" id='FromName'>
                    {CurrentItem.to_business_phone?CurrentItem.to_business_phone:'Not included'} 
                </div>
            </div>

        </div>
    )
}
