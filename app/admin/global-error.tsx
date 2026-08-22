'use client';

import * as React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('[Globaler Fehler]:', error);
  }, [error]);

  return (
    <html lang="de">
      <body className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6 font-sans">
        <div className="max-w-md w-full p-8 text-center space-y-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">Kritischer Fehler</h2>
          <p className="text-sm text-slate-400">
            Die Anwendung ist auf einen schwerwiegenden Fehler gestoßen.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-medium text-sm cursor-pointer"
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
