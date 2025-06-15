import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useColorContext } from "../context/ColorContext";

export default function Layout({ children }: { children: ReactNode }) {
  //  the wrapping divs help to separate the structure styling from the component styling
  const  { baseColor } = useColorContext();
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Header />

      {/* Main content */}
      <main className="flex-grow w-full p-1">
        <div className={`w-full h-full p-10 bg-[${baseColor}]`}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
