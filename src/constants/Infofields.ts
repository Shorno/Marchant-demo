const InfoFields = [
    { label: "Restaurant Name", name: "title", type: "input", required: true },
    { label: "Email", name: "email", type: "input", required: true },
    { label: "Address", name: "restaurantAddress", type: "input", required: true },
    { label: "City", name: "city", type: "select", options: ["City A", "City B"], required: true },
    { label: "Country", name: "country", type: "select", required: true },
    { label: "Zip Code", name: "zipcode", type: "input" },
];

export default InfoFields;
