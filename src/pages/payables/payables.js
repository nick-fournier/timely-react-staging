import './payables.css'
import ItemList from '../../components/ItemList/ItemList.component'
import InvoiceCardList from '../../components/InvoiceCardList/InvoiceCardList.component'
import InvoiceFooter from '../../components/InvoiceFooter/InvoiceFooter.component'
import InvoiceHeader from '../../components/InvoiceHeader/InvoiceHeader.component'
import RHSHeaders from '../../components/RHSHeaders/RHSHeaders.component'
import Price from '../../components/Price/Price.component'
import InvoiceOptions from '../../components/InvoiceOptions/InvoiceOptions.component'
import MediaQuery from "react-responsive";

export default function Payables({SearchedData, DataSet, setDataSet, itemList, setitemList, CurrentItem, setCurrentItem, setsearchField, setSearchMethod, DataSwitch, loadPayables, loadReceivables, setisMobile, isMobile, ShowSchedulePayment, setShowSchedulePayment, ShowHeaders, setShowHeaders, PopupMessage, setPopupMessage, showPopup,setshowPopup, ShowSendRemind, setShowSendRemind, ActionType, setActionType, setshowPopUpButton, Proceed, setProceed, setloading, loading, ShowImmediateSolutions, setShowImmediateSolutions, ReloadInvoiceList, setReloadInvoiceList}) {
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
                            
                                <RHSHeaders ShowHeaders={ShowHeaders} setShowHeaders={setShowHeaders} CurrentItem={CurrentItem}/>
                            <div className="MiddlePart" id='MiddlePart'>
                                <ItemList CurrentItem={CurrentItem} ShowHeaders={ShowHeaders} setShowHeaders={setShowHeaders} itemList={itemList}/>
                                

                                <Price CurrentItem={CurrentItem} DataSwitch={DataSwitch}/>
                            </div>
                            <InvoiceFooter CurrentItem={CurrentItem}/>
                        </div>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery minDeviceWidth={481}>
                <InvoiceOptions ReloadInvoiceList={ReloadInvoiceList} setReloadInvoiceList={setReloadInvoiceList} ShowImmediateSolutions={ShowImmediateSolutions} setShowImmediateSolutions={setShowImmediateSolutions} SearchedData={SearchedData} setCurrentItem={setCurrentItem} setloading={setloading} ActionType={ActionType} setActionType={setActionType} setshowPopUpButton={setshowPopUpButton} Proceed={Proceed} setProceed={setProceed} ShowSendRemind={ShowSendRemind} setShowSendRemind={setShowSendRemind} showPopup={showPopup} setshowPopup={setshowPopup} PopupMessage={PopupMessage} setPopupMessage={setPopupMessage} setShowSchedulePayment={setShowSchedulePayment} ShowSchedulePayment={ShowSchedulePayment} setisMobile={setisMobile} isMobile={isMobile} SearchedData={SearchedData} DataSet={DataSet} setDataSet={setDataSet} CurrentItem={CurrentItem} setsearchField={setsearchField} setSearchMethod={setSearchMethod} loadPayables={loadPayables} loadReceivables={loadReceivables}/>
                <div className="invoice-page-container">
                    <InvoiceCardList loading={loading} DataSwitch={DataSwitch} setisMobile={setisMobile} isMobile={isMobile} SearchedData={SearchedData} itemList={itemList} setitemList={setitemList} setCurrentItem={setCurrentItem} CurrentItem={CurrentItem}/>

                <div className={`${isMobile?'InvoiceMobileHidden':'InvoiceMobileView'} RHSContainer`}>
                    <div className="RightHandSide">
                    <InvoiceHeader DataSwitch={DataSwitch} setisMobile={setisMobile} CurrentItem={CurrentItem}/>
                        
                        <div className="MiddlePart" id='MiddlePart'>
                            <RHSHeaders ShowHeaders={ShowHeaders} setShowHeaders={setShowHeaders} CurrentItem={CurrentItem}/>
                            <ItemList CurrentItem={CurrentItem} ShowHeaders={ShowHeaders} setShowHeaders={setShowHeaders} itemList={itemList}/>
                            

                        </div>
                        <Price CurrentItem={CurrentItem} DataSwitch={DataSwitch}/>
                        <InvoiceFooter CurrentItem={CurrentItem}/>
                    </div>
                </div>
                </div>
            </MediaQuery>
        </div>
    )
}
