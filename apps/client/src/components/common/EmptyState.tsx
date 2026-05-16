import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  href?: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>

      <p className="mt-3 max-w-md text-sm text-gray-500">{description}</p>

      {buttonText && href && (
        <Link
          href={href}
          className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
