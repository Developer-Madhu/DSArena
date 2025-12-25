// Practice Problems Index Page - Shows all available practice problems
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { practiceProblemsData } from '@/lib/practiceProblemsData';
import {
  ArrowRight,
  Code,
  Target,
  Star,
  Zap,
  BookOpen,
  Home,
  ChevronRight,
} from 'lucide-react';

export default function PracticeProblemsIndex() {
  const navigate = useNavigate();

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('pattern') || 
        category.includes('Ascending') || 
        category.includes('Descending') ||
        category.includes('Stars') ||
        category.includes('Pattern')) {
      return <Star className="h-4 w-4" />;
    } else if (category.toLowerCase().includes('prime')) {
      return <Zap className="h-4 w-4" />;
    } else if (category.toLowerCase().includes('fibonacci')) {
      return <Target className="h-4 w-4" />;
    } else if (category.toLowerCase().includes('palindrome') || category.toLowerCase().includes('armstrong')) {
      return <BookOpen className="h-4 w-4" />;
    }
    return <Code className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    if (category.toLowerCase().includes('pattern') || 
        category.includes('Ascending') || 
        category.includes('Descending') ||
        category.includes('Stars') ||
        category.includes('Pattern')) {
      return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
    } else if (category.toLowerCase().includes('prime')) {
      return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
    } else if (category.toLowerCase().includes('fibonacci')) {
      return 'bg-green-500/20 text-green-700 border-green-500/30';
    } else if (category.toLowerCase().includes('palindrome') || category.toLowerCase().includes('armstrong')) {
      return 'bg-orange-500/20 text-orange-700 border-orange-500/30';
    }
    return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
  };

  const handleProblemClick = (slug: string) => {
    navigate(`/practice-problems/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
                <Code className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Practice Problems</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master fundamental programming concepts with hands-on practice problems. 
              No lives, no pressure – just pure coding practice!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>8 Problems</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Pattern Printing</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Number Theory</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Series & Algorithms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Pattern Printing Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-primary" />
              Pattern Printing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {practiceProblemsData.filter(p => 
                p.title.includes('Pattern') || 
                p.slug.includes('ascending-numbers') ||
                p.slug.includes('descending-numbers') ||
                p.slug.includes('left-stars') ||
                p.slug.includes('right-stars')
              ).map((problem) => (
                <Card 
                  key={problem.id} 
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => handleProblemClick(problem.slug)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className={getCategoryColor(problem.title)}>
                        {getCategoryIcon(problem.title)}
                        <span className="ml-1 text-xs">Pattern</span>
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {problem.title.replace('Print ', '').replace(' Pattern', '')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {problem.description.split('.')[0]}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {problem.visibleTestCases.length} examples
                      </span>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Number Theory Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Number Theory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {practiceProblemsData.filter(p => p.slug === 'prime-numbers').map((problem) => (
                <Card 
                  key={problem.id} 
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => handleProblemClick(problem.slug)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className={getCategoryColor(problem.title)}>
                        {getCategoryIcon(problem.title)}
                        <span className="ml-1 text-xs">Number Theory</span>
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {problem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      Find all prime numbers less than a given number n.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {problem.visibleTestCases.length} examples
                      </span>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Series & Sequences Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Series & Sequences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {practiceProblemsData.filter(p => p.slug === 'fibonacci-series').map((problem) => (
                <Card 
                  key={problem.id} 
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => handleProblemClick(problem.slug)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className={getCategoryColor(problem.title)}>
                        {getCategoryIcon(problem.title)}
                        <span className="ml-1 text-xs">Series</span>
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {problem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      Generate the Fibonacci sequence up to the nth number.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {problem.visibleTestCases.length} examples
                      </span>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Algorithm Checks Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Algorithm Checks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceProblemsData.filter(p => p.slug === 'palindrome-check' || p.slug === 'armstrong-check').map((problem) => (
                <Card 
                  key={problem.id} 
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => handleProblemClick(problem.slug)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className={getCategoryColor(problem.title)}>
                        {getCategoryIcon(problem.title)}
                        <span className="ml-1 text-xs">Check</span>
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {problem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {problem.slug === 'palindrome-check' 
                        ? 'Check if a number reads the same forwards and backwards.'
                        : 'Check if a number equals the sum of its digits raised to the power of the number of digits.'
                      }
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {problem.visibleTestCases.length} examples
                      </span>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to Practice?</h3>
            <p className="text-muted-foreground mb-4">
              Choose any problem above to start coding. No time pressure, no lives system – just pure practice!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/problems')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                DSA Problems
              </Button>
              <Button 
                onClick={() => handleProblemClick(practiceProblemsData[0].slug)}
              >
                Start First Problem
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
