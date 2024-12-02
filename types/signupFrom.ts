import {ReactNode} from "react";
import {UploadFile} from "antd";

export interface RestaurantFormData {

    // Step 1 - Get Started
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    city: string;
    phone: string;
    password: string;
    confirmPassword: string;


    // Step 2 - Restaurant Profile
    restaurantName: string;
    restaurantEmail: string;
    restaurantWebsite: string;
    restaurantAddress: string;
    restaurantCity: string;
    zipCode: string;
    restaurantCountry: string;
    identifyAddress?: string;
    reservationPerDay: string;
    seatCapacity: string;
    averageBill: string;
    currency: string;
    cuisineType: string;
    restaurantProfile?: ReactNode;
    restaurantCover?: ReactNode;

    // Step 3 - Service Information
    openingRemark: string;
    restaurantServices: string;
    publicTransport?: string;
    parkingNotes?: string;
    enableFoodOrder: boolean;
    enableHallBooking: boolean;
    aboutRestaurant?: string;
    breakfastTimes: string[];
    lunchTimes: string[];
    dinnerTimes: string[];

    // Step 4 - Location
    latitude: string;
    longitude: string;

    // Step 5 - Gallery
    restaurantGallery: UploadFile[];

    // Step 6 - Agreement
    agreement: boolean;

}