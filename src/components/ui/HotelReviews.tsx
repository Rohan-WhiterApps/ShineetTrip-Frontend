import React, { useState, useEffect, useCallback } from 'react';
import { Star, Sparkles, CheckCircle, Key, MessageSquare, Loader2 } from 'lucide-react';
import ReviewFormModal from './ReviewFormModal'; 
import { format } from 'date-fns'; 

interface Review {
    id: number;
    reviewerName: string;
    reviewerAvatar: string;
    overallRating: number; 
    comment: string;
    postedOn: string;
    createdAt: string; 
    tags: string[];
    // Backend se aa raha 'hotelId' field yahaan zaroori hai filtering ke liye
    hotelId?: string | number; 
}

interface HotelReviewsProps {
    hotelId: string;
}

const HotelReviews: React.FC<HotelReviewsProps> = ({ hotelId }) => {
    // --- States ---
    const [averageRatings, setAverageRatings] = useState<any>(null);
    const [reviews, setReviews] = useState<Review[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const token = localStorage.getItem('shineetrip_token');

    // --- Fetching Functions ---
    const refreshReviews = useCallback(async () => {
        if (!hotelId || !token) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        
        try {
            // console.log(`Fetching reviews for Hotel ID: ${hotelId}`); // Debugging check

            // 1. Fetch Summary
            const summaryUrl = `http://46.62.160.188:3000/ratings/average/summary?hotelId=${hotelId}`;
            const summaryResponse = await fetch(summaryUrl, { headers: { 'Authorization': `Bearer ${token}` } });
            if (summaryResponse.ok) {
                const data = await summaryResponse.json();
                setAverageRatings(data); 
            }

            // 2. Fetch Individual Reviews 
            const reviewsUrl = `http://46.62.160.188:3000/ratings?hotelId=${hotelId}&limit=50`; // Limit increased for testing/filter
            const reviewsResponse = await fetch(reviewsUrl, { headers: { 'Authorization': `Bearer ${token}` } });
            
            if (reviewsResponse.ok) {
                const data: Review[] = await reviewsResponse.json();

                // ✅ FINAL FIX: Client-side filtering to ensure only relevant reviews are shown.
                // This is needed because the backend API is returning all reviews instead of filtering by hotelId.
                const filteredReviews = Array.isArray(data) 
                    ? data.filter(review => String(review.hotelId) === hotelId) 
                    : [];

                setReviews(filteredReviews.slice(0, 4)); // Only show top 4 reviews
            }

        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Failed to load ratings or reviews.');
        } finally {
            setLoading(false);
        }
    }, [hotelId, token]);

    // Main useEffect for fetching reviews
    useEffect(() => {
        refreshReviews(); 
    }, [refreshReviews]);


    // --- Helper functions for UI ---
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < fullStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
            );
        }
        return stars;
    };
    
    const renderAverageRating = () => {
        if (reviews.length === 0) return 'N/A';
        // Review.overallRating use kiya
        const total = reviews.reduce((sum: number, review) => sum + (review.overallRating || 0), 0); 
        return (total / reviews.length).toFixed(1);
    };
    
    // Date formatter
    const formatReviewDate = (dateString: string) => {
        if (!dateString) return 'Just now';
        try {
            return format(new Date(dateString), 'MMM dd, yyyy');
        } catch {
            return dateString; 
        }
    }


    // --- Conditional Render ---
    if (!token) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
                Please log in to view detailed ratings and reviews.
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" /> Loading Reviews...
            </div>
        );
    }
    
    if (error) {
        return <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">Error: {error}</div>;
    }
    
    const calculatedAvgRating = parseFloat(renderAverageRating());
    const totalReviewCount = averageRatings?.totalReviews || reviews.length;

    // --- UI Rendering ---
    return (
        <>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-baseline gap-4">
                    {/* Overall Score Dynamic */}
                    <h2 className="text-6xl font-bold text-gray-900">
                        {calculatedAvgRating || 'N/A'}
                    </h2>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {calculatedAvgRating >= 4.5 ? 'Guest Favorite' : 'Ratings Summary'}
                        </h3>
                        <p className="text-gray-500 text-sm">
                            {totalReviewCount} Reviews based on their rating & reviews.
                        </p>
                    </div>
                </div>

                {/* Submit Review Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#D2A256] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#c2934b] transition-colors shadow-md"
                >
                    <MessageSquare className="w-4 h-4" />
                    Submit Your Review
                </button>
                
                {/* 🛑 Regression Fix: Missing close tag fixed by wrapping in a fragment */}
                
            </div>
        
            {/* Rating Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-8 border-t border-b border-gray-200 py-8">
                {/* Overall Rating Breakdown - (Simplified) */}
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-4">Overall Rating</h4>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                            <span className="text-xs text-gray-600 w-3">{rating}</span>
                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-800 rounded-full" style={{ width: (averageRatings?.ratingBreakdown?.[rating] / averageRatings?.totalReviews) * 100 || 0 + '%' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
        
                {/* Categorical Scores - Accessing data fields directly */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cleanliness</h4>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{averageRatings?.cleanliness?.toFixed(1) || 'N/A'}</div>
                    <Sparkles className="w-8 h-8 text-gray-800" />
                </div>
        
                <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Accuracy</h4>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{averageRatings?.accuracy?.toFixed(1) || 'N/A'}</div>
                    <CheckCircle className="w-8 h-8 text-gray-800" />
                </div>
        
                <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Check-In</h4>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{averageRatings?.checkIn?.toFixed(1) || 'N/A'}</div>
                    <Key className="w-8 h-8 text-gray-800" />
                </div>
            </div>
        
            {/* Tags (Dummy) */}
            <div className="flex flex-wrap gap-4 mb-8">
                 {['Clean', 'Great Hospitality', 'Fast Response'].map((tag, idx) => ( // ✅ Using real tags for consistency
                    <div key={idx} className="bg-gray-100 px-6 py-3 rounded-full text-gray-700 font-medium text-sm">
                        {tag}
                    </div>
                ))}
            </div>
        
            {/* Reviews Grid Dynamic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews?.map((reviewItem, idx) => ( // reviewItem is now Review type
                    <div key={reviewItem.id || idx} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                            {/* User details - Mapped from API fields */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src={reviewItem.reviewerAvatar || "https://i.pravatar.cc/150?img=32"} alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{reviewItem.reviewerName || 'Guest User'}</div>
                                    {/* Date - Mapped from createdAt/postedOn */}
                                    <div className="text-xs text-gray-500">{formatReviewDate(reviewItem.createdAt)}</div>
                                </div>
                            </div>
                            {/* Stars Dynamic - Using overallRating */}
                            <div className="flex gap-1">
                                {renderStars(reviewItem.overallRating)}
                            </div>
                        </div>
                        {/* Review Text Dynamic */}
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {reviewItem.comment || 'No comment provided.'}
                        </p>
                        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50">
                            Show more
                        </button>
                    </div>
                ))}
                {reviews?.length === 0 && (
                    <div className="md:col-span-2 text-center text-gray-500 p-4">
                        Be the first to leave a review for this hotel!
                    </div>
                )}
            </div>
            
            <div className="mt-8 text-center">
                <button className="bg-white border border-gray-200 px-8 py-3 rounded-lg font-semibold text-gray-900 hover:bg-gray-50">
                    Show all {totalReviewCount} reviews
                </button>
            </div>
        </div>
        
        {/* Review Form Modal Rendering (Outside main div) */}
        <ReviewFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            hotelId={hotelId}
            onReviewPosted={refreshReviews} 
        />
      </>
    );
};

export default HotelReviews;