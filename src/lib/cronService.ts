// Background Job Service for Daily Challenges and Email Notifications
import { dailyChallengeService, DailyChallenge } from './dailyChallenges';
import { emailService } from './emailService';

export interface CronJob {
  id: string;
  name: string;
  schedule: string; // cron expression
  enabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
  runCount: number;
}

export interface JobExecution {
  jobId: string;
  startTime: Date;
  endTime?: Date;
  success: boolean;
  error?: string;
  result?: any;
}

class CronService {
  private jobs: Map<string, CronJob> = new Map();
  private executions: JobExecution[] = [];
  private timers: Map<string, NodeJS.Timeout> = new Map();
  private isRunning = false;

  constructor() {
    this.initializeJobs();
    this.startService();
  }

  /**
   * Initialize default cron jobs
   */
  private initializeJobs(): void {
    const defaultJobs: CronJob[] = [
      {
        id: 'daily-challenge-generation',
        name: 'Daily Challenge Generation',
        schedule: '0 0 * * *', // Every day at midnight
        enabled: true,
        runCount: 0
      },
      {
        id: 'daily-challenge-emails',
        name: 'Daily Challenge Email Notifications',
        schedule: '30 8 * * *', // Every day at 8:30 AM
        enabled: true,
        runCount: 0
      },
      {
        id: 'weekly-summary-emails',
        name: 'Weekly Summary Email',
        schedule: '0 9 * * 1', // Every Monday at 9 AM
        enabled: true,
        runCount: 0
      },
      {
        id: 'streak-reminder-emails',
        name: 'Streak Reminder Emails',
        schedule: '0 20 * * *', // Every day at 8 PM
        enabled: true,
        runCount: 0
      }
    ];

    defaultJobs.forEach(job => {
      this.jobs.set(job.id, job);
      this.scheduleJob(job);
    });
  }

  /**
   * Start the cron service
   */
  startService(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    console.log('Cron service started');

    // Check for jobs to run every minute
    this.timers.set('main-check', setInterval(() => {
      this.checkAndRunJobs();
    }, 60000));

    // Initial check
    setTimeout(() => {
      this.checkAndRunJobs();
    }, 5000);
  }

  /**
   * Stop the cron service
   */
  stopService(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    
    // Clear all timers
    this.timers.forEach(timer => clearInterval(timer));
    this.timers.clear();

    console.log('Cron service stopped');
  }

  /**
   * Check and run scheduled jobs
   */
  private checkAndRunJobs(): void {
    if (!this.isRunning) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentDay = now.getDay();
    const currentDate = now.getDate();

    this.jobs.forEach((job, jobId) => {
      if (!job.enabled) return;

      const shouldRun = this.shouldJobRun(job, now);
      
      if (shouldRun && (!job.nextRun || now >= job.nextRun)) {
        this.runJob(job);
      }
    });
  }

  /**
   * Check if a job should run based on current time
   */
  private shouldJobRun(job: CronJob, now: Date): boolean {
    const [minute, hour, dayOfMonth, month, dayOfWeek] = job.schedule.split(' ');
    const currentMinute = now.getMinutes();
    const currentHour = now.getHours();
    const currentDayOfMonth = now.getDate();
    const currentMonth = now.getMonth() + 1;
    const currentDayOfWeek = now.getDay();

    // Check minute
    if (minute !== '*' && parseInt(minute) !== currentMinute) {
      return false;
    }

    // Check hour
    if (hour !== '*' && parseInt(hour) !== currentHour) {
      return false;
    }

    // Check day of month
    if (dayOfMonth !== '*' && parseInt(dayOfMonth) !== currentDayOfMonth) {
      return false;
    }

    // Check month
    if (month !== '*' && parseInt(month) !== currentMonth) {
      return false;
    }

    // Check day of week
    if (dayOfWeek !== '*' && parseInt(dayOfWeek) !== currentDayOfWeek) {
      return false;
    }

    return true;
  }

