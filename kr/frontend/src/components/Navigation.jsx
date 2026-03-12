import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-marathon-gray border-b border-marathon-light border-opacity-20 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="text-2xl font-mono font-bold text-faction-uesc group-hover:text-faction-cyac transition-colors">
              ⬢
            </div>
            <div>
              <h1 className="text-lg font-bold text-marathon-light">NEXUS</h1>
              <p className="text-xs text-marathon-light text-opacity-60">
                Runner Directory
              </p>
            </div>
          </Link>

          <div className="flex gap-6">
            <Link
              to="/"
              className={`font-semibold transition-colors ${
                location.pathname === "/"
                  ? "text-faction-uesc border-b-2 border-faction-uesc"
                  : "text-marathon-light hover:text-faction-uesc"
              }`}
            >
              Factions
            </Link>
            <Link
              to="/factions/new"
              className={`font-semibold transition-colors ${
                location.pathname === "/factions/new"
                  ? "text-faction-cyac border-b-2 border-faction-cyac"
                  : "text-marathon-light hover:text-faction-cyac"
              }`}
            >
              New Faction
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
