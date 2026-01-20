import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssues = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const res = await axios.get('https://fixit-sl-backend.onrender.com/api/issues', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIssues(res.data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to load issues');
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, [navigate]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `https://fixit-sl-backend.onrender.com/api/issues/${id}/status`,
                { status: newStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // Update local state
            setIssues(issues.map(issue =>
                issue._id === id ? { ...issue, status: newStatus } : issue
            ));
            toast.success(`Status updated to ${newStatus}`);
        } catch (err) {
            console.error(err);
            toast.error('Failed to update status');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        toast.success('Logged out');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'In Progress': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'Resolved': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            default: return 'bg-slate-700 text-slate-300';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
            {/* Header */}
            <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-amber-500 flex items-center gap-2">
                        <span>🛡️</span> Admin Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Reported Issues</h2>
                    <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-sm border border-slate-700">
                        Total: {issues.length}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {issues.map((issue) => (
                        <div
                            key={issue._id}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Image */}
                                <div className="w-full md:w-48 h-48 md:h-auto shrink-0 bg-slate-800 rounded-lg overflow-hidden">
                                    <img
                                        src={issue.imageUrl || 'https://via.placeholder.com/300?text=No+Image'}
                                        alt={issue.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                                            <div>
                                                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-md bg-blue-900/30 text-blue-400 border border-blue-900/50 mb-2">
                                                    {issue.category}
                                                </span>
                                                <h3 className="text-xl font-bold text-white mb-1">{issue.title}</h3>
                                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{issue.description}</p>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span>📅 {new Date(issue.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 mt-2">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-slate-400">Status:</span>
                                                <select
                                                    value={issue.status}
                                                    onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                                                    className={`text-sm font-medium px-3 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900 cursor-pointer transition-colors ${getStatusColor(issue.status)} bg-opacity-10 border-opacity-20`}
                                                    style={{ backgroundColor: 'transparent' }}
                                                >
                                                    <option className="bg-slate-800 text-slate-200" value="Open">Open</option>
                                                    <option className="bg-slate-800 text-slate-200" value="In Progress">In Progress</option>
                                                    <option className="bg-slate-800 text-slate-200" value="Resolved">Resolved</option>
                                                </select>
                                            </div>

                                            {issue.status !== 'Resolved' && (
                                                <button
                                                    onClick={() => handleStatusChange(issue._id, 'Resolved')}
                                                    className="text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 px-3 py-1 rounded-md transition-colors w-fit"
                                                >
                                                    ✅ Mark as Resolved
                                                </button>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => navigate('/map', { state: { center: [issue.latitude, issue.longitude], id: issue._id } })}
                                            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            📍 View Location
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {issues.length === 0 && (
                        <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
                            <p className="text-slate-500">No issues reported yet.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
