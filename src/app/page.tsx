import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { SourceManager } from "@/components/SourceManager";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🌐 CSV Orbit
          </h1>
          <p className="text-xl text-gray-600 mb-1">
            AI-Enabled Opportunity Radar for Climate Smart Ventures
          </p>
          <p className="text-sm text-gray-500 italic">
            Always in motion. Always in view.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SourceManager />
          </div>
          <div className="lg:col-span-2">
            <Dashboard />
          </div>
        </div>
      </main>
    </div>
  );
}
