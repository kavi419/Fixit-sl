import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaCamera, FaMapMarkerAlt, FaSpinner, FaMap } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Pothole',
    latitude: null,
    longitude: null,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const getLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast.success('Location fetched!');
          setLocationLoading(false);
        },
        (error) => {
          console.error(error);
          toast.error('Unable to fetch location. Please enable location services.');
          setLocationLoading(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !formData.latitude) {
      return toast.error('Please add an image and location.');
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('latitude', formData.latitude);
    data.append('longitude', formData.longitude);
    data.append('image', image);

    try {
      setLoading(true);
      await axios.post('https://fixit-sl-backend.onrender.com/api/issues/report', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Issue reported successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'Pothole',
        latitude: null,
        longitude: null,
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to report issue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-700">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Report an Issue</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-700 to-amber-400 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Image Upload */}
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300
                ${preview ? 'border-amber-400/50' : 'border-slate-600 hover:border-blue-500 hover:bg-slate-700/30'}`}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl opacity-80" />
              ) : (
                <div className="flex flex-col items-center text-slate-400 group-hover:text-blue-400">
                  <FaCamera className="text-4xl mb-2" />
                  <span className="font-semibold">Tap to Upload Photo</span>
                </div>
              )}
            </label>
          </div>

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Issue Title (e.g., Deep Pothole)"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full bg-slate-700/50 text-slate-100 placeholder-slate-400 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500/50"
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full bg-slate-700/50 text-slate-100 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer border border-transparent focus:border-blue-500/50"
          >
            <option value="Pothole">Pothole</option>
            <option value="Drainage">Drainage Issue</option>
            <option value="Street Light">Street Light</option>
            <option value="Garbage">Garbage</option>
            <option value="Other">Other</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe the issue..."
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="3"
            className="w-full bg-slate-700/50 text-slate-100 placeholder-slate-400 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:border-blue-500/50 resize-none"
          ></textarea>

          {/* Location */}
          <button
            type="button"
            onClick={getLocation}
            disabled={locationLoading}
            className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl border transition-all duration-300
              ${formData.latitude
                ? 'bg-green-600/20 border-green-500/50 text-green-400'
                : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'}`}
          >
            {locationLoading ? (
              <FaSpinner className="animate-spin" />
            ) : formData.latitude ? (
              <>
                <FaMapMarkerAlt /> <span>Location Secured</span>
              </>
            ) : (
              <>
                <FaMapMarkerAlt /> <span>Get Current Location</span>
              </>
            )}
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg shadow-blue-900/50 flex items-center justify-center transform hover:scale-[1.02]"
          >
            {loading ? <FaSpinner className="animate-spin text-xl" /> : 'SUBMIT REPORT'}
          </button>

          {/* Map Button */}
          <button
            type="button"
            onClick={() => navigate('/map')}
            className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3 rounded-full transition-all duration-300 border border-slate-600 flex items-center justify-center gap-2 mt-4"
          >
            <FaMap /> View Live Map 🗺️
          </button>


          {/* Admin Button */}
          <div className="mt-6 pt-6 border-t border-slate-700 text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-slate-500 hover:text-amber-500 text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              🔒 Admin Portal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Home;
