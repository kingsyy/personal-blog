const SkillList = [
  { name: ".NET MVC", link: "https://dotnet.microsoft.com/en-us/apps/aspnet/mvc" },
  { name: ".NET Blazor", link: "https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor" },
  { name: ".NET Maui", link: "https://dotnet.microsoft.com/en-us/apps/maui" },
  { name: "Web Design", link: "https://en.wikipedia.org/wiki/Web_design" },
  { name: "UML", link: "https://en.wikipedia.org/wiki/Unified_Modeling_Language" },
  { name: "GDPR", link: "https://gdpr.eu/" },
  { name: "CSS", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "Less", link: "https://lesscss.org/" },
  { name: "Tailwind css", link: "https://tailwindcss.com/" },
  { name: "Bootstrap", link: "https://getbootstrap.com/" },
  { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "TypeScript", link: "https://www.typescriptlang.org/" },
  { name: "React", link: "https://react.dev/" },
  { name: "Next.js", link: "https://nextjs.org/" },
  { name: "Docker", link: "https://docker.com" },
  { name: "Azure", link: "https://azure.microsoft.com/en-gb/" },
  { name: "LLM", link: "https://en.wikipedia.org/wiki/Large_language_model" },
  { name: "AI", link: "https://en.wikipedia.org/wiki/Artificial_intelligence" },
];

const Skills = () => {
  return (
    <section className="w-full flex flex-col p-5 xs:p-10 sm:p-12 md:p-16 lg:p-20 border-b-2 border-solid border-dark dark:border-light
     text-dark dark:text-light">
      <span className="font-semibold text-lg sm:text-3xl md:text-4xl text-accent dark:text-accentDark">
        I'm comfortable in...
      </span>
      <ul className="flex flex-wrap mt-8 justify-center xs:justify-start">
        {SkillList.map((item, index) => {
          return (
            <li
              key={index}
              title={item.link}
              className="font-semibold inline-block capitalize text-base xs:text-lg sm:text-xl  md:text-2xl py-2 xs:py-3 sm:py-4 lg:py-5 px-4 xs:px-6 sm:px-8 lg:px-12 border-2 border-solid border-dark dark:border-light rounded mr-3 mb-3 xs:mr-4 xs:mb-4  md:mr-6 md:mb-6 hover:scale-105 transition-all ease duration-200 cursor-pointer dark:font-normal"
            >
              <a
                href={item.link}
                target="_blank"
              >
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Skills;
