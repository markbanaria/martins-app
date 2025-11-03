"use client";

import { useState } from "react";
import type { Source } from "@/types";

const PREDEFINED_SOURCES: Omit<Source, 'id' | 'status' | 'lastSync'>[] = [
  {
    name: "Asian Development Bank",
    url: "https://www.adb.org/what-we-do/private-sector-operations",
    type: "adb"
  },
  {
    name: "World Bank Projects",
    url: "https://projects.worldbank.org",
    type: "worldbank"
  },
  {
    name: "Devex Projects",
    url: "https://www.devex.com/funding",
    type: "devex"
  },
  {
    name: "UNDP Procurement",
    url: "https://procurement.undp.org",
    type: "undp"
  },
  {
    name: "USAID Opportunities",
    url: "https://www.usaid.gov/work-with-us",
    type: "usaid"
  }
];

export function SourceManager() {
  const [sources, setSources] = useState<Source[]>([]);
  const [newSourceUrl, setNewSourceUrl] = useState("");
  const [newSourceName, setNewSourceName] = useState("");
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const addPredefinedSource = (predefinedSource: typeof PREDEFINED_SOURCES[0]) => {
    const newSource: Source = {
      ...predefinedSource,
      id: Date.now().toString(),
      status: 'inactive'
    };
    setSources([...sources, newSource]);
  };

  const addCustomSource = () => {
    if (!newSourceUrl || !newSourceName) return;
    
    const newSource: Source = {
      id: Date.now().toString(),
      name: newSourceName,
      url: newSourceUrl,
      type: 'custom',
      status: 'inactive'
    };
    
    setSources([...sources, newSource]);
    setNewSourceUrl("");
    setNewSourceName("");
  };

  const scrapeSource = async (source: Source) => {
    setIsLoading({ ...isLoading, [source.id]: true });
    
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: source.url,
          sourceType: source.type
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Update source with last sync time and status
        setSources(sources.map(s => 
          s.id === source.id 
            ? { 
                ...s, 
                status: 'active',
                lastSync: new Date().toLocaleString(),
                opportunityCount: result.data?.length || 0
              }
            : s
        ));
        
        // In a real app, you'd emit an event or call a callback to update the dashboard
        console.log(`Successfully scraped ${result.data?.length || 0} opportunities from ${source.name}`);
      } else {
        // Update source status to error
        setSources(sources.map(s => 
          s.id === source.id ? { ...s, status: 'error' } : s
        ));
        console.error('Scraping failed:', result.error);
      }
    } catch (error) {
      console.error('Scraping error:', error);
      setSources(sources.map(s => 
        s.id === source.id ? { ...s, status: 'error' } : s
      ));
    } finally {
      setIsLoading({ ...isLoading, [source.id]: false });
    }
  };

  const toggleSourceStatus = (id: string) => {
    const source = sources.find(s => s.id === id);
    if (source && source.status === 'inactive') {
      scrapeSource(source);
    } else {
      setSources(sources.map(source => 
        source.id === id 
          ? { ...source, status: source.status === 'active' ? 'inactive' : 'active' }
          : source
      ));
    }
  };

  const removeSource = (id: string) => {
    setSources(sources.filter(source => source.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Data Sources
      </h2>
      
      {/* Predefined Sources */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Recommended Sources
        </h3>
        <div className="grid gap-2">
          {PREDEFINED_SOURCES.map((source) => (
            <button
              key={source.name}
              onClick={() => addPredefinedSource(source)}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              disabled={sources.some(s => s.name === source.name)}
            >
              <div>
                <div className="font-medium text-sm text-gray-900">
                  {source.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {source.url}
                </div>
              </div>
              <div className="text-blue-600 text-sm">
                {sources.some(s => s.name === source.name) ? '✓' : '+'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Source Input */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Add Custom Source
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Source name (e.g., Climate Fund)"
            value={newSourceName}
            onChange={(e) => setNewSourceName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="https://example.com/opportunities"
            value={newSourceUrl}
            onChange={(e) => setNewSourceUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCustomSource}
            disabled={!newSourceUrl || !newSourceName}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add Source
          </button>
        </div>
      </div>

      {/* Active Sources List */}
      {sources.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Active Sources ({sources.length})
          </h3>
          <div className="space-y-2">
            {sources.map((source) => (
              <div
                key={source.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        source.status === 'active' 
                          ? 'bg-green-500' 
                          : source.status === 'error'
                          ? 'bg-red-500'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className="font-medium text-sm text-gray-900">
                      {source.name}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {source.url}
                  </div>
                  {source.lastSync && (
                    <div className="text-xs text-gray-400 mt-1">
                      Last sync: {source.lastSync}
                      {source.opportunityCount !== undefined && (
                        <span className="ml-2 text-blue-600">
                          ({source.opportunityCount} opportunities)
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSourceStatus(source.id)}
                    disabled={isLoading[source.id]}
                    className={`px-3 py-1 text-xs rounded flex items-center space-x-1 ${
                      source.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : source.status === 'error'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-800'
                    } ${isLoading[source.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading[source.id] ? (
                      <>
                        <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                        <span>Syncing...</span>
                      </>
                    ) : (
                      <span>
                        {source.status === 'active' ? 'Active' : 
                         source.status === 'error' ? 'Error' : 'Sync'}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => removeSource(source.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}