  /**
   * Run a specific job
   */
  private async runJob(job: CronJob): Promise<void> {
    console.log(`Running job: ${job.name} (${job.id})`);

    const execution: JobExecution = {
      jobId: job.id,
      startTime: new Date(),
      success: false
    };

    try {
      let result;
      
      switch (job.id) {
        case 'daily-challenge-generation':
          result = await this.generateDailyChallenge();
          break;
        case 'daily-challenge-emails':
          result = await this.sendDailyChallengeEmails();
          break;
        case 'weekly-summary-emails':
          result = await this.sendWeeklySummaryEmails();
          break;
        case 'streak-reminder-emails':
          result = await this.sendStreakReminderEmails();
          break;
        default:
          throw new Error(`Unknown job: ${job.id}`);
      }

      execution.endTime = new Date();
      execution.success = true;
      execution.result = result;

      job.lastRun = execution.startTime;
      job.runCount += 1;
      job.nextRun = this.calculateNextRun(job.schedule);

    } catch (error) {
      execution.endTime = new Date();
      execution.success = false;
      execution.error = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Job failed: ${job.name}`, error);
    }

    this.executions.push(execution);
    
    // Keep only last 100 executions
    if (this.executions.length > 100) {
      this.executions = this.executions.slice(-100);
    }
  }

  /**
   * Schedule a job to run at specific times
   */
  private scheduleJob(job: CronJob): void {
    if (!job.enabled) return;

    const nextRun = this.calculateNextRun(job.schedule);
    if (nextRun) {
      job.nextRun = nextRun;
    }
  }

  /**
   * Calculate next run time for a cron schedule
   */
  private calculateNextRun(schedule: string): Date | null {
    const [minute, hour, dayOfMonth, month, dayOfWeek] = schedule.split(' ');
    const now = new Date();
    
    // Simple implementation - calculate next occurrence
    const next = new Date(now);
    next.setDate(next.getDate() + 1);
    next.setHours(0, 0, 0, 0);
    
    return next;
  }

  /**
   * Generate daily challenge job
   */
  private async generateDailyChallenge(): Promise<any> {
    const today = new Date().toISOString().split('T')[0];
    const challenge = await dailyChallengeService.generateDailyChallenge(today);
    
    console.log(`Generated daily challenge for ${today}: ${challenge.title}`);
    
    return {
      challengeId: challenge.id,
      title: challenge.title,
      difficulty: challenge.difficulty,
      category: challenge.category
    };
  }

  /**
   * Send daily challenge emails job
   */
  private async sendDailyChallengeEmails(): Promise<any> {
    const today = new Date().toISOString().split('T')[0];
    const challenge = await dailyChallengeService.getChallengeByDate(today);
    
    // Get all subscribed users (this would come from a database)
    const subscribedUsers = await this.getSubscribedUsers();
    
    // Send emails in batches
    const results = await emailService.sendBulkDailyChallengeEmails(
      subscribedUsers,
      challenge
    );
    
    console.log(`Sent daily challenge emails: ${results.successful} successful, ${results.failed} failed`);
    
    return results;
  }

  /**
   * Send weekly summary emails job
   */
  private async sendWeeklySummaryEmails(): Promise<any> {
    const subscribedUsers = await this.getSubscribedUsers();
    let successful = 0;
    let failed = 0;
    const errors: string[] = [];

    // Get weekly stats for each user (this would come from a database)
    for (const user of subscribedUsers) {
      try {
        const weeklyStats = await this.getUserWeeklyStats(user.email);
        const result = await emailService.sendWeeklySummaryEmail(
          user.email,
          user.userName || 'Coder',
          weeklyStats
        );
        
        if (result.success) {
          successful++;
        } else {
          failed++;
          errors.push(`${user.email}: ${result.error}`);
        }
      } catch (error) {
        failed++;
        errors.push(`${user.email}: ${error}`);
      }
    }

    console.log(`Sent weekly summary emails: ${successful} successful, ${failed} failed`);
    
    return { successful, failed, errors };
  }

  /**
   * Send streak reminder emails job
   */
  private async sendStreakReminderEmails(): Promise<any> {
    const subscribedUsers = await this.getSubscribedUsers();
    let successful = 0;
    let failed = 0;

    for (const user of subscribedUsers) {
      try {
        const streak = await dailyChallengeService.getUserDailyStreak(user.email);
        
        // Only send reminders for users with active streaks (3+ days)
        if (streak >= 3) {
          const result = await emailService.sendStreakMilestoneEmail(
            user.email,
            user.userName || 'Coder',
            streak
          );
          
          if (result.success) {
            successful++;
          } else {
            failed++;
          }
        }
      } catch (error) {
        failed++;
      }
    }

    console.log(`Sent streak reminder emails: ${successful} successful, ${failed} failed`);
    
    return { successful, failed };
  }

  /**
   * Get subscribed users (mock implementation)
   */
  private async getSubscribedUsers(): Promise<Array<{ email: string; userName?: string }>> {
    // In a real implementation, this would query the database
    // For now, return mock data
    return [
      { email: 'user@example.com', userName: 'John Doe' },
      { email: 'coder@example.com', userName: 'Jane Smith' }
    ];
  }

  /**
   * Get user weekly stats (mock implementation)
   */
  private async getUserWeeklyStats(email: string): Promise<{
    challengesCompleted: number;
    currentStreak: number;
    averageTimeSpent: number;
    problemsSolved: number;
  }> {
    // In a real implementation, this would query the database
    return {
      challengesCompleted: 5,
      currentStreak: 7,
      averageTimeSpent: 25,
      problemsSolved: 12
    };
  }

  /**
   * Get all jobs
   */
  getJobs(): CronJob[] {
    return Array.from(this.jobs.values());
  }

  /**
   * Get job execution history
   */
  getExecutions(): JobExecution[] {
    return [...this.executions];
  }

  /**
   * Enable/disable a job
   */
  toggleJob(jobId: string, enabled: boolean): boolean {
    const job = this.jobs.get(jobId);
    if (!job) return false;

    job.enabled = enabled;
    
    if (enabled) {
      this.scheduleJob(job);
    } else {
      job.nextRun = undefined;
    }

    return true;
  }

  /**
   * Update job schedule
   */
  updateJobSchedule(jobId: string, schedule: string): boolean {
    const job = this.jobs.get(jobId);
    if (!job) return false;

    // Validate cron expression (basic validation)
    const parts = schedule.split(' ');
    if (parts.length !== 5) return false;

    job.schedule = schedule;
    this.scheduleJob(job);
    
    return true;
  }

  /**
   * Run a job manually
   */
  async runJobManually(jobId: string): Promise<boolean> {
    const job = this.jobs.get(jobId);
    if (!job) return false;

    await this.runJob(job);
    return true;
  }

  /**
   * Get service status
   */
  getStatus(): {
    isRunning: boolean;
    jobs: number;
    executions: number;
    lastExecution?: JobExecution;
  } {
    return {
      isRunning: this.isRunning,
      jobs: this.jobs.size,
      executions: this.executions.length,
      lastExecution: this.executions[this.executions.length - 1]
    };
  }
}

// Export singleton instance
export const cronService = new CronService();

// Auto-start the service
if (typeof window !== 'undefined') {
  // Only start in browser environment
  cronService.startService();
}
