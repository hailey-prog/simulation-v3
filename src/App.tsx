import { Routes, Route, useNavigate } from 'react-router-dom';
import { SimulationApp } from './SimulationApp';
import { ReportPage } from './pages/ReportPage';

function DiagnosesPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center gap-4">
      <p className="text-sm text-slate-400">진단 목록 페이지 (준비 중)</p>
      <button
        onClick={() => navigate('/', { replace: true })}
        className="px-5 py-2.5 bg-accent text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        처음으로 돌아가기
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SimulationApp />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/diagnoses" element={<DiagnosesPage />} />
    </Routes>
  );
}
