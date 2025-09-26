import React from 'react';
import { CheckCircle, AlertTriangle, Lightbulb, Calendar, Camera, Hash, List, ArrowRight } from 'lucide-react';

export default function Result() {
  // Sample data for demonstration (replace localStorage with props or state management)
  const storedData = JSON.parse(localStorage.getItem('myData'));
  const data = {
    detected: storedData.detected,
    cause: storedData.cause,
    recommendation: storedData.recommendation,
    image: storedData.image // Would contain base64 image data
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-12 text-center border border-green-100">
          <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <div className="text-gray-600 text-xl font-medium">
            No analysis data found
          </div>
          <p className="text-gray-500 mt-2">Please capture and analyze a plant image first.</p>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low': return <CheckCircle className="w-5 h-5" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  // Function to format text with markdown-like symbols
  const formatContent = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const formattedContent = [];
    let currentSection = null;
    let currentList = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        if (currentList.length > 0) {
          formattedContent.push(
            <ul key={`list-${index}`} className="space-y-2 mb-4">
              {currentList.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
          currentList = [];
        }
        return;
      }

      // Headers with #
      if (trimmedLine.startsWith('###')) {
        const headerText = trimmedLine.replace(/^###\s*/, '');
        formattedContent.push(
          <div key={index} className="flex items-center space-x-2 mt-6 mb-3 first:mt-0">
            <Hash className="w-4 h-4 text-blue-600" />
            <h4 className="text-md font-bold text-blue-800">{headerText}</h4>
          </div>
        );
      }
      else if (trimmedLine.startsWith('##')) {
        const headerText = trimmedLine.replace(/^##\s*/, '');
        formattedContent.push(
          <div key={index} className="flex items-center space-x-2 mt-6 mb-3 first:mt-0">
            <Hash className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-blue-800">{headerText}</h3>
          </div>
        );
      }
      else if (trimmedLine.startsWith('#')) {
        const headerText = trimmedLine.replace(/^#\s*/, '');
        formattedContent.push(
          <div key={index} className="flex items-center space-x-2 mt-6 mb-4 first:mt-0">
            <Hash className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-blue-800">{headerText}</h2>
          </div>
        );
      }
      // Divider lines with ---
      else if (trimmedLine.startsWith('---')) {
        formattedContent.push(
          <hr key={index} className="border-blue-200 my-4" />
        );
      }
      // Bullet points with *
      else if (trimmedLine.startsWith('*')) {
        const bulletText = trimmedLine.replace(/^\*\s*/, '');
        currentList.push(bulletText);
      }
      // Numbered lists with numbers
      else if (/^\d+\./.test(trimmedLine)) {
        const listText = trimmedLine.replace(/^\d+\.\s*/, '');
        currentList.push(listText);
      }
      // Bold text with **
      else {
        if (currentList.length > 0) {
          formattedContent.push(
            <ul key={`list-${index}`} className="space-y-2 mb-4">
              {currentList.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
          currentList = [];
        }

        // Handle bold text
        const boldFormatted = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedContent.push(
          <p key={index} className="mb-3 leading-relaxed"
             dangerouslySetInnerHTML={{ __html: boldFormatted }} />
        );
      }
    });

    // Handle remaining list items
    if (currentList.length > 0) {
      formattedContent.push(
        <ul key="final-list" className="space-y-2 mb-4">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start space-x-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return formattedContent;
  };

    const handleAnalyzeAnotherPlant = () => {
        window.location.href = '/';
    }

    return (
    <>
        <style jsx global>{`
        .scrollbar-hide {
            -ms-overflow-style: none;  /* Internet Explorer 10+ */
            scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;             /* Safari and Chrome */
        }
        `}</style>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Plant Health Analysis
            </h1>
            <div className="flex items-center justify-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date().toLocaleString()}
            </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/50">
            {/* Image Section */}
            {data.image && (
                <div className="relative">
                <img
                    src={`data:image/jpeg;base64,${data.image}`}
                    alt="Analyzed Plant"
                    className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            )}

            <div className="p-8">
                {/* Results Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Detection Result */}
                <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-6">
                    <div className="mb-3">
                        <h3 className="text-lg font-semibold">Detected Condition</h3>
                    </div>
                    <div className="text-2xl font-bold">{data.detected}</div>
                    </div>
                    {/* Cause Analysis */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <div className="flex items-center mb-3">
                        <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-semibold text-blue-800">Root Cause</h3>
                    </div>
                    <div className="text-blue-700 leading-relaxed text-sm max-h-64 overflow-y-auto scrollbar-hide">
                        {formatContent(data.cause)}
                    </div>
                    </div>
                </div>
                {/* Recommendation */}
                <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 h-full">
                    <div className="flex items-center mb-4">
                        <Lightbulb className="w-6 h-6 text-amber-600 mr-2" />
                        <h3 className="text-lg font-semibold text-amber-800">Treatment Recommendation</h3>
                    </div>
                    <div className="text-amber-700 leading-relaxed text-sm max-h-96 overflow-y-auto scrollbar-hide">
                        {formatContent(data.recommendation)}
                    </div>
                    </div>
                </div>
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                {/* <button className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"> */}
                {/*     Save Report */}
                {/* </button> */}
                <button onClick={handleAnalyzeAnotherPlant} className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-4 px-6 rounded-2xl transition-all duration-200">
                    Analyze Another Plant
                </button>
                {/* <button className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold py-4 px-6 rounded-2xl transition-all duration-200"> */}
                {/*     Share Results */}
                {/* </button> */}
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
    );
}
