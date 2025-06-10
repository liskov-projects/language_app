import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  //  the wrapping divs help to separate the structure styling from the component styling
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Header />

      {/* Main content */}
      <main className="flex-grow w-full">
        <div className="m-2 max-w-screen-xl mx-auto w-full px-2">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
