import { ChevronLeft, ChevronRight, Info, ListChecks, RefreshCw, RotateCcw, ShieldCheck, X } from 'lucide-react';
import { useState, type JSX } from 'react';
import { DECISION_TREE } from './decisionTree';
import { Header } from './Header';
import { RESULT_LABELS, type HistoryItem, type Option, type ResultKey } from './types';

export default function App(): JSX.Element {
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [resultKey, setResultKey] = useState<ResultKey | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  
  const handleSelect = (option: Option, currentLabel: string): void => {
    const currentStep = DECISION_TREE[currentStepId];
    setHistory([...history, { 
      stepId: currentStepId, 
      question: currentStep.question,
      label: currentLabel 
    }])

    if (option.result) {
      setResultKey(option.result);
    } else if (option.nextStepId) {
        setCurrentStepId(option.nextStepId);
    }
  };

  const handleBack = (): void => {
    if (history.length === 0) return;

    const previous = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentStepId(previous.stepId);
  }

  const reset = (): void => {
      setCurrentStepId('start');
      setHistory([]);
      setResultKey(null);
      setShowSummary(false);
    };
  
  if (resultKey) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
        <Header/>
        {showSummary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
            <button 
              onClick={() => setShowSummary(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6 cursor-pointer" />
            </button>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Recorrido del caso</h3>
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              {history.map((h, i) => (
                <div key={i} className="border-l-2 border-blue-200 pl-3">
                  <p className="text-xs text-slate-400 mb-1">{h.question}</p>
                  <p className="text-sm font-semibold text-slate-700">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border-t-4 border-yellow-500">
        <div className="text-center mb-6">
          <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Resultado</h2>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg mb-6 text-center">
            <p className="text-lg font-semibold text-slate-700">{RESULT_LABELS[resultKey]}</p>
        </div>
        <button 
          onClick={() => setShowSummary(true)} 
          className="w-full my-4 py-3 bg-slate-800 text-white rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-700 transition font-medium">
          <ListChecks className="w-4 h-4" />Ver recorrido de selección
        </button>
        <button 
          onClick={reset}
          className="w-full py-3 bg-blue-900 text-white rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-800 transition">
          <RefreshCw className="w-4 h-4" />Nueva Consulta
        </button>
        </div>
      </div>
    );
  }
  
  const step = DECISION_TREE[currentStepId];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <Header/>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-lg w-full">
        <div className='flex justify-between items-center mb-6'>
        {history.length > 0 ? (
          <button onClick={handleBack}
            className='flex items-center text-sm text-slate-500 cursor-pointer hover:text-blue-600 mb-4 transition'>
            <ChevronLeft className="w-4 h-4 mr-1" />Volver atras
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={reset}
          className='flex items-center text-sm text-slate-400 cursor-pointer hover:text-red-500 transition'>
          <RotateCcw className='2-4 h-4 mr-1' />Reiniciar
        </button>
        </div>
        
        <h2 className="text-xl font-semibold text-slate-800 mb-6">{step.question}</h2>

        <div className="space-y-3">
          {Object.entries(step.options).map(([key, opt]) => (
            <button
              key={key}
              onClick={() => handleSelect(opt, opt.label)}
              className="w-full text-left p-4 rounded-xl border border-slate-200 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group">
              <span className="font-medium text-slate-700 group-hover:text-blue-900">{opt.label}</span>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
          <Info className="w-5 h-5 text-yellow-600 shrink-0" />
          <p className="text-sm text-yellow-800 italic">
            El sistema permite navegar por el árbol de decisiones. Usa "Volver atrás" para corregir un paso o "Reiniciar" para borrar todo.
            <br/>
            <br/>
            Nota: Esta herramienta es una guía orientativa. La resolución final queda sujeta a la revisión de la documentación original presentada ante el cónsul.
          </p>
        </div>
      </div>
    </div>
  );
}