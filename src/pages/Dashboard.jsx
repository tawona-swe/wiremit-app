import React, { useState, useEffect } from 'react';

const Dashboard = ({ currentUser, fxRates, isLoading, onLogout, showMessage }) => {
    // Mock data for the ads carousel and transaction history
    // Mock data for the ads carousel and transaction history
    const mockAds = [
        { id: 1, text: "Send money with ease. Low fees, fast transfers.", imageUrl: "/img/mock-ad-1.jpg" },
        { id: 2, text: "Secure and reliable money transfers. Try it now!", imageUrl: "/img/mock-ad-2.jpg" },
        { id: 3, text: "Need to send cash? We've got you covered.", imageUrl: "/img/mock-ad-3.jpg" }
    ];

    const mockTransactions = [
        { id: 1, date: "2023-08-01", recipient: "John Smith", amountSent: 150.00, currency: "GBP", amountReceived: 111.00 },
        { id: 2, date: "2023-07-28", recipient: "Jane Doe", amountSent: 200.00, currency: "ZAR", amountReceived: 2840.00 },
        { id: 3, date: "2023-07-25", recipient: "John Smith", amountSent: 100.00, currency: "GBP", amountReceived: 74.00 },
        { id: 4, date: "2023-07-20", recipient: "Peter Jones", amountSent: 300.00, currency: "ZAR", amountReceived: 4260.00 },
        { id: 5, date: "2023-07-15", recipient: "Jane Doe", amountSent: 50.00, currency: "GBP", amountReceived: 37.00 },
        { id: 6, date: "2023-07-10", recipient: "John Smith", amountSent: 120.00, currency: "GBP", amountReceived: 88.80 },
        { id: 7, date: "2023-07-05", recipient: "Peter Jones", amountSent: 250.00, currency: "ZAR", amountReceived: 3550.00 },
        { id: 8, date: "2023-07-01", recipient: "John Smith", amountSent: 180.00, currency: "GBP", amountReceived: 133.20 },
        { id: 9, date: "2023-06-28", recipient: "Jane Doe", amountSent: 80.00, currency: "ZAR", amountReceived: 1136.00 },
        { id: 10, date: "2023-06-25", recipient: "Peter Jones", amountSent: 400.00, currency: "GBP", amountReceived: 296.00 },
        { id: 11, date: "2023-06-20", recipient: "John Smith", amountSent: 90.00, currency: "ZAR", amountReceived: 1278.00 },
        { id: 12, date: "2023-06-15", recipient: "Jane Doe", amountSent: 220.00, currency: "GBP", amountReceived: 162.80 },
        { id: 13, date: "2023-06-10", recipient: "John Smith", amountSent: 130.00, currency: "ZAR", amountReceived: 1846.00 },
        { id: 14, date: "2023-06-05", recipient: "Peter Jones", amountSent: 160.00, currency: "GBP", amountReceived: 118.40 },
        { id: 15, date: "2023-06-01", recipient: "Jane Doe", amountSent: 70.00, currency: "ZAR", amountReceived: 994.00 },
        { id: 16, date: "2023-05-28", recipient: "John Smith", amountSent: 190.00, currency: "GBP", amountReceived: 140.60 },
        { id: 17, date: "2023-05-25", recipient: "Peter Jones", amountSent: 240.00, currency: "GBP", amountReceived: 177.60 },
        { id: 18, date: "2023-05-20", recipient: "Jane Doe", amountSent: 350.00, currency: "ZAR", amountReceived: 4970.00 }
    ];

    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('GBP');
    const [recipientAmount, setRecipientAmount] = useState(0);
    const [adsIndex, setAdsIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const transactionsPerPage = 15;
    const totalPages = Math.ceil(mockTransactions.length / transactionsPerPage);
    const currentTransactions = mockTransactions.slice(
        (currentPage - 1) * transactionsPerPage,
        currentPage * transactionsPerPage
    );

    // Function to handle next/previous ad in carousel
    const nextAd = () => setAdsIndex((prevIndex) => (prevIndex + 1) % mockAds.length);
    const prevAd = () => setAdsIndex((prevIndex) => (prevIndex - 1 + mockAds.length) % mockAds.length);

    // useEffect to update recipient amount when amount or currency changes
    useEffect(() => {
        if (amount && fxRates) {
            const usdAmount = parseFloat(amount);
            const rate = fxRates[currency];
            const fee = (currency === 'GBP') ? 0.10 : 0.20;

            // Calculate the final amount after deducting the fee and converting
            const amountAfterFee = usdAmount * (1 - fee);
            const convertedAmount = amountAfterFee * rate;
            // Round UP the final amount as required
            setRecipientAmount(Math.ceil(convertedAmount * 100) / 100);
        } else {
            setRecipientAmount(0);
        }
    }, [amount, currency, fxRates]);

    // New useEffect to handle the automatic carousel functionality
    useEffect(() => {
        // Set an interval to advance the carousel every 5 seconds (5000 milliseconds)
        const carouselInterval = setInterval(() => {
            setAdsIndex((prevIndex) => (prevIndex + 1) % mockAds.length);
        }, 5000);

        // Cleanup function to clear the interval when the component unmounts or re-renders
        return () => clearInterval(carouselInterval);
    }, [mockAds.length]); // The dependency array ensures the effect runs when the number of ads changes

    return (
        <div className="min-h-screen bg-gray-100 p-4 font-sans flex flex-col">
            <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-lg mb-6">
                {/* Replaced local image path with a placeholder URL */}
                <img style={{width: '65px', height: '100%'}} src="/img/logo.png" alt="Logo" />
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Welcome, {currentUser.name}!</span>
                    <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition-colors">
                        Log out
                    </button>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
                {/* Send Money Section */}
                <section className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Money</h2>
                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading FX rates...</p>
                    ) : !fxRates ? (
                        <p className="text-center text-red-500">Failed to load FX rates. Please try again later.</p>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Amount to send (USD)</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="50"
                                        max="10000"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="e.g., 200"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Min: $50, Max: $10,000</p>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Recipient Country</label>
                                    <select
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="GBP">UK (GBP)</option>
                                        <option value="ZAR">South Africa (ZAR)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                                <p className="flex justify-between items-center text-gray-700 font-medium">
                                    <span>FX Rate</span>
                                    <span className="font-bold">1 USD = {fxRates[currency]} {currency}</span>
                                </p>
                                <p className="flex justify-between items-center text-gray-700 font-medium mt-2">
                                    <span>Transaction Fee</span>
                                    <span className="font-bold">{currency === 'GBP' ? '10%' : '20%'}</span>
                                </p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-md border-2 border-orange-200">
                                <p className="flex justify-between items-center text-xl font-bold text-orange-700">
                                    <span>Recipient Gets</span>
                                    <span>{recipientAmount.toFixed(2)} {currency}</span>
                                </p>
                            </div>
                            <button className="w-full p-2 bg-orange-500 text-white font-bold rounded-md shadow-md hover:bg-orange-700 transition-colors">
                                Send Money
                            </button>
                        </div>
                    )}
                </section>

                {/* Mock Ads Section */}
                <section className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ads</h2>
                    <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-inner">
                        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${adsIndex * 100}%)` }}>
                            {mockAds.map((ad) => (
                                <div key={ad.id} className="w-full flex-shrink-0 relative h-48 rounded-xl overflow-hidden">
                                    {/* Using a direct <img> tag for more reliable image display */}
                                    <img 
                                        src={ad.imageUrl} 
                                        alt={ad.text}
                                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-opacity-70 flex items-center justify-center p-8">
                                        <p className="text-lg font-bold text-white text-center">{ad.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={prevAd} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-orange-500 bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={nextAd} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-orange-500 bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* Mock Transaction History Section */}
                <section className="lg:col-span-3 bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Sent (USD)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Received</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentTransactions.map((tx) => (
                                    <tr key={tx.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.recipient}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tx.amountSent.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {tx.amountReceived.toFixed(2)} {tx.currency}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination controls */}
                    <div className="flex justify-center mt-6">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`mx-1 px-4 py-2 rounded-md font-semibold ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </section>
            </main>
            {/* Footer Section */}
            <footer className="mt-6">
                <div className="bg-white p-4 rounded-xl shadow-lg text-center text-gray-500 text-sm">
                    {/* Corrected `Date.year()` to `new Date().getFullYear()` */}
                    <p>Developed by <a href='https://tawona-swe.github.io'>Tawona Rwatida</a> ({new Date().getFullYear()})</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
