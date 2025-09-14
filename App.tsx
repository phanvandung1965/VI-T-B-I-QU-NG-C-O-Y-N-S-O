
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
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <AdGeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
          <AdResultsDisplay adCopies={adCopies} isLoading={isLoading} error={error} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
