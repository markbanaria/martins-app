import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url, sourceType } = await request.json();

    // Basic URL validation
    if (!url || !URL.canParse(url)) {
      return NextResponse.json(
        { error: 'Invalid URL provided' },
        { status: 400 }
      );
    }

    // Mock scraping logic - in production, you would implement actual scraping
    // based on the source type (adb, worldbank, devex, etc.)
    const mockOpportunities = generateMockOpportunities(sourceType, url);

    return NextResponse.json({
      success: true,
      data: mockOpportunities,
      metadata: {
        source: url,
        type: sourceType,
        scrapedAt: new Date().toISOString(),
        count: mockOpportunities.length
      }
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return NextResponse.json(
      { error: 'Failed to scrape opportunities' },
      { status: 500 }
    );
  }
}

function generateMockOpportunities(sourceType: string, url: string) {
  const baseOpportunities = [
    {
      title: `${sourceType.toUpperCase()} Climate Finance Initiative`,
      agency: sourceType.toUpperCase(),
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: `$${Math.floor(Math.random() * 50 + 1)}M USD`,
      summary: `Strategic funding opportunity for climate adaptation and mitigation projects in developing regions. Focus on sustainable development and green technology implementation.`,
      link: url,
      tags: ['climate-finance', 'adaptation', 'sustainability'],
      relevanceScore: Math.random() * 0.3 + 0.7 // 0.7-1.0 range
    },
    {
      title: `Digital Infrastructure for Green Transition`,
      agency: sourceType.toUpperCase(),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: `$${Math.floor(Math.random() * 25 + 5)}M USD`,
      summary: `Technical assistance for digital infrastructure supporting renewable energy and smart grid implementation across emerging markets.`,
      link: url,
      tags: ['digital-infrastructure', 'renewable-energy', 'smart-grid'],
      relevanceScore: Math.random() * 0.25 + 0.75
    }
  ];

  return baseOpportunities.map((opp, index) => ({
    ...opp,
    id: `${sourceType}-${Date.now()}-${index}`,
    status: 'new' as const
  }));
}