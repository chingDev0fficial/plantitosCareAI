import React, { useState, useEffect } from 'react';
import { Upload, Users, BotMessageSquare, Leaf, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

// Main Welcome Component
export default function Welcome() {
    const [analysisLoading, setAnalysisLoading] = useState(false);
    const [result, setResult] = useState(null);

    // Navbar Component
    const Navbar = () => {
        const scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        return (
            <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">PlantitosCare AI</h1>
                                <p className="text-xs text-gray-500">Plant Disease Recognition</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    };

    // Image Upload Component
    const ImageUpload = () => {
        const [selectedImage, setSelectedImage] = useState(null);
        const [dragActive, setDragActive] = useState(false);
        const [uploading, setUploading] = useState(false);

        const handleDrag = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.type === 'dragenter' || e.type === 'dragover') {
                setDragActive(true);
            } else if (e.type === 'dragleave') {
                setDragActive(false);
            }
        };

        const handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFile(e.dataTransfer.files[0]);
            }
        };

        const handleChange = (e) => {
            e.preventDefault();
            if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
            }
        };

        const handleFile = (file) => {
            if (file.type.startsWith('image/')) {
                setUploading(true);
                // Simulate upload delay
                setTimeout(() => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setSelectedImage({
                            file: file,
                            preview: e.target.result,
                            name: file.name,
                            size: file.size
                        });
                        setUploading(false);
                    };
                    reader.readAsDataURL(file);
                }, 1000);
            }
        };

        const formatFileSize = (bytes) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        const resetUpload = () => {
            setSelectedImage(null);
        };


        useEffect(() => {
            if (result !== null) {
                localStorage.setItem("myData", JSON.stringify(result));
                setResult(null);
            }
        }, [result]);

        const handleAnalyze = async () => {
            if (!selectedImage) {
                alert("Please select an image first.");
                return;
            }

            const formData = new FormData();
            formData.append("image", selectedImage.file);

            try {
                setAnalysisLoading(true);
                const response = await fetch("/analyze", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || ""
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setResult(data.result);
            } catch (error) {
                console.error("Error analyzing image:", error);
                setAnalysisLoading(false);
            } finally {
                setAnalysisLoading(false);
                window.location.href = '/result';
            }
        };

        return (
            <div className="w-full max-w-2xl mx-auto">
                <div
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                        dragActive
                            ? 'border-green-500 bg-green-50 scale-105'
                            : selectedImage
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
                            <p className="text-lg text-gray-700 font-medium">Processing image...</p>
                            <p className="text-sm text-gray-500">Please wait while we process your plant image</p>
                        </div>
                    ) : selectedImage ? (
                        <div className="flex flex-col items-center space-y-6">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                                <div>
                                    <p className="text-xl font-bold text-gray-900">Upload successful!</p>
                                    <p className="text-sm text-gray-500">Ready for disease analysis</p>
                                </div>
                            </div>

                            <img
                                src={selectedImage.preview}
                                alt="Uploaded plant"
                                className="max-w-sm max-h-64 rounded-xl shadow-lg border-4 border-white"
                            />

                            <div className="bg-white rounded-lg p-4 shadow-sm border">
                                <p className="font-semibold text-gray-900 mb-1">{selectedImage.name}</p>
                                <p className="text-sm text-gray-500">{formatFileSize(selectedImage.size)}</p>
                            </div>

                            <div className="flex space-x-3 relative z-10">
                                <button
                                    onClick={resetUpload}
                                    className="px-6 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Upload Another
                                </button>
                                <button
                                    onClick={handleAnalyze}
                                    className="px-6 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Analyze Plant
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <Upload className="w-10 h-10 text-green-600" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-gray-900">Upload Plant Image</h3>
                                <p className="text-gray-600 max-w-md">
                                    Drop your plant image here or click to browse. Our AI will analyze it for diseases and provide recommendations.
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <p className="text-sm text-green-800 font-medium">Supported formats:</p>
                                <p className="text-sm text-green-700">JPG, PNG, GIF • Max size: 10MB</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Hero Section Component
    const HeroSection = () => {
        return (
            <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-12 p-[10px]">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                                Smart Plant
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                                    {' '}Disease Detection
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                Upload a photo of your plant and get instant AI-powered disease diagnosis with personalized treatment recommendations
                            </p>
                        </div>
                        <ImageUpload />
                    </div>
                </div>
            </section>
        );
    };

    // About Section Component
    const AboutSection = () => {
        return (
            <section id="about" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-6 mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">About Me</h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            I'm an individual developer taking on the challenge set by GroupXS company. This project is my way of combining agricultural science, AI research, and plant care into a single innovative solution.
                        </p>
                    </div>

                    {/* Personal Profile Section */}
                    <div className="max-w-4xl mx-auto mb-20">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12 shadow-lg border">
                            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
                                {/* Profile Image */}
                                <div className="flex-shrink-0">
                                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-white">
                                        <img
                                            src="/images/profile.jpg"
                                            alt="Profile picture"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Profile Info */}
                                <div className="flex-1 text-center md:text-left space-y-6">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Prince Carl S. Ajoc</h3>
                                        <p className="text-xl text-green-600 font-semibold">Founder & Lead Developer</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                            <p className="text-gray-700 leading-relaxed">
                                                <span className="font-semibold">Education:</span> Computer Science student with a specialization in machine learning. I love exploring and understanding AI models.
                                            </p>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                            <p className="text-gray-700 leading-relaxed">
                                                <span className="font-semibold">Experience:</span> Recently started developing web application systems through academic projects at another school, with a growing interest in AI and its applications.
                                            </p>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                            <p className="text-gray-700 leading-relaxed">
                                                <span className="font-semibold">Mission:</span> Combining technology with agriculture to help farmers and gardeners protect their crops and plants
                                            </p>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                            <p className="text-gray-700 leading-relaxed">
                                                <span className="font-semibold">Vision:</span> Making plant disease detection accessible to everyone, from home gardeners to large-scale farmers
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-lg text-gray-600 italic">
                                            "Technology has the power to transform agriculture. My goal is to make plant disease detection accessible to everyone, from home gardeners to large-scale farmers."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center space-y-6 group">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Leaf className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Detection</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our AI model is trained on a dataset of 38 plant disease classes, enabling it to detect and identify plant diseases with promising accuracy.
                                </p>
                            </div>
                        </div>

                        <div className="text-center space-y-6 group">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <BotMessageSquare className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Gemini AI Integration</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    I integrated the Gemini AI API to generate the possible causes of plant diseases and provide recommendations.
                                </p>
                            </div>
                        </div>

                        <div className="text-center space-y-6 group">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Promising Results</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our AI model, trained on 38 plant disease classes, demonstrates encouraging accuracy in detecting and classifying plant diseases. By integrating Gemini AI, the system also generates possible causes and tailored recommendations.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-center shadow-2xl">
                        <h3 className="text-3xl font-bold text-white mb-4">Ready to protect your plants?</h3>
                        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied users who trust our AI technology to keep their plants healthy and thriving.
                        </p>
                        <button
                            onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                        >
                            Get Started Now
                        </button>
                    </div>
                </div>
            </section>
        );
    };

    // Footer Component
    const Footer = () => {
        return (
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <Leaf className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">PlantitosCare AI</h3>
                                    <p className="text-sm text-gray-400">Pant Disease Recognition</p>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Empowering gardeners and farmers worldwide with AI-powered plant disease detection and expert care recommendations.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-bold">Quick Links</h4>
                            <div className="space-y-3">
                                <button
                                    onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
                                    className="block text-gray-400 hover:text-white transition-colors"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                                    className="block text-gray-400 hover:text-white transition-colors"
                                >
                                    About Us
                                </button>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-bold">Services</h4>
                            <div className="space-y-3 text-gray-400">
                                <p>Disease Detection</p>
                                <p>Treatment Plans</p>
                                <p>Plant Care Tips</p>
                                <p>Expert Consultation</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-bold">Contact</h4>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-gray-400">
                                    <Mail className="w-5 h-5" />
                                    <span>pajoc@ssct.edu.ph</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-400">
                                    <Phone className="w-5 h-5" />
                                    <span>(+63) 9676877741</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-400">
                                    <MapPin className="w-5 h-5" />
                                    <span>San Pedro, Alegria, S.D.N</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 SNSU Computer Science. All rights reserved. Built with ❤️ for plant lovers everywhere.</p>
                    </div>
                </div>
            </footer>
        );
    };

    const LoadingPanel = () => {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-3 flex justify-center items-center z-100">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500"></div>
                    <p className="text-lg font-semibold text-gray-900">Analyzing your plant...</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#fdfdfc]">
            {analysisLoading && <LoadingPanel />}
            <Navbar />
            <HeroSection />
            <AboutSection />
            <Footer />
        </div>
    );
}
