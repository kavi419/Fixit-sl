import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaCode, FaLaptopCode, FaServer } from 'react-icons/fa';

function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
                        Meet the Developer
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Building solutions for a better Sri Lanka, one line of code at a time.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        {/* Profile Image / Initials */}
                        <div className="shrink-0 relative">
                            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-700 flex items-center justify-center shadow-xl">
                                <span className="text-5xl font-bold text-slate-500">K</span>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center text-slate-900 text-xs font-bold" title="Available for work">
                                <FaCode />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-white mb-2">Kavindu</h2>
                            <p className="text-blue-400 font-medium mb-6 flex items-center justify-center md:justify-start gap-2">
                                <FaLaptopCode /> Full Stack Developer | IT Student at SLIIT
                            </p>

                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Passionate about using technology to solve real-world problems in Sri Lanka. I specialize in the <strong className="text-slate-200">MERN Stack</strong> and am currently exploring DevOps and Cloud Engineering to build scalable, resilient applications.
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <a
                                    href="https://github.com/kavi419"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-all hover:scale-105"
                                >
                                    <FaGithub className="text-xl" />
                                    <span>GitHub Profile</span>
                                </a>
                                <a
                                    href="mailto:kavindu@example.com"
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl shadow-lg shadow-blue-900/30 transition-all hover:scale-105"
                                >
                                    <FaEnvelope className="text-xl" />
                                    <span>Contact Me</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tech Stack Mini Section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-800/50">
                        <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Frontend</h3>
                        <p className="text-slate-300 font-semibold">React + Vite</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-800/50">
                        <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Backend</h3>
                        <p className="text-slate-300 font-semibold">Node + Express</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-800/50">
                        <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Database</h3>
                        <p className="text-slate-300 font-semibold">MongoDB Atlas</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-800/50">
                        <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">Deployment</h3>
                        <p className="text-slate-300 font-semibold">Render Cloud</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ContactPage;
