import Header from "./Header";
import Footer from "./Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
