export default function OrderCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 w-32 rounded bg-gray-200" />

          <div className="mt-3 h-3 w-24 rounded bg-gray-200" />
        </div>

        <div className="h-8 w-20 rounded-full bg-gray-200" />
      </div>

      <div className="mt-6 flex gap-4">
        <div className="h-16 w-16 rounded-xl bg-gray-200" />

        <div className="flex-1">
          <div className="h-4 w-48 rounded bg-gray-200" />

          <div className="mt-3 h-3 w-24 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
