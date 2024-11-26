import "./globals.css";
import { BudgetProvider } from "./contexts/BudgetManagement";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <BudgetProvider>
          <header className=" dark:bg-zinc-800 text-red p-4 text-center">
            <h1 className="text-xl font-bold">Kişisel Bütçe Takip</h1>
          </header>

          <main className="min-h-screen">{children}</main>

          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>© 2024 Kişisel Bütçe Takip Uygulaması</p>
          </footer>
        </BudgetProvider>
      </body>
    </html>
  );
}
