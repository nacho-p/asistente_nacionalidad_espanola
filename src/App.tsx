import { ChevronLeft, ChevronRight, Info, RefreshCw, RotateCcw, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { DECISION_TREE, type Option } from './decisionTree';

export default function App() {
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (option: Option) => {
    setHistory([...history, currentStepId])

    if (option.result) {
      setResult(option.result);
    } else if (option.nextStepId) {
      setCurrentStepId(option.nextStepId);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousStepId = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setCurrentStepId(previousStepId)
    }
  }

  const reset = () => {
    setCurrentStepId('start');
    setResult(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border-t-4 border-yellow-500">
          <div className="text-center mb-6">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Resultado</h2>
          </div>
          <div className="bg-slate-100 p-4 rounded-lg mb-6 text-center">
            <p className="text-lg font-semibold text-slate-700">{result}</p>
          </div>
          <button 
            onClick={reset}
            className="w-full py-3 bg-blue-900 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition"
          >
            <RefreshCw className="w-4 h-4" /> Nueva Consulta
          </button>
        </div>
      </div>
    );
  }

  const step = DECISION_TREE[currentStepId];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Consulado de España</h1>
        <p className="text-slate-600">Asistente de Determinación de Nacionalidad</p>
      </header>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-lg w-full">
        <div className='flex justify-between items-center mb-6'>
        {history.length > 0 ? (
          <button onClick={handleBack}
          className='flex items-center text-sm text-slate-500 hover:text-blue-600 mb-4 transition'
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Volver atras
        </button>
        ) : (
          <div />
        )
        }
        <button
        onClick={reset}
        className='flex items-center text-sm text-slate-400 hover:text-red-500 transition'
        >
          <RotateCcw className='2-4 h-4 mr-1' /> Reiniciar
        </button>
        </div>
        
        <h2 className="text-xl font-semibold text-slate-800 mb-6">{step.question}</h2>

        <div className="space-y-3">
          {Object.entries(step.options).map(([key, opt]) => (
            <button
              key={key}
              onClick={() => handleSelect(opt)}
              className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group"
            >
              <span className="font-medium text-slate-700 group-hover:text-blue-900">{opt.label}</span>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
          <Info className="w-5 h-5 text-yellow-600 shrink-0" />
          <p className="text-sm text-yellow-800 italic">
            Nota: Esta herramienta es una guía orientativa. La resolución final queda sujeta a la revisión de la documentación original presentada ante el cónsul.
          </p>
        </div>
      </div>
    </div>
  );
}