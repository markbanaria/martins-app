"use client";

import { useState } from "react";
import type { Opportunity } from "@/types";

// Mock data for demonstration
const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    title: "Digital Energy Transition Technical Assistance",
    agency: "ADB",
    deadline: "2025-03-21",
    relevanceScore: 0.94,
    summary: "Technical assistance for renewable energy integration and AI analytics in Southeast Asia. Focus on smart grid implementation and climate adaptation.",
    value: "$2.5M USD",
    link: "https://adb.org/projects/digital-energy-ta",
    status: "new",
    tags: ["renewable-energy", "ai", "southeast-asia", "smart-grid"]
  },
  {
    id: "2",
    title: "Climate Resilience Infrastructure Fund",
    agency: "World Bank",
    deadline: "2025-02-15",
    relevanceScore: 0.87,
    summary: "Large-scale infrastructure funding for climate adaptation projects. Priority on coastal protection and sustainable urban development.",
    value: "$50M USD",
    link: "https://worldbank.org/projects/climate-resilience",
    status: "new",
    tags: ["infrastructure", "adaptation", "urban-development"]
  },
  {
    id: "3",
    title: "Green Technology Innovation Partnership",
    agency: "UNDP",
    deadline: "2025-04-10",
    relevanceScore: 0.82,
    summary: "Partnership opportunity for innovative green technology solutions in developing countries. Focus on circular economy and waste management.",
    value: "$1.2M USD",
    link: "https://undp.org/partnerships/green-tech",
    status: "reviewed",
    tags: ["innovation", "circular-economy", "waste-management"]
  }
];

export function Dashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);
  const [filter, setFilter] = useState<'all' | 'high-score' | 'urgent' | 'new'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'deadline' | 'value'>('relevance');

  const updateOpportunityStatus = (id: string, status: Opportunity['status']) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === id ? { ...opp, status } : opp
    ));
  };

  const filteredOpportunities = opportunities.filter(opp => {
    switch (filter) {
      case 'high-score':
        return opp.relevanceScore >= 0.8;
      case 'urgent':
        const daysUntilDeadline = Math.ceil(
          (new Date(opp.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysUntilDeadline <= 30;
      case 'new':
        return opp.status === 'new';
      default:
        return true;
    }
  });

  const sortedOpportunities = filteredOpportunities.sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'value':
        const aValue = parseFloat(a.value?.replace(/[^0-9.]/g, '') || '0');
        const bValue = parseFloat(b.value?.replace(/[^0-9.]/g, '') || '0');
        return bValue - aValue;
      default:
        return b.relevanceScore - a.relevanceScore;
    }
  });

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-green-700 bg-green-100';
    if (score >= 0.7) return 'text-yellow-700 bg-yellow-100';
    return 'text-red-700 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'applied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Opportunities Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {filteredOpportunities.length} of {opportunities.length} opportunities
            </span>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="high-score">High Score (≥80%)</option>
              <option value="urgent">Urgent (≤30 days)</option>
              <option value="new">New</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Relevance Score</option>
              <option value="deadline">Deadline</option>
              <option value="value">Value</option>
            </select>
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="divide-y divide-gray-200">
        {sortedOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    <a 
                      href={opportunity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {opportunity.title}
                    </a>
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getScoreColor(opportunity.relevanceScore)}`}>
                    {Math.round(opportunity.relevanceScore * 100)}% match
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="font-medium">{opportunity.agency}</span>
                  {opportunity.value && (
                    <span className="text-green-600 font-medium">{opportunity.value}</span>
                  )}
                  <span className={`${getDaysUntilDeadline(opportunity.deadline) <= 30 ? 'text-red-600 font-medium' : ''}`}>
                    Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                    {getDaysUntilDeadline(opportunity.deadline) > 0 && (
                      <span className="ml-1">
                        ({getDaysUntilDeadline(opportunity.deadline)} days)
                      </span>
                    )}
                  </span>
                </div>

                <p className="text-gray-700 mb-3 line-clamp-2">
                  {opportunity.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {opportunity.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(opportunity.status)}`}>
                      {opportunity.status}
                    </span>
                    <select
                      value={opportunity.status}
                      onChange={(e) => updateOpportunityStatus(opportunity.id, e.target.value as Opportunity['status'])}
                      className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="applied">Applied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {sortedOpportunities.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
            <p>Try adjusting your filters or add more sources to discover opportunities.</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {opportunities.filter(o => o.status === 'new').length}
            </div>
            <div className="text-sm text-gray-500">New Opportunities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {opportunities.filter(o => o.relevanceScore >= 0.8).length}
            </div>
            <div className="text-sm text-gray-500">High Relevance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {opportunities.filter(o => getDaysUntilDeadline(o.deadline) <= 30).length}
            </div>
            <div className="text-sm text-gray-500">Urgent (≤30 days)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {opportunities.filter(o => o.status === 'applied').length}
            </div>
            <div className="text-sm text-gray-500">Applied</div>
          </div>
        </div>
      </div>
    </div>
  );
}