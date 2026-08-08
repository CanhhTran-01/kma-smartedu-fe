import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import FacultyPage from './features/faculty/pages/FacultyPage';
import MajorPage from './features/major/pages/MajorPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/faculties" element={<FacultyPage />} />
                <Route path="/majors" element={<MajorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App