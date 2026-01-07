import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Clock, Heart, Shield, Code, CheckCircle, Sparkles, Home, Code2 } from 'lucide-react';
import { ExamLanguage, getLanguageDisplayName, getProblemsByLanguage } from '@/lib/examUtils';

interface ExamStartScreenProps {
  onStart: (language: ExamLanguage) => void;
  isLoading: boolean;
  selectedTopic?: string | null;
}

export function ExamStartScreen({ onStart, isLoading, selectedTopic }: ExamStartScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<ExamLanguage | null>(null);

  const languages: ExamLanguage[] = ['python', 'javascript', 'java', 'cpp'];

  const getQuestionCount = (lang: ExamLanguage) => {
    let problems = getProblemsByLanguage(lang);
    if (lang === 'python' && selectedTopic && selectedTopic !== 'All') {
      problems = problems.filter(p => p.category === selectedTopic);
    }
    return problems.length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 relative">
      {/* Back to Home Button - Top Left */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-10"
      >
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-primary/10 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </Link>

      <div className="w-full p-4 max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="flex items-center justify-center gap-3 text-5xl font-bold">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-gradient-primary shrink-0">
              <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              <span className="text-lg sm:text-5xl font-bold">
                <span className="gradient-text">DSArena</span>
              </span> Exam
            </span>
          </h1>
          <p className="text-md text-muted-foreground max-w-md mx-auto">
            Test your coding skills in a secure, proctored environment
          </p>
        </div>

        <Card className="border-2 shadow-2xl">
          <CardContent className="p-8 space-y-6">
            {/* Exam Rules Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 p-1 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Exam Guidelines</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Duration */}
                <div className="group p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Clock className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base mb-1">1.5 Hours Duration</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Submit available after 2 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Questions */}
                <div className="group p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Code className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base mb-1">3 Random Questions</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedTopic && selectedTopic !== "All" && selectedLanguage === 'python'
                          ? `From topic: ${selectedTopic}`
                          : "From selected language track"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hearts */}
                <div className="group p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10">
                      <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base mb-1">3 Lives System</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Lose all lives if you exit fullscreen for 10+ seconds
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="group p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base mb-1">Security Measures</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Copy, paste, and refresh disabled
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3 pt-4">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                Select Programming Language
              </label>
              <Select
                value={selectedLanguage || undefined}
                onValueChange={(value) => setSelectedLanguage(value as ExamLanguage)}
              >
                <SelectTrigger className="w-full h-12 text-base border-2 hover:border-primary/50 transition-colors">
                  {selectedLanguage ? (
                    <span className="font-medium">
                      {getLanguageDisplayName(selectedLanguage)}
                      {selectedLanguage === 'python' && selectedTopic && selectedTopic !== 'All'
                        ? ` (${selectedTopic})`
                        : ''}
                    </span>
                  ) : (
                    <SelectValue placeholder="Choose a language" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang} className="cursor-pointer">
                      <div className="flex items-center justify-between w-full gap-4">
                        <span className="font-medium">
                          {getLanguageDisplayName(lang)}
                          {lang === 'python' && selectedTopic && selectedTopic !== 'All'
                            ? ` (${selectedTopic})`
                            : ''}
                        </span>
                        <Badge variant="secondary" className="ml-auto font-semibold">
                          {getQuestionCount(lang)} questions
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Confirmation Message */}
            {selectedLanguage && (
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-5 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="p-2 rounded-lg bg-primary/20">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-base mb-2">Ready to begin!</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You'll receive 3 random questions from the {getLanguageDisplayName(selectedLanguage)} track
                    {selectedTopic && selectedTopic !== "All" && selectedLanguage === 'python' ? ` (${selectedTopic})` : ""}.
                    The exam will open in fullscreen mode.
                  </p>
                </div>
              </div>
            )}

            {/* Start Button */}
            <Button
              className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
              onClick={() => selectedLanguage && onStart(selectedLanguage)}
              disabled={!selectedLanguage || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Starting Exam...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Start Exam
                  <Sparkles className="h-5 w-5" />
                </span>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground pt-2">
              By starting the exam, you agree to the proctoring rules and fair-play policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
