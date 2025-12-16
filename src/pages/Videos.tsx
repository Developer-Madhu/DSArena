import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { topics, videoLibrary, topicPlaylists } from '@/lib/videosData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function topicSlug(topic: string) {
  return topic.toLowerCase().replace(/\s+/g, '-');
}

function getTopicThumbnail(topic: string) {
  const v = videoLibrary.find((x) => x.topic === topic && x.youtubeId);
  return v?.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg` : undefined;
}

export default function VideosIndexPage() {
  const [query, setQuery] = useState('');

  // Group counts per topic
  const counts = topics.map((t) => ({ name: t, count: videoLibrary.filter((v) => v.topic === t).length }));

  const filtered = useMemo(() => {
    if (!query.trim()) return counts;
    return counts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  }, [counts, query]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 space-y-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">DSA Video Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Browse curated topic playlists and watch step-by-step videos for core DSA topics.</p>
              <div className="mt-4">
                <div className="relative max-w-md">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-4.35-4.35" /><circle cx="11" cy="11" r="6" /></svg>
                  <input
                    aria-label="Search topics"
                    placeholder="Search topics..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-md border border-border bg-transparent placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((c) => (
            <Link key={c.name} to={`/videos/${topicSlug(c.name)}`} className="group block transform hover:-translate-y-1 transition">
              <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg bg-card border border-border">
                <div className="relative h-36 bg-muted/10">
                  {getTopicThumbnail(c.name) ? (
                    <img src={getTopicThumbnail(c.name)} alt={`${c.name} thumbnail`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No preview</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-80" />
                  <div className="absolute left-4 bottom-4">
                    <h3 className="text-white font-semibold drop-shadow">{c.name}</h3>
                    <p className="text-xs text-white/90 mt-1 drop-shadow-sm">{c.count} videos</p>
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Curated playlist</div>
                  <div className="flex items-center gap-2">
                    {topicPlaylists[c.name] ? (
                      <a href={topicPlaylists[c.name]} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Open playlist</a>
                    ) : (
                      <Button {...({ variant: 'ghost', size: 'sm' } as any)}>Explore →</Button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
