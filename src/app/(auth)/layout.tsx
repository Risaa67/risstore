import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-primary">
            RisStore
          </Link>
          <p className="mt-2 text-on-surface-variant">
            Marketplace Produk Digital
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
