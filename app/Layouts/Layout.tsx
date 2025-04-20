import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component that wraps content with Header and Footer
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}