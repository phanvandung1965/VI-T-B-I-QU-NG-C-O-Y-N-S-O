import React, { useState } from 'react';
import AdGeneratorForm from './components/AdGeneratorForm';
import AdResultsDisplay from './components/AdResultsDisplay';
import { AdCopy, FormState } from './types';
import { generateAdCopy } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [adCopies, setAdCopies] = useState<AdCopy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (formData: FormState) => {
    setIsLoading(true);
    setError(null);
    setAdCopies([]);
    try {
      const results = await generateAdCopy(formData);
      setAdCopies(results);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating ad copy. Please check the console and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Left Column: Form Inputs */}
          <div className="md:col-span-2 md:sticky md:top-8 self-start">
            <AdGeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Right Column: Results */}
          <div className="md:col-span-3">
            <AdResultsDisplay adCopies={adCopies} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;