import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, BookOpen, ChevronRight, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Placeholder videos - replace with actual YouTube video IDs
const videos: VideoItem[] = [
  {
    id: '1',
    title: 'Introduction to Data Structures',
    description: 'Learn the fundamentals of data structures and why they matter in programming.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder - replace with actual video ID
    duration: '15:30',
    topic: 'Fundamentals',
    difficulty: 'beginner',
  },
  {
    id: '2',
    title: 'Arrays and Strings Deep Dive',
    description: 'Master array manipulation and string algorithms for technical interviews.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    duration: '22:45',
    topic: 'Arrays',
    difficulty: 'beginner',
  },
  {
    id: '3',
    title: 'Linked Lists Explained',
    description: 'Understanding singly and doubly linked lists with practical examples.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    duration: '18:20',
    topic: 'Linked Lists',
    difficulty: 'intermediate',
  },
  {
    id: '4',
    title: 'Binary Trees and BST',
    description: 'Complete guide to binary trees, traversals, and binary search trees.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    duration: '28:15',
    topic: 'Trees',
    difficulty: 'intermediate',
  },
  {
    id: '5',
    title: 'Graph Algorithms Masterclass',
    description: 'BFS, DFS, shortest paths, and other essential graph algorithms.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    duration: '35:00',
    topic: 'Graphs',
    difficulty: 'advanced',
  },
  {
    id: '6',
    title: 'Dynamic Programming Patterns',
    description: 'Learn the most common DP patterns for coding interviews.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder
    duration: '42:30',
    topic: 'Dynamic Programming',
    difficulty: 'advanced',
  },
];

const difficultyColors = {
  beginner: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  advanced: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
};

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const topics = ['all', ...new Set(videos.map(v => v.topic))];
  
  const filteredVideos = filter === 'all' 
    ? videos 
    : videos.filter(v => v.topic === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Video Tutorials</h1>
          </div>
          <p className="text-muted-foreground">
            Learn data structures and algorithms through curated video tutorials. Watch directly here without leaving the platform.
          </p>
        </div>

        {/* Topic Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {topics.map(topic => (
            <Button
              key={topic}
              variant={filter === topic ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(topic)}
              className="capitalize"
            >
              {topic}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {selectedVideo ? (
              <div className="space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0&modestbranding=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={difficultyColors[selectedVideo.difficulty]}>
                      {selectedVideo.difficulty}
                    </Badge>
                    <Badge variant="secondary">{selectedVideo.topic}</Badge>
                  </div>
                  <h2 className="text-2xl font-semibold">{selectedVideo.title}</h2>
                  <p className="text-muted-foreground">{selectedVideo.description}</p>
                </div>
              </div>
            ) : (
              <Card className="aspect-video flex items-center justify-center bg-card/50 border-dashed">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Select a video to start learning</h3>
                    <p className="text-muted-foreground text-sm">
                      Choose from the playlist on the right
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Video List */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Playlist ({filteredVideos.length} videos)
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className={cn(
                    'cursor-pointer transition-all hover:border-primary/50 hover:bg-accent/50',
                    selectedVideo?.id === video.id && 'border-primary bg-accent'
                  )}
                  onClick={() => setSelectedVideo(video)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-medium leading-tight">
                        {video.title}
                      </CardTitle>
                      <ChevronRight className={cn(
                        'h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform',
                        selectedVideo?.id === video.id && 'text-primary rotate-90'
                      )} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="text-xs line-clamp-2 mb-2">
                      {video.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className={cn('text-[10px] px-1.5', difficultyColors[video.difficulty])}>
                        {video.difficulty}
                      </Badge>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
