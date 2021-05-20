import './Price.component.css'
import {useEffect} from 'react'
export default function Price({CurrentItem, DataSwitch}) {

    useEffect(() => {
        return () => {}
    }, [DataSwitch])
    
    return (
        <div className="BottomPartContainer">
            <div className="TotalPriceSection">
                <div className="TotalAmountWord">
                    Total Due (Incl. Tax):
                </div>
                <div className={DataSwitch === 1? 'TotalAmountNumber':'TotalAmountNumberPayable'} id='TotalAmountNumber'>
                    ${CurrentItem.invoice_total_price}
                </div>
            </div>
        </div>
    )
}
