import { VideoItem } from '@/lib/videosData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
  videos: VideoItem[];
  onSelect: (v: VideoItem) => void;
};

function getThumb(youtubeId?: string) {
  return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : undefined;
}

export function VideosList({ videos, onSelect }: Props) {
  return (
    <div className="space-y-2">
      {videos.map((v) => (
        <div
          key={v.id}
          role="button"
          tabIndex={0}
          onClick={() => onSelect(v)}
          className="flex items-center gap-3 p-3 rounded-md hover:bg-accent/5 focus:outline-none transition cursor-pointer"
        >
          <div className="w-28 h-16 rounded-md overflow-hidden bg-muted/10 flex-shrink-0">
            {getThumb(v.youtubeId) ? (
              <img src={getThumb(v.youtubeId)} alt={v.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">No preview</div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-sm sm:text-base truncate">{v.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Button {...({ variant: 'ghost', size: 'sm' } as any)} onClick={(e) => { e.stopPropagation(); onSelect(v); }}>
                  Play
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
