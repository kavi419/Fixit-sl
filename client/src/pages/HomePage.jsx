import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarked, FaCheckCircle, FaTools, FaCamera, FaUpload, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

function HomePage() {
    const [resolvedCount, setResolvedCount] = useState(0);
    const [recentResolved, setRecentResolved] = useState([]);

    useEffect(() => {
        // Determine the base URL based on environment (development vs production)
        // Since we are running on localhost for now, we can hardcode the live one for this page as requested
        const fetchStats = async () => {
            try {
                const res = await axios.get('https://fixit-sl-backend.onrender.com/api/issues');
                const resolved = res.data.filter(issue => issue.status === 'Resolved');
                setResolvedCount(resolved.length);
                setRecentResolved(resolved.slice(0, 3)); // Get top 3 resolved
            } catch (err) {
                console.error("Failed to fetch stats", err);
                // Mock data if fetch fails
                setResolvedCount(128);
                setRecentResolved([
                    { _id: '1', title: 'Pothole on Main St', category: 'Pothole', createdAt: new Date() },
                    { _id: '2', title: 'Broken Street Light', category: 'Street Light', createdAt: new Date() },
                    { _id: '3', title: 'Blocked Drain', category: 'Drainage', createdAt: new Date() }
                ]);
            }
        };

        fetchStats();
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden">

            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px]"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp}>
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30 text-sm font-semibold mb-6">
                                🇱🇰 Building a Safer Sri Lanka
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 tracking-tight">
                            Revolutionizing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">Sri Lanka's Roads</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Report potholes, track repairs, and build a safer country together.
                            We connect your voice directly to local authorities.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/report"
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-full shadow-lg shadow-blue-900/40 transform hover:scale-105 transition-all text-lg flex items-center justify-center gap-2"
                            >
                                Start Reporting <FaArrowRight />
                            </Link>
                            <Link
                                to="/map"
                                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full border border-slate-700 transform hover:scale-105 transition-all text-lg flex items-center justify-center gap-2"
                            >
                                View Live Map <FaMapMarked />
                            </Link>
                        </motion.div>

                        {/* Live Stats Pill */}
                        <motion.div variants={fadeInUp} className="mt-16">
                            <div className="inline-flex items-center gap-4 px-6 py-3 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold`}>?</div>
                                    ))}
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-bold text-white leading-none">{resolvedCount}+</p>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest">Issues Fixed</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* How it Works Section */}
            <section className="py-20 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Making a difference is simpler than you think. Three steps to a better road.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="relative group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-2xl bg-blue-900/30 flex items-center justify-center text-blue-400 text-3xl mb-6 group-hover:scale-110 transition-transform">
                                <FaCamera />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">1. Snap a Photo</h3>
                            <p className="text-slate-400">See a pothole or broken street light? Take a clear photo and capture the location.</p>
                        </div>

                        <div className="relative group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-2xl bg-blue-900/30 flex items-center justify-center text-blue-400 text-3xl mb-6 group-hover:scale-110 transition-transform">
                                <FaUpload />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">2. Upload & Report</h3>
                            <p className="text-slate-400">Submit your report in seconds. Our AI categorizes the issue automatically.</p>
                        </div>

                        <div className="relative group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-900/30 flex items-center justify-center text-emerald-400 text-3xl mb-6 group-hover:scale-110 transition-transform">
                                <FaCheckCircle />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">3. We Fix It</h3>
                            <p className="text-slate-400">We coordinate with the RDA and local councils to get it fixed. You get notified!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RDA Collaboration */}
            <section className="py-20 border-y border-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/5"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Official Partnership</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6">Government Backed. <br />Comunity Driven.</h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                We don't just collect data. We collaborate directly with the <strong>Road Development Authority (RDA)</strong> and local municipal councils to ensure your voice is heard and action is taken.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-4">
                                    {/* Mock Logos */}
                                    <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center font-bold text-xs">RDA</div>
                                    <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center font-bold text-xs">CMC</div>
                                    <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center font-bold text-xs">UDA</div>
                                </div>
                                <span className="text-slate-500 text-sm">Trusted by 5+ Agencies</span>
                            </div>
                        </div>
                        <div className="flex-1 w-full relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 blur-3xl opacity-20 rounded-full"></div>
                            <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-3xl">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
                                        <FaTools />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Direct Integration</h4>
                                        <p className="text-slate-400 text-sm">Issues are piped directly to area engineers.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                                        <FaCheckCircle />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Verified Resolutions</h4>
                                        <p className="text-slate-400 text-sm">Every fix is verified with photo evidence.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white">Latest Updates</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Road Safety 101: Why Reporting Matters",
                                desc: "Small potholes can lead to big accidents. Here is why your report saves lives.",
                                tag: "Safety"
                            },
                            {
                                title: "The Future of Smart Infrastructure in SL",
                                desc: "How AI and IoT are transforming how we manage our cities.",
                                tag: "Technology"
                            },
                            {
                                title: "Community Power: How You Changed Your Village",
                                desc: "A case study on how one neighborhood fixed their entire road network.",
                                tag: "Community"
                            }
                        ].map((article, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="h-48 w-full bg-slate-800 rounded-2xl mb-4 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="text-xs font-bold text-white bg-blue-600 px-2 py-1 rounded-md">{article.tag}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{article.title}</h3>
                                <p className="text-slate-400 text-sm">{article.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-900 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <span className="text-sm">🇱🇰</span>
                        </div>
                        <span className="text-lg font-bold text-white">FixIt SL</span>
                    </div>
                    <p className="text-slate-600 text-sm">© 2026 FixIt SL. Built for a better tomorrow.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default HomePage;
