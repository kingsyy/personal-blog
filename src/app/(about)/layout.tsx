import InsightRoll from "@/components/About/InsightRoll";
const insights = [
    "Fullstack developer",
    "6+ Years of experience in C# and web",
    "Software development degree",
    "Inclusive user minded designs",
    "Privacy and security first",
    "From idea to fully hosted solutions",
  ];

export default function AboutLayout({ children } : any) {
  return (
    <main className="pt-16 md:pt-0 w-full flex flex-col items-center justify-between">
      <InsightRoll texts={insights} />
      {children}
    </main>
  );
}