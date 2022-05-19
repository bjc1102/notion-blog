import React from 'react';

export default function Skeleton() {
  return (
    <div className="min-h-screen mx-auto">
      <div className="relative max-w-6xl h-80 mx-auto mb-20 md:rounded-none rounded-3xl overflow-hidden bg-gray-700 animate-pulse" />
      <div className="flex flex-col max-w-3xl mx-auto px-5 pt-12 gap-6">
        <div className="bg-gray-700 h-20 rounded-2xl animate-pulse" />
        <div className="border-t-2 border-gray-300 border-solid" />
        <div className="bg-gray-700 w-full h-10 rounded-2xl animate-pulse" />
        <div className="bg-gray-700 w-3/4 h-10 rounded-2xl animate-pulse" />
        <div className="bg-gray-700 w-2/4 h-10 rounded-2xl animate-pulse" />
        <div className="bg-gray-700 w-1/4 h-10 rounded-2xl animate-pulse" />
        <div className="bg-gray-700 w-1/6 h-10 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}
