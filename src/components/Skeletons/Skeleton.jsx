import './Skeleton.css'

export default function Skeleton({type}) {
    const classes = `skeleton ${type}`
    return (
        <>
            { type==='Card' && 
                <div className={classes}>
                    <CardHeader/>
                    <CardAmount/>
                    <CardDue/>
                    <CardName/>
                </div>}
            { type ==='PaymentMethodCardSkeleton' &&
                <div className={classes}>

                </div>

            }
        </>
    )
}


export function CardHeader() {
    return (
        <div className='CardHeader'>
            
        </div>
    )
}


export function CardAmount() {
    return (
        <div className='CardAmount'>
            
        </div>
    )
}

export function CardDue() {
    return (
        <div className='CardDue'>
            
        </div>
    )
}


export function CardName() {
    return (
        <div className='CardName'>
            
        </div>
    )
}




