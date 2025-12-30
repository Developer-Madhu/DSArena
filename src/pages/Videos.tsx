import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  Video, 
  ChevronRight, 
  ArrowLeft,
  LayoutGrid,
  Link,
  Network,
  Layers,
  ListOrdered,
  GitBranch,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { topicSections, getTotalVideoCount, type TopicSection, type VideoItem } from '@/lib/videoData';

const iconMap: Record<string, React.ElementType> = {
  'LayoutGrid': LayoutGrid,
  'Link': Link,
  'Network': Network,
  'Layers': Layers,
  'ListOrdered': ListOrdered,
  'GitBranch': GitBranch,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  'blue': { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
  'emerald': { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
  'purple': { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
  'amber': { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
  'rose': { bg: 'bg-rose-500/10', text: 'text-rose-500', border: 'border-rose-500/20' },
  'cyan': { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/20' },
};

export default function Videos() {
  const [selectedSection, setSelectedSection] = useState<TopicSection | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const handleSectionClick = (section: TopicSection) => {
    setSelectedSection(section);
    setSelectedVideo(null);
  };

  const handleBackToSections = () => {
    setSelectedSection(null);
    setSelectedVideo(null);
  };

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
  };

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
            <Badge variant="secondary" className="ml-2">
              {getTotalVideoCount()} Videos
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Learn data structures and algorithms through curated video tutorials from GeeksforGeeks.
          </p>
        </div>

        {!selectedSection ? (
          // Topic Sections Grid
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicSections.map((section) => {
              const IconComponent = iconMap[section.icon];
              const colors = colorMap[section.color];
              
              return (
                <Card
                  key={section.id}
                  className={cn(
                    'cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg',
                    'border-2 hover:border-primary/50 group'
                  )}
                  onClick={() => handleSectionClick(section)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={cn('p-3 rounded-xl', colors.bg)}>
                        <IconComponent className={cn('h-8 w-8', colors.text)} />
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-2">{section.name}</CardTitle>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={cn(colors.bg, colors.text, colors.border)}>
                        {section.videos.length} videos
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://youtube.com/playlist?list=${section.playlistId}`, '_blank');
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        YouTube
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          // Selected Section View
          <div>
            {/* Back Button & Section Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToSections}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                All Topics
              </Button>
              <div className="flex items-center gap-3">
                {(() => {
                  const IconComponent = iconMap[selectedSection.icon];
                  const colors = colorMap[selectedSection.color];
                  return (
                    <>
                      <div className={cn('p-2 rounded-lg', colors.bg)}>
                        <IconComponent className={cn('h-5 w-5', colors.text)} />
                      </div>
                      <h2 className="text-2xl font-bold">{selectedSection.name}</h2>
                      <Badge variant="outline" className={cn(colors.bg, colors.text, colors.border)}>
                        {selectedSection.videos.length} videos
                      </Badge>
                    </>
                  );
                })()}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Video Player */}
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
                    <div>
                      <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
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
                <h3 className="font-semibold text-lg">
                  Videos ({selectedSection.videos.length})
                </h3>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {selectedSection.videos.map((video, index) => {
                    const colors = colorMap[selectedSection.color];
                    return (
                      <Card
                        key={video.id}
                        className={cn(
                          'cursor-pointer transition-all hover:border-primary/50 hover:bg-accent/50',
                          selectedVideo?.id === video.id && 'border-primary bg-accent'
                        )}
                        onClick={() => handleVideoClick(video)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0',
                              selectedVideo?.id === video.id 
                                ? 'bg-primary text-primary-foreground' 
                                : cn(colors.bg, colors.text)
                            )}>
                              {selectedVideo?.id === video.id ? (
                                <Play className="h-4 w-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <span className={cn(
                              'text-sm font-medium leading-tight line-clamp-2',
                              selectedVideo?.id === video.id && 'text-primary'
                            )}>
                              {video.title}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
