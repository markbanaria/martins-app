export interface Opportunity {
  id: string;
  title: string;
  agency: string;
  deadline: string;
  relevanceScore: number;
  summary: string;
  value?: string;
  link: string;
  status: 'new' | 'reviewed' | 'applied' | 'archived';
  tags: string[];
  scrapedAt?: string;
  sourceId?: string;
}

export interface Source {
  id: string;
  name: string;
  url: string;
  type: 'adb' | 'worldbank' | 'devex' | 'undp' | 'usaid' | 'custom';
  status: 'active' | 'inactive' | 'error';
  lastSync?: string;
  opportunityCount?: number;
}

export interface ScrapingResult {
  success: boolean;
  data?: Opportunity[];
  error?: string;
  metadata?: {
    source: string;
    type: string;
    scrapedAt: string;
    count: number;
  };
}

export interface DashboardStats {
  total: number;
  new: number;
  highRelevance: number;
  urgent: number;
  applied: number;
}

export interface FilterOptions {
  status?: Opportunity['status'][];
  agencies?: string[];
  minRelevanceScore?: number;
  maxDaysUntilDeadline?: number;
  tags?: string[];
}

export interface SortOptions {
  field: 'relevance' | 'deadline' | 'value' | 'title' | 'agency';
  direction: 'asc' | 'desc';
}