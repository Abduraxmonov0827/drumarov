"use client";
export default function LocaleError({ error, reset, }: {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}) {
    return (<div className="mx-auto flex min-h-[40vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-lg font-semibold text-brand">Xatolik yuz berdi</p>
      <p className="mt-2 text-sm text-brand-muted">Sahifani yangilab ko‘ring yoki birozdan keyin qayta urinib ko‘ring.</p>
      {process.env.NODE_ENV === "development" ? (<pre className="mt-6 max-h-48 w-full overflow-auto rounded-lg bg-brand-surface p-3 text-left text-xs text-brand">
          {error.message}
        </pre>) : null}
      <button type="button" onClick={() => reset()} className="mt-8 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95">
        Qayta urinish
      </button>
    </div>);
}
