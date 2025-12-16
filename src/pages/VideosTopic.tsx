import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VideosList } from '@/components/video/VideosList';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { getVideosByTopicSlug, getTopicNameFromSlug } from '@/lib/videosData';
import { Button } from '@/components/ui/button';

function thumbFor(v: any) {
  return v.youtubeId ? `https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg` : undefined;
}

export default function VideosTopicPage() {
  const { topic } = useParams<{ topic: string }>();
  const videos = topic ? getVideosByTopicSlug(topic) : [];
  const topicName = topic ? getTopicNameFromSlug(topic) : 'Videos';
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [filter, setFilter] = useState('');

  // default to first video
  if (videos.length > 0 && currentIndex >= videos.length) setCurrentIndex(0);

  const visible = useMemo(() => {
    if (!filter.trim()) return videos;
    return videos.filter((v) => v.title.toLowerCase().includes(filter.toLowerCase()));
  }, [videos, filter]);

  const current = videos[currentIndex];

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(videos.length - 1, i + 1));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left playlist */}
          <aside className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg sm:text-xl">{topicName}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{videos.length} lessons</p>
                  </div>
                  <div className="max-w-xs w-full">
                    <input
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      placeholder="Filter lessons..."
                      className="w-full pl-3 pr-2 py-1 rounded-md border border-border bg-transparent placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {visible.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setCurrentIndex(videos.indexOf(v))}
                      className={`w-full text-left flex items-center gap-3 p-3 hover:bg-accent/5 transition ${videos.indexOf(v) === currentIndex ? 'bg-accent/5' : ''}`}
                    >
                      <div className="w-20 h-12 rounded-md overflow-hidden bg-muted/10 flex-shrink-0">
                        {thumbFor(v) ? (
                          <img src={thumbFor(v)} alt={v.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No preview</div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{v.title}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Right player */}
          <section className="lg:col-span-3">
            <div className="space-y-4">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">{current?.title || topicName}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{current?.topic}</p>
                  </CardHeader>
                  <CardContent>
                    {current ? (
                      <div className="space-y-3">
                        <VideoPlayer youtubeId={current.youtubeId} fileUrl={current.fileUrl} title={current.title} />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button {...({ variant: 'ghost', size: 'sm' } as any)} onClick={prev}>Prev</Button>
                            <Button {...({ variant: 'ghost', size: 'sm' } as any)} onClick={() => setCurrentIndex(videos.indexOf(current) + 1)} disabled={videos.indexOf(current) >= videos.length - 1}>Next</Button>
                          </div>
                          <div className="text-xs text-muted-foreground">Lesson {currentIndex + 1} of {videos.length}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 bg-muted/20 rounded-md" />
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>About this lesson</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{current?.description || 'No description available.'}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
