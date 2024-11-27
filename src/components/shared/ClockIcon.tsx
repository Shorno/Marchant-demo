import clockSVG from "../../assets/logos/clock.svg"

export default function ClockIcon() {
    return (
        <>
            <div style={{backgroundColor: "#FFB200", borderRadius: "50%", display: "flex"}}>
                <img style={{width: "60px", padding :"10px"}} src={clockSVG} alt="waiting time icon"/>
            </div>
        </>
    )
}