import React from 'react';

function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pt-24 pb-12 font-sans px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

                <div className="space-y-8">
                    <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-blue-400 mb-4">1. Project Nature</h2>
                        <p className="leading-relaxed">
                            FixIt SL is a <strong>Developer Portfolio Project</strong> created for educational and demonstration purposes. It is not an official government platform or a commercial service.
                        </p>
                    </section>

                    <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-blue-400 mb-4">2. Data Collection</h2>
                        <p className="leading-relaxed mb-4">
                            We collect data submitted voluntarily through our reporting forms, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Images of infrastructure issues.</li>
                            <li>Geolocation coordinates of the issue.</li>
                            <li>Descriptions and categories of reported problems.</li>
                        </ul>
                    </section>

                    <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-blue-400 mb-4">3. Data Usage</h2>
                        <p className="leading-relaxed">
                            The data collected is used solely to demonstrate the functionality of this web application (e.g., displaying markers on a map, showing statistics). No data is shared with third parties or used for commercial gain.
                        </p>
                    </section>

                    <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-blue-400 mb-4">4. Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have questions about this project, please contact the developer via the <a href="/contact" className="text-blue-400 hover:underline">Contact Page</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPage;
