import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-green-600 flex items-center space-x-2 animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-2xl font-semibold">Cargando...</span>
      </div>
    </div>
  );
};