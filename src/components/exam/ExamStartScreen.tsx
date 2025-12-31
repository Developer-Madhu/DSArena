import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Clock, Heart, Shield, Code, CheckCircle } from 'lucide-react';
import { ExamLanguage, getLanguageDisplayName, getProblemsByLanguage } from '@/lib/examUtils';

interface ExamStartScreenProps {
  onStart: (language: ExamLanguage) => void;
  isLoading: boolean;
}

export function ExamStartScreen({ onStart, isLoading }: ExamStartScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<ExamLanguage | null>(null);

  const languages: ExamLanguage[] = ['python', 'javascript', 'java', 'cpp'];

  const getQuestionCount = (lang: ExamLanguage) => {
    return getProblemsByLanguage(lang).length;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">DSArena Exam</CardTitle>
          <CardDescription className="text-lg">
            Test your coding skills in a secure, timed environment
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Exam Rules */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Exam Rules
            </h3>
            
            <div className="grid gap-3 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">3 Hours Duration</p>
                  <p className="text-muted-foreground">Submit button enabled after 2 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Code className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">3 Random Questions</p>
                  <p className="text-muted-foreground">From your selected language track</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Heart className="h-4 w-4 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium">3 Hearts System</p>
                  <p className="text-muted-foreground">Tab switching, window blur, or fullscreen exit costs 1 heart</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Security Measures</p>
                  <p className="text-muted-foreground">Copy, paste, right-click, and refresh are disabled</p>
                </div>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Programming Language</label>
            <Select
              value={selectedLanguage || undefined}
              onValueChange={(value) => setSelectedLanguage(value as ExamLanguage)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    <div className="flex items-center justify-between w-full gap-4">
                      <span>{getLanguageDisplayName(lang)}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {getQuestionCount(lang)} questions
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Confirmation */}
          {selectedLanguage && (
            <div className="bg-primary/10 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Ready to start</p>
                <p className="text-sm text-muted-foreground">
                  You'll receive 3 random questions from the {getLanguageDisplayName(selectedLanguage)} track.
                  The exam will open in fullscreen mode.
                </p>
              </div>
            </div>
          )}

          {/* Start Button */}
          <Button
            className="w-full h-12 text-lg"
            onClick={() => selectedLanguage && onStart(selectedLanguage)}
            disabled={!selectedLanguage || isLoading}
          >
            {isLoading ? (
              'Starting Exam...'
            ) : (
              'Start Exam'
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By starting the exam, you agree to the proctoring rules and fair-play policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
