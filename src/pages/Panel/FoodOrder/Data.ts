import AcceptedImage from "../../../assets/accepted.png";
import OnCooking from "../../../assets/On-cooking.png";
import Delivered from "../../../assets/Delivered.png";


export const foodOrderData = [
    {
        backgroundColor: "#efecff",
        status: "Accepted",
        count: 300,
        percentage: "10%",
        color: "#5e38ff",
        image: AcceptedImage,
        altText: "Accepted image"
    },
    {
        backgroundColor: "#e6f6f4",
        status: "On Cooking",
        count: 300,
        percentage: "10%",
        color: "#73c3b7",
        image: OnCooking,
        altText: "On cooking image"
    },
    {
        backgroundColor: "#fff3ea",
        status: "Delivered",
        count: 300,
        percentage: "10%",
        color: "#fe802b",
        image: Delivered,
        altText: "Rejected"
    }
]

