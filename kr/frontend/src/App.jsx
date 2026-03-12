import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
// import { FactionsList } from './pages/FactionsList';
// import { FactionDetail } from './pages/FactionDetail';
// import { CreateFaction } from './pages/CreateFaction';
// import { EditFaction } from './pages/EditFaction';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-marathon-gradient">
        <Navigation />
        <Routes>
          {/* <Route path="/" element={<FactionsList />} />
          <Route path="/factions/new" element={<CreateFaction />} />
          <Route path="/factions/:id" element={<FactionDetail />} />
          <Route path="/factions/:id/edit" element={<EditFaction />} />
          <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
