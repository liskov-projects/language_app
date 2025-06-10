export default function Footer() {
  return (
    <footer className="bg-desert text-center text-mocha-base font-mont p-4 mt-4">
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
