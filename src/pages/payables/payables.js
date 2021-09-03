import './payables.css'
import ItemList from '../../components/ItemList/ItemList.component'
import InvoiceCardList from '../../components/InvoiceCardList/InvoiceCardList.component'
import InvoiceFooter from '../../components/InvoiceFooter/InvoiceFooter.component'
import InvoiceHeader from '../../components/InvoiceHeader/InvoiceHeader.component'
import RHSHeaders from '../../components/RHSHeaders/RHSHeaders.component'
import Price from '../../components/Price/Price.component'
import InvoiceOptions from '../../components/InvoiceOptions/InvoiceOptions.component'
import MediaQuery from "react-responsive";

export default function Payables({SearchedData, DataSet, setDataSet, itemList, setitemList, CurrentItem, setCurrentItem, setsearchField, setSearchMethod, DataSwitch, loadPayables, loadReceivables, setisMobile, isMobile, ShowSchedulePayment, setShowSchedulePayment}) {
    
    const ShowInvoiceDetails = {
        transform: 'translateX(-100%)'
    }
    
    return (
        <div className='ReceivablesPageContainer'>
            <MediaQuery maxDeviceWidth={480} >
                <InvoiceOptions setShowSchedulePayment={setShowSchedulePayment} ShowSchedulePayment={ShowSchedulePayment} setisMobile={setisMobile} isMobile={isMobile} SearchedData={SearchedData} DataSet={DataSet} setDataSet={setDataSet} CurrentItem={CurrentItem} setsearchField={setsearchField} setSearchMethod={setSearchMethod} loadPayables={loadPayables} loadReceivables={loadReceivables}/>
                <div className="invoice-page-container">
                    <InvoiceCardList DataSwitch={DataSwitch} setisMobile={setisMobile} isMobile={isMobile} SearchedData={SearchedData} itemList={itemList} setitemList={setitemList} setCurrentItem={setCurrentItem}/>

                    <div style={isMobile?ShowInvoiceDetails:{}} className={`${isMobile?'InvoiceMobileHidden':'InvoiceMobileView'} RHSContainer`}>
                        <div className="RightHandSide">
                        <InvoiceHeader setisMobile={setisMobile} CurrentItem={CurrentItem}/>
                            
                            <div className="MiddlePart" id='MiddlePart'>
                                <RHSHeaders CurrentItem={CurrentItem}/>
                                <ItemList itemList={itemList}/>
                                

                                <Price CurrentItem={CurrentItem} DataSwitch={DataSwitch}/>
                            </div>
                            <InvoiceFooter CurrentItem={CurrentItem}/>
                        </div>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery minDeviceWidth={481}>
                <InvoiceOptions setShowSchedulePayment={setShowSchedulePayment} ShowSchedulePayment={ShowSchedulePayment} setisMobile={setisMobile} isMobile={isMobile} SearchedData={SearchedData} DataSet={DataSet} setDataSet={setDataSet} CurrentItem={CurrentItem} setsearchField={setsearchField} setSearchMethod={setSearchMethod} loadPayables={loadPayables} loadReceivables={loadReceivables}/>
                <div className="invoice-page-container">
                    <InvoiceCardList DataSwitch={DataSwitch} setisMobile={setisMobile} isMobile={isMobile} SearchedData={SearchedData} itemList={itemList} setitemList={setitemList} setCurrentItem={setCurrentItem} CurrentItem={CurrentItem}/>

                <div className={`${isMobile?'InvoiceMobileHidden':'InvoiceMobileView'} RHSContainer`}>
                    <div className="RightHandSide">
                    <InvoiceHeader setisMobile={setisMobile} CurrentItem={CurrentItem}/>
                        
                        <div className="MiddlePart" id='MiddlePart'>
                            <RHSHeaders CurrentItem={CurrentItem}/>
                            <ItemList itemList={itemList}/>
                            

                            <Price CurrentItem={CurrentItem} DataSwitch={DataSwitch}/>
                        </div>
                        <InvoiceFooter CurrentItem={CurrentItem}/>
                    </div>
                </div>
                </div>
            </MediaQuery>
        </div>
    )
}
