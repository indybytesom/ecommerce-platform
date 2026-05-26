interface PaginationProps {
  currentPage: number;

  totalPages: number;

  onPageChange: (
    page: number,
  ) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-16 flex items-center justify-center gap-3">
      {Array.from({
        length: totalPages,
      }).map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() =>
              onPageChange(page)
            }
            className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-medium transition ${
              currentPage === page
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-black"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}