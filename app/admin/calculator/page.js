import { SeminarCalculator } from "../../components/SeminarCalculator";

export default function CalcPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e9dc] to-[#e6efe9] flex items-center justify-center px-2">
     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f6f1e7] to-[#e8f0e8] p-4">
        <h1 className="text-3xl sm:text-4xl font-thin text-gray-800 mb-8 text-center tracking-tight drop-shadow">
          Simulateur de rentabilité séminaire 
        </h1>
        <SeminarCalculator />
      </div>
    </div>
  );
}
