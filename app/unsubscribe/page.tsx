export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  const isSuccess = searchParams.success === "true";

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
        {isSuccess ? (
          <>
            <div className="text-5xl mb-4">👋</div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">You&apos;re unsubscribed</h1>
            <p className="text-gray-500">You won&apos;t receive any more emails from Baby Tracker.</p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">😕</div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Something went wrong</h1>
            <p className="text-gray-500">
              That unsubscribe link doesn&apos;t look right. Try clicking the link in your email again.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
