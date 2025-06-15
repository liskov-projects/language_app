import { useColorContext } from "../context/ColorContext";

export default function Footer() {
  const { containerColor, defaultTextColor } = useColorContext();
  return (
    <footer className={`bg-[${containerColor}] text-center text-[${defaultTextColor}] font-mont p-4`}>
      <p className="flex items-center justify-center gap-2">
        &copy; {new Date().getFullYear()} Vera & May @ liskov developing. All
        sources from freelang.net
        <a target="_blank">
          <img className="h-8 inline-block" />
        </a>
      </p>
    </footer>
  );
}
