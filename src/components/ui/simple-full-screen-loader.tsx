import React from 'react';
import { Loader2 } from 'lucide-react';

const SimpleFullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default SimpleFullScreenLoader;