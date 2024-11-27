import Service from "../../assets/logos/service.svg"

export default function ServiceIcon() {
    return (
        <>
            <div style={{backgroundColor: "#FFB200", borderRadius: "50%", display: "flex"}}>
                <img style={{width: "60px", padding :"10px"}} src={Service} alt="waiting time icon"/>
            </div>
        </>
    )
}