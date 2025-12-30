import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, BookOpen, ChevronRight, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  topic: string;
}

// Videos organized by topic from YouTube playlists
const videos: VideoItem[] = [
  // Arrays - Playlist: PLqM7alHXFySEQDk2MDfbwEdjd2svVJH9p
  { id: 'arr-1', title: 'WHAT IS ARRAY?', youtubeId: '3_x_Fb31NLE', topic: 'Arrays' },
  { id: 'arr-2', title: 'ARRAY PRACTICE PROBLEMS', youtubeId: 'J7EhXvnixRM', topic: 'Arrays' },
  { id: 'arr-3', title: 'Longest Span with same Sum', youtubeId: 'xtfj4-r_Ahs', topic: 'Arrays' },
  { id: 'arr-4', title: 'Union and Intersection of two sorted arrays', youtubeId: 'EQQp4B_CU5Q', topic: 'Arrays' },
  { id: 'arr-5', title: 'Find the minimum distance between two numbers', youtubeId: 'hoceGcqQczM', topic: 'Arrays' },
  { id: 'arr-6', title: 'Leaders in an array', youtubeId: 'NyRZm1pzNmQ', topic: 'Arrays' },
  { id: 'arr-7', title: 'Majority Element', youtubeId: 'uwogtyFiDLg', topic: 'Arrays' },
  { id: 'arr-8', title: 'Find the Number Occurring Odd Number of Times', youtubeId: 'hySR1exD5PE', topic: 'Arrays' },
  { id: 'arr-9', title: 'Replace every element with the greatest element on right side', youtubeId: 'bLb8e83OK7o', topic: 'Arrays' },
  { id: 'arr-10', title: 'Find a Fixed Point in a given array', youtubeId: 'hASRzBXY5kY', topic: 'Arrays' },

  // Linked Lists - Playlist: PLqM7alHXFySH41ZxzrPNj2pAYPOI8ITe7
  { id: 'll-1', title: 'WHAT IS LINKED LIST?', youtubeId: 'MCG7S2fGUeU', topic: 'Linked Lists' },
  { id: 'll-2', title: 'Linked List Set 1 (Introduction)', youtubeId: 'ge8iG7JecR4', topic: 'Linked Lists' },
  { id: 'll-3', title: 'Linked List Set 2 (Inserting a node)', youtubeId: 'zgCROSijBRw', topic: 'Linked Lists' },
  { id: 'll-4', title: 'Linked List Set 3 (Deleting a node)', youtubeId: 'DoNRZTumxB0', topic: 'Linked Lists' },
  { id: 'll-5', title: 'Linked List vs Array', youtubeId: 'QRpbNTKH6XY', topic: 'Linked Lists' },
  { id: 'll-6', title: 'Delete a Linked List node at a given position', youtubeId: 'BrjLWNuJ3HA', topic: 'Linked Lists' },
  { id: 'll-7', title: 'Flattening a Linked List', youtubeId: 'PSKZJDtitZw', topic: 'Linked Lists' },
  { id: 'll-8', title: 'Detection of Loop in a Linked List', youtubeId: 'Aup0kOWoMVg', topic: 'Linked Lists' },

  // Graphs - Playlist: PLqM7alHXFySEaZgcg7uRYJFBnYMLti-nh
  { id: 'gr-1', title: 'GRAPH Data Structure', youtubeId: 'gTsoyORhqkg', topic: 'Graphs' },
  { id: 'gr-2', title: 'Graph Practice Problems', youtubeId: 'pCmsQVHYXK0', topic: 'Graphs' },
  { id: 'gr-3', title: 'Graph and its representations', youtubeId: '1n5XPFcvxds', topic: 'Graphs' },
  { id: 'gr-4', title: 'Breadth First Traversal for a Graph', youtubeId: '0u78hx-66Xk', topic: 'Graphs' },
  { id: 'gr-5', title: 'Applications of Breadth First Traversal', youtubeId: '-CzEI2r5OTs', topic: 'Graphs' },
  { id: 'gr-6', title: 'Depth First Traversal for a Graph', youtubeId: 'Y40bRyPQQr0', topic: 'Graphs' },
  { id: 'gr-7', title: 'Applications of Depth First Search', youtubeId: 'dE3wBxYobrU', topic: 'Graphs' },
  { id: 'gr-8', title: 'Length of shortest chain to reach a target word', youtubeId: '6pIC20wCm20', topic: 'Graphs' },

  // Stacks - Playlist: PLqM7alHXFySF7Lap-wi5qlaD8OEBx9RMV
  { id: 'st-1', title: 'WHAT IS STACK?', youtubeId: 'lhhyE7NVcbg', topic: 'Stacks' },
  { id: 'st-2', title: 'Stack Practice Question (Parenthesis Checker)', youtubeId: '2ay2GCrmf9E', topic: 'Stacks' },
  { id: 'st-3', title: 'Stack Set 1 (Introduction)', youtubeId: 'vZEuSFXSMDI', topic: 'Stacks' },
  { id: 'st-4', title: 'Stack Set 2 (Infix to Postfix)', youtubeId: 'ysDharaQXkw', topic: 'Stacks' },
  { id: 'st-5', title: 'Stack Set 3 (Reverse a string)', youtubeId: 'jBY4JD25Iks', topic: 'Stacks' },
  { id: 'st-6', title: 'Stack Set 4 (Evaluation of Postfix)', youtubeId: '_TGyjXjg04w', topic: 'Stacks' },
  { id: 'st-7', title: 'Next Greater Element', youtubeId: 'sgelJuvX1bU', topic: 'Stacks' },

  // Queues - Playlist: PLqM7alHXFySG6wgjVeEat_ouTIi0IBQ6D
  { id: 'qu-1', title: 'WHAT IS QUEUE?', youtubeId: 'ypJwoz_SXTo', topic: 'Queues' },
  { id: 'qu-2', title: 'QUEUE PRACTICE PROBLEMS', youtubeId: 'KG4dbF5xRig', topic: 'Queues' },
  { id: 'qu-3', title: 'Queue Set 1 (Array Implementation)', youtubeId: 'q5oOYxfOD1c', topic: 'Queues' },
  { id: 'qu-4', title: 'Queue Set 2 (Linked List Implementation)', youtubeId: 'C6KjYbAarYI', topic: 'Queues' },
  { id: 'qu-5', title: 'Implement a Stack using Single Queue', youtubeId: 'hC1UplBFEj0', topic: 'Queues' },
  { id: 'qu-6', title: 'Circular Queue', youtubeId: 'eKxWdc1DVFE', topic: 'Queues' },
  { id: 'qu-7', title: 'Reversing a Queue', youtubeId: 'aUU23JDaErs', topic: 'Queues' },

  // Trees - Playlist: PLqM7alHXFySHCXD7r1J0ky9Zg_GBB1dbk
  { id: 'tr-1', title: 'Tree Traversals', youtubeId: 'IpyCqRmaKW4', topic: 'Trees' },
  { id: 'tr-2', title: 'AVL Tree - Insertion', youtubeId: 'ygZMI2YIcvk', topic: 'Trees' },
  { id: 'tr-3', title: 'Inorder Tree Traversal without Recursion', youtubeId: 'VsxLHGUqAKs', topic: 'Trees' },
  { id: 'tr-4', title: 'Level Order Tree Traversal', youtubeId: 'kQ-aoKbGKSo', topic: 'Trees' },
  { id: 'tr-5', title: 'Red Black Tree (Insertion)', youtubeId: 'YCo2-H2CL6Q', topic: 'Trees' },
  { id: 'tr-6', title: 'Find the Maximum Depth or Height of a Tree', youtubeId: 'TQI_m32_AeU', topic: 'Trees' },
  { id: 'tr-7', title: 'Lowest Common Ancestor in a BST', youtubeId: 'zlTsz-apm4U', topic: 'Trees' },
];

const topicColors: Record<string, string> = {
  'Arrays': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Linked Lists': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'Graphs': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'Stacks': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'Queues': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  'Trees': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
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
                  <Badge variant="outline" className={topicColors[selectedVideo.topic] || 'bg-primary/10 text-primary'}>
                    {selectedVideo.topic}
                  </Badge>
                  <h2 className="text-2xl font-semibold">{selectedVideo.title}</h2>
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
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {filteredVideos.map((video, index) => (
                <Card
                  key={video.id}
                  className={cn(
                    'cursor-pointer transition-all hover:border-primary/50 hover:bg-accent/50',
                    selectedVideo?.id === video.id && 'border-primary bg-accent'
                  )}
                  onClick={() => setSelectedVideo(video)}
                >
                  <CardHeader className="p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-mono w-5">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-medium leading-tight truncate">
                          {video.title}
                        </CardTitle>
                        <Badge 
                          variant="outline" 
                          className={cn('text-[10px] px-1.5 mt-1', topicColors[video.topic])}
                        >
                          {video.topic}
                        </Badge>
                      </div>
                      <ChevronRight className={cn(
                        'h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform',
                        selectedVideo?.id === video.id && 'text-primary rotate-90'
                      )} />
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
