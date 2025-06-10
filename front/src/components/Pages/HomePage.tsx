export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-12 bg-mocha-light text-mocha-dark font-winky">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Welcome</h1>
      <p className="text-xl sm:text-2xl font-medium">
        to Buryat E-Picture Dictionary!
      </p>

      {/* Acknowledgement */}
      <p className="w-full sm:w-4/5 lg:w-2/3 text-center mt-8 text-mocha-base font-winky-italic text-xl leading-relaxed">
        We acknowledge the traditional owners of country throughout Australia
        and acknowledge their continuing connection to land, water and
        community. We pay our respects to the people, the cultures and the
        elders past and present.
      </p>

      {/* First row of content cards */}
      <section className="main-content-row">
        {[
          "The members of liskov.dev team appreciate languages & recognise the importance of language conservation — especially in a country like Australia. We feel privileged to help popularise whatever language needs it.",
          "We hope you’ll feel that same passion as our crew. Some of our members know firsthand how sad it is when a language goes into obscurity and we at liskov feel that we can do our share and create resources that keep those languages alive",
          "All content used in this application is 100% approved by IAD — your trusted source for Aboriginal languages.",
        ].map((text, idx) => (
          <article key={idx} className="main-content-card">
            <p className="text-mocha-dark font-winky text-lg">{text}</p>
          </article>
        ))}
      </section>

      {/* Second row of content cards */}
      <section className="main-content-row">
        {[
          "More than just a dictionary, this tool includes interactive learning features designed by someone with years of language teaching experience — using effective, proven methods.",
          "Built for all ages and all people interested in getting familiar with the Buryat language. Learn by category, track your progress, and grow your vocabulary at your own pace.",
          "Fundraiser: Help us grow this platform and keep Buryat alive. More info soon.",
        ].map((text, idx) => (
          <article key={idx} className="main-content-card">
            <p className="text-mocha-dark font-winky text-lg">
              {idx === 2 ? <strong>{text}</strong> : text}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
