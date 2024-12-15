import React, { useState, useEffect } from 'react';

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Crypto News
                </h1>
                {loading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : articles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {articles.map((article, index) => (
                            <div
                                key={index}
                                className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                <img
                                    src={article.thumbnail}
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {article.description}
                                    </p>
                                    <p className="text-gray-500 text-xs mb-4">
                                        {new Date(article.date).toLocaleString()}
                                    </p>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 text-sm font-medium hover:underline"
                                    >
                                        Read More →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">
                        No news articles available.
                    </p>
                )}
            </div>
        </div>
    );
};

export default News;
