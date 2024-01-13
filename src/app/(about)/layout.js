import InsightRoll from "@/src/components/About/InsightRoll";


const insights = [
    "6+ Years of experience in C#",
    "Software development associate's degree",
    "Fullstack developer",
    "Inclusive user minded designs",
    "Privacy and security aware",
    "From idea to fully hosted solutions",
    "Always happy to help"
  ];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}