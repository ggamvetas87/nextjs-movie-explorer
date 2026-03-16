export default function MovieCardSkeleton() {
  return (
    <div className="animate-pulse border rounded p-3">
      <div className="bg-gray-300 h-60 w-full mb-2 rounded"></div>
      <div className="bg-gray-300 h-4 w-3/4 mb-1 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
    </div>
  );
}
