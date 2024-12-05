import environmentSVG from "../../assets/logos/environment.svg"

export default function EnvironmentIcon() {
    return (
        <>
            <div style={{backgroundColor: "#FFB200", borderRadius: "50%", display: "flex"}}>
                <img style={{width: "60px", padding :"10px"}} src={environmentSVG} alt="waiting time icon"/>
            </div>
        </>
    )
}