import React from 'react';

function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pt-24 pb-12 font-sans px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8">
                    <p className="text-lg text-emerald-400 font-semibold mb-2">Prototype Disclaimer</p>
                    <p className="leading-relaxed text-slate-400">
                        FixIt SL is a prototype application. By using this site, you acknowledge that it is a demonstration of software capabilities and <strong className="text-white">we are not responsible for actual road maintenance, repairs, or interactions with local authorities.</strong>
                    </p>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="leading-relaxed">
                            By accessing or using FixIt SL, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. User Conduct</h2>
                        <p className="leading-relaxed">
                            You agree not to use the service to post inappropriate, offensive, or false content. We reserve the right to remove any reported issues that violate these guidelines or appear to be spam.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Content Ownership</h2>
                        <p className="leading-relaxed">
                            You retain the rights to any photos you upload, but you grant FixIt SL a non-exclusive license to display them on the platform for demonstration purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                        <p className="leading-relaxed">
                            This project is provided "as is". The developer makes no warranties regarding the reliability or availability of the service.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default TermsPage;
