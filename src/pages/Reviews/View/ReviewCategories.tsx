/* eslint-disable @typescript-eslint/no-explicit-any */
import "./ReviewCategories.css"; // Import the CSS file
import KitchenIcon from "../../../components/Icon/KitchenIcon";
import ServiceIcon from "../../../components/Icon/ServiceIcon";
import EnvironmentIcon from "../../../components/Icon/EnvironmentIcon";
import QualityIcon from "../../../components/Icon/QualityIcon";
import ClockIcon from "../../../components/Icon/ClockIcon";

export default function ReviewCategories({ rating }: any) {
    const reviewsCategory = [
        {
            reviewCategoryName: "Kitchen",
            rating: rating?.kitchen_rating,
            icon: <KitchenIcon />,
        },
        {
            reviewCategoryName: "Service",
            rating: rating?.service_rating,
            icon: <ServiceIcon />,
        },
        {
            reviewCategoryName: "Environment",
            rating: rating?.environment_rating,
            icon: <EnvironmentIcon />,
        },
        {
            reviewCategoryName: "Quality",
            rating: rating?.quality_price_rating,
            icon: <QualityIcon />,
        },
        {
            reviewCategoryName: "Waiting Time",
            rating: rating?.waiting_time_rating,
            icon: <ClockIcon />,
        },
    ];

    return (
        <>
            <h4>Categories</h4>
            <div className="review-categories">
                {reviewsCategory.map((review) => {
                    return (
                        <div key={review.reviewCategoryName} className="review-card">
                            <div className="card-title">
                                <div className="icon">{review.icon}</div>
                                <div className="category">
                                    <div className="item">
                                        <h4>{review.reviewCategoryName}</h4>
                                        <h4>{review.rating}/5</h4>
                                    </div>
                                    <div className="star">
                                        <span>{'★'.repeat(Math.round(review.rating))}</span>
                                        <span>{'☆'.repeat(5 - Math.round(review.rating))}</span>
                                    </div>

                                    <div>

                                    </div>
                                </div>

                            </div>


                        </div>
                    );
                })}
            </div>
        </>
    );
}
