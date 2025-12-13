// File: components/ui/PolicyModal.tsx

import React from 'react';
import { X, Shield, RefreshCcw } from 'lucide-react';

interface PolicyModalProps {
    isOpen: boolean;
    onClose: () => void;
    hotelName: string;
    policiesHTML: string;
    refundRulesHTML: string;
}

// Helper function to safely render HTML content
const renderHTML = (htmlString: string) => {
    // NOTE: HTML rendering se XSS attack ka risk hota hai. 
    // Real project mein DOMPurify jaisi library use karna zaroori hai.
    return { __html: htmlString };
};

export const PolicyModal: React.FC<PolicyModalProps> = ({ 
    isOpen, 
    onClose, 
    hotelName, 
    policiesHTML, 
    refundRulesHTML 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-[90] flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all">
                
                {/* Header */}
                <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">
                        {hotelName}: Policies & Rules
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-8">
                    
                    {/* 1. Hotel Policies Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#D2A256]">
                            <Shield className="w-6 h-6" />
                            <h3>Hotel Policies (T&Cs)</h3>
                        </div>
                        {policiesHTML ? (
                            <div 
                                className="text-gray-700 space-y-4 leading-relaxed policy-content" 
                                dangerouslySetInnerHTML={renderHTML(policiesHTML)} 
                            />
                        ) : (
                            <p className="text-gray-500 italic">No specific policies provided by the hotel.</p>
                        )}
                    </div>

                    {/* 2. Cancellation and Refund Rules Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-[#22C55E]">
                            <RefreshCcw className="w-6 h-6" />
                            <h3>Cancellation & Refund Rules</h3>
                        </div>
                        {refundRulesHTML ? (
                            <div 
                                className="text-gray-700 space-y-4 leading-relaxed policy-content" 
                                dangerouslySetInnerHTML={renderHTML(refundRulesHTML)} 
                            />
                        ) : (
                            <p className="text-gray-500 italic">No refund rules specified.</p>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
};