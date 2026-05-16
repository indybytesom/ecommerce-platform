import AccountHeader from "./AccountHeader";
import AccountSidebar from "./AccountSidebar";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <AccountHeader />

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <AccountSidebar />

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
