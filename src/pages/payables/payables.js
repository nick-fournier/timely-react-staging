import './payables.css'
import ItemList from '../../components/ItemList/ItemList.component'
import InvoiceCardList from '../../components/InvoiceCardList/InvoiceCardList.component'
import InvoiceFooter from '../../components/InvoiceFooter/InvoiceFooter.component'
import InvoiceHeader from '../../components/InvoiceHeader/InvoiceHeader.component'
import RHSHeaders from '../../components/RHSHeaders/RHSHeaders.component'
import Price from '../../components/Price/Price.component'
import InvoiceOptions from '../../components/InvoiceOptions/InvoiceOptions.component'
export default function Payables({SearchedData, DataSet, setDataSet, itemList, setitemList, CurrentItem, setCurrentItem, setsearchField, setSearchMethod, DataSwitch, loadPayables, loadReceivables}) {
    return (
        <div className='ReceivablesPageContainer'>
            <InvoiceOptions SearchedData={SearchedData} DataSet={DataSet} setDataSet={setDataSet} CurrentItem={CurrentItem} setsearchField={setsearchField} setSearchMethod={setSearchMethod} loadPayables={loadPayables} loadReceivables={loadReceivables}/>
            <div className="invoice-page-container">
                <InvoiceCardList SearchedData={SearchedData} itemList={itemList} setitemList={setitemList} setCurrentItem={setCurrentItem}/>

            <div className='RHSContainer'>
                <div className="RightHandSide">
                <InvoiceHeader CurrentItem={CurrentItem}/>
                    
                    <div className="MiddlePart" id='MiddlePart'>
                        <RHSHeaders CurrentItem={CurrentItem}/>
                        <ItemList itemList={itemList}/>
                        

                        <Price CurrentItem={CurrentItem} DataSwitch={DataSwitch}/>
                    </div>
                    <InvoiceFooter CurrentItem={CurrentItem}/>
                </div>
            </div>
            </div>
        </div>
    )
}
