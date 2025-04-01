import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // 메타 태그에서 제목 찾기
    let title = $('meta[property="og:title"]').attr('content');
    
    // 메타 태그에 제목이 없으면 h1 태그에서 찾기
    if (!title) {
      title = $('h1').first().text().trim();
    }
    
    // h1 태그에도 없으면 title 태그에서 찾기
    if (!title) {
      title = $('title').text().trim();
    }

    return NextResponse.json({ title });
  } catch (error) {
    console.error('Error fetching title:', error);
    return NextResponse.json({ error: 'Failed to fetch title' }, { status: 500 });
  }
} 