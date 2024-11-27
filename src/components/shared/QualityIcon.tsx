import qualitySVG from "../../assets/logos/checkmark.svg"

export default function QualityIcon() {
    return (
        <>
            <div style={{backgroundColor: "#FFB200", borderRadius: "50%", display: "flex"}}>
                <img style={{width: "60px", padding :"10px"}} src={qualitySVG} alt="waiting time icon"/>
            </div>
        </>
    )
}