'use client';

import * as React from 'react';

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  React.useEffect(() => {
    console.error('Unbehandelter Anwendungsfehler:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-900 text-white font-sans">
      <div className="max-w-md w-full p-8 text-center space-y-6 border border-slate-800 bg-slate-950 rounded-xl shadow-md">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-100">Etwas ist schiefgelaufen</h2>
          <p className="text-sm text-slate-400">
            Es ist ein unerwarteter Fehler aufgetreten. Bitte erneut versuchen oder zur Startseite
            zurückkehren.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => (window.location.href = '/')}
            className="px-4 py-2 border border-slate-700 hover:bg-slate-800 transition-colors rounded-lg font-medium text-sm cursor-pointer"
          >
            Zur Startseite
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-medium text-sm cursor-pointer"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
