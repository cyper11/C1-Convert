import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { ToolsPage } from './pages/ToolsPage';
import { ConverterPage } from './pages/ConverterPage';
import { MergePage } from './pages/MergePage';
import { SplitPage } from './pages/SplitPage';
import { CompressPage } from './pages/CompressPage';
import { OCRPage } from './pages/OCRPage';
import { RotatePage } from './pages/RotatePage';
import { ProtectPage } from './pages/ProtectPage';
import { UnlockPage } from './pages/UnlockPage';
import { EditorPage } from './pages/EditorPage';
import { InfoPage } from './pages/InfoPage';
import { tools } from './config/tools';
import './styles.css';

const specialPages = [
  'merge-pdf',
  'split-pdf',
  'compress-pdf',
  'ocr',
  'rotate-pdf',
  'protect-pdf',
  'unlock-pdf',
  'pdf-editor',
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/merge-pdf" element={<MergePage />} />
        <Route path="/tools/split-pdf" element={<SplitPage />} />
        <Route path="/tools/compress-pdf" element={<CompressPage />} />
        <Route path="/tools/ocr" element={<OCRPage />} />
        <Route path="/tools/rotate-pdf" element={<RotatePage />} />
        <Route path="/tools/protect-pdf" element={<ProtectPage />} />
        <Route path="/tools/unlock-pdf" element={<UnlockPage />} />
        <Route path="/tools/pdf-editor" element={<EditorPage />} />
        {tools
          .filter((t) => !specialPages.includes(t.id))
          .map((t) => (
            <Route key={t.id} path={t.route} element={<ConverterPage c={t} />} />
          ))}
        <Route path="/privacy" element={<InfoPage kind="privacy" />} />
        <Route path="/terms" element={<InfoPage kind="terms" />} />
        <Route path="/ethics" element={<InfoPage kind="ethics" />} />
        <Route path="/ethical-considerations" element={<InfoPage kind="ethics" />} />
        <Route path="*" element={<ToolsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
