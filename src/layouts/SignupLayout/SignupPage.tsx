import {useState} from "react";
import GetStarted from "./GetStarted.tsx";
import SignupLayout from "./SignupLayout.tsx";
import RestaurantProfile from "./RestaurantProfile.tsx";
import ProvideService from "./ProvideService.tsx";
import Location from "./Location.tsx";
import Gallery from "./Gallery.tsx";
import Agreement from "./Aggerement.tsx";
import "../../pages/Registration/signup.css"
import {useAppSelector} from "../../hooks/useAppSelector.ts";


export const SignupPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const signUpFromData = useAppSelector(state => state.signupFrom)
    console.log("signUpFromData", signUpFromData)


    const handleNext = async () => {
        setCurrentStep(prev => prev + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(prev => prev - 1);
    };

    const renderStep = () => {
        if (currentStep === 0) {
            return <GetStarted onNext={handleNext}/>;
        }

        return (
            <SignupLayout currentStep={currentStep}>
                {currentStep === 1 && (
                    <RestaurantProfile onNext={handleNext} onPrevious={handlePrevious}/>
                )}
                {currentStep === 2 && (
                    <ProvideService onNext={handleNext} onPrevious={handlePrevious}/>
                )}
                {currentStep === 3 && (
                    <Location onNext={handleNext} onPrevious={handlePrevious}/>
                )}
                {currentStep === 4 && (
                    <Gallery onNext={handleNext} onPrevious={handlePrevious}/>
                )}
                {currentStep === 5 && (
                    <Agreement onNext={handleNext} onPrevious={handlePrevious}/>
                )}
            </SignupLayout>
        );
    };


    return renderStep()
};