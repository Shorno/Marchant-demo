/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image } from 'antd';
import './review.css';
import { ChangeEvent, useState } from 'react';
import { useRepllyReviewsMutation } from '../../../redux/api/Review/review';

const ReviewComponent = ({ reviews, refetch }: any) => {
    const [replyReview, { isLoading }] = useRepllyReviewsMutation();
    const review = reviews?.results;
    const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
    const [replies, setReplies] = useState<{ [key: number]: string }>({});

    // Handle reply input change
    const handleReplyChange = (e: ChangeEvent<HTMLTextAreaElement>, reviewId: number) => {
        setReplies({ ...replies, [reviewId]: e.target.value });
    };

    // Handle reply submit
    const handleReplySubmit = async (reviewId: number) => {
        const replyData = {
            id: reviewId,
            reply: replies[reviewId],
            replied_at: new Date().toISOString(),
        };


        try {
            const res = await replyReview(replyData).unwrap();
            refetch();
            console.log('Reply submitted successfully:', res);
            setActiveReplyId(null);
        } catch (error) {
            console.error("Error submitting reply:", error);
        }
    };

    return (
        <div className="review-container">
            {review?.map((review: any, index: number) => (
                <div key={index} className="review-item">
                    {/* Main Post */}
                    <div className="main-post">
                        <div className="review-header">
                            <div className="post-header">
                                <Image className='profile' width={40} height={40} src={review?.client_avatar || "https://via.placeholder.com/60"} alt="Client Avatar" />
                                <div className="post-info">
                                    <h4 className="author">{review?.name}</h4>
                                    <p className="date">
                                        {new Date(review?.reviewed_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            {review.reply === null && (
                                <div>
                                    <button
                                        className="reply-button"
                                        onClick={() => setActiveReplyId(review.id)}
                                    >
                                        Reply
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className='client-comment'>
                            <p className="post-content">{review?.comment}</p>

                            {review?.images && review?.images?.length > 0 && (
                                <div className="image-gallery">
                                    {review?.images?.map((image: string, imgIndex: number) => (
                                        <Image className='review-image' key={imgIndex} width={40} height={40} src={image} alt="review_image" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reply Section */}
                    <div>
                        {activeReplyId === review.id && (
                            <div className="reply-section">
                                <textarea
                                    className="reply-textbox"
                                    placeholder="Type your reply..."
                                    value={replies[review.id] || ''}
                                    onChange={(e) => handleReplyChange(e, review.id)}
                                />
                                <button
                                    className="submit-reply-button"
                                    onClick={() => handleReplySubmit(review.id)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting...' : 'Submit Reply'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Reply Post */}
                    {review?.reply && (
                        <div className="reply-post">
                            <div className="post-header">
                                <Image className='profile' width={40} height={40} src={review?.replier_avatar || "https://via.placeholder.com/60"} alt="Client Avatar" />
                                <div className="post-info">
                                    <h4 className="author">
                                        {review?.replier_name || "Restaurant"}
                                    </h4>
                                    <p className="date">
                                        {review?.replied_at
                                            ? new Date(review?.replied_at).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                            <div className='restaurant-reply'>
                                <p className="post-content">{review?.reply}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewComponent;
