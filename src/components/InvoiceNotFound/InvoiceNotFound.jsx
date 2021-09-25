import './InvoiceNotFound.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function InvoiceNotFound() {

    return (
        <div className="PGWNotFoundCard">
            <div className="PGWNotFoundLogo">
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="PGWNotFoundTitle">
                Invoice Not Found!
            </div>
            <div className="PGWNotFoundSubtitle">
                Please check the URL!
            </div>
        </div>
    )
}
