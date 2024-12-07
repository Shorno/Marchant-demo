import kitchenWhiteIcon from "../../assets/logos/kitchen.svg"

export default function KitchenIcon() {
    return (
        <>
            <div style={{backgroundColor: "#FFB200", borderRadius: "50%", display: "flex"}}>
                <img style={{width: "60px", padding :"12px"}} src={kitchenWhiteIcon} alt="waiting time icon"/>
            </div>
        </>
    )
}