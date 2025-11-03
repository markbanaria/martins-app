export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">🌐</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
              <a href="#sources" className="text-gray-600 hover:text-gray-900">
                Sources
              </a>
              <a href="#opportunities" className="text-gray-600 hover:text-gray-900">
                Opportunities
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Sync All Sources
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}