// Email Service for Daily Challenge Notifications
import { DailyChallenge } from './dailyChallenges';

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailNotification {
  to: string;
  template: EmailTemplate;
  priority?: 'high' | 'normal' | 'low';
  scheduledFor?: string;
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailService {
  private readonly API_KEY = 'AIzaSyALrlxecmAarC-gYt3FNeFVA8XvTkHMGk0'; // This would be replaced with actual email service API key
  private readonly FROM_EMAIL = 'noreply@dsarena.com';
  private readonly FROM_NAME = 'DSArena Daily Challenge';

  /**
   * Send daily challenge notification email
   */
  async sendDailyChallengeEmail(
    email: string, 
    challenge: DailyChallenge, 
    userName?: string
  ): Promise<EmailResponse> {
    try {
      const template = this.generateDailyChallengeTemplate(challenge, userName);
      
      // In a real implementation, this would call an actual email service
      // For now, we'll simulate the email sending
      const response = await this.simulateEmailSending(email, template);
      
      if (response.success) {
        console.log(`Daily challenge email sent to ${email}`);
      }
      
      return response;
    } catch (error) {
      console.error('Failed to send daily challenge email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send streak milestone notification
   */
  async sendStreakMilestoneEmail(
    email: string, 
    userName: string, 
    streakDays: number
  ): Promise<EmailResponse> {
    try {
      const template = this.generateStreakMilestoneTemplate(userName, streakDays);
      return await this.simulateEmailSending(email, template);
    } catch (error) {
      console.error('Failed to send streak milestone email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send challenge completion congratulations
   */
  async sendChallengeCompletedEmail(
    email: string, 
    userName: string, 
    challengeTitle: string,
    streakDays: number
  ): Promise<EmailResponse> {
    try {
      const template = this.generateChallengeCompletedTemplate(userName, challengeTitle, streakDays);
      return await this.simulateEmailSending(email, template);
    } catch (error) {
      console.error('Failed to send challenge completion email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send weekly challenge summary
   */
  async sendWeeklySummaryEmail(
    email: string, 
    userName: string, 
    weeklyStats: {
      challengesCompleted: number;
      currentStreak: number;
      averageTimeSpent: number;
      problemsSolved: number;
    }
  ): Promise<EmailResponse> {
    try {
      const template = this.generateWeeklySummaryTemplate(userName, weeklyStats);
      return await this.simulateEmailSending(email, template);
    } catch (error) {
      console.error('Failed to send weekly summary email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate daily challenge email template
   */
  private generateDailyChallengeTemplate(
    challenge: DailyChallenge, 
    userName?: string
  ): EmailTemplate {
    const greeting = userName ? `Hi ${userName},` : 'Hello coder,';
    const difficultyColor = this.getDifficultyColor(challenge.difficulty);
    const difficultyEmoji = this.getDifficultyEmoji(challenge.difficulty);

    const subject = `🚀 New Daily Challenge: ${challenge.title}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Challenge - ${challenge.title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 12px 12px 0 0;
            text-align: center;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .challenge-card {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .difficulty-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            ${difficultyColor}
        }
        .cta-button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Daily Challenge</h1>
        <p>Your coding journey continues!</p>
    </div>
    
    <div class="content">
        <p>${greeting}</p>
        
        <p>A new coding challenge awaits you today! Here's what's waiting:</p>
        
        <div class="challenge-card">
            <h2>${challenge.title}</h2>
            <span class="difficulty-badge">${difficultyEmoji} ${challenge.difficulty}</span>
            <p><strong>Category:</strong> ${challenge.category}</p>
            <p>${challenge.description.substring(0, 200)}...</p>
        </div>
        
        <p>Complete today's challenge to maintain your coding streak and earn achievement badges!</p>
        
        <center>
            <a href="${process.env.REACT_APP_URL || 'http://localhost:5173'}/daily-challenge" class="cta-button">
                Start Today's Challenge
            </a>
        </center>
        
        <p>Keep coding and see you on the leaderboard!</p>
        
        <p>Best regards,<br>The DSArena Team</p>
    </div>
    
    <div class="footer">
        <p>You're receiving this because you're subscribed to DSArena daily challenges.</p>
        <p>
            <a href="${process.env.REACT_APP_URL || 'http://localhost:5173'}/unsubscribe">Unsubscribe</a> | 
            <a href="${process.env.REACT_APP_URL || 'http://localhost:5173'}/settings">Notification Settings</a>
        </p>
    </div>
</body>
</html>
    `;

    const text = `
${greeting}

A new coding challenge awaits you today!

${challenge.title}
${difficultyEmoji} ${challenge.difficulty.toUpperCase()} | ${challenge.category}

${challenge.description.substring(0, 200)}...

Complete today's challenge to maintain your coding streak and earn achievement badges!

Start today's challenge: ${process.env.REACT_APP_URL || 'http://localhost:5173'}/daily-challenge

Keep coding and see you on the leaderboard!

Best regards,
The DSArena Team
    `;

    return { subject, html, text };
  }

  /**
   * Generate streak milestone email template
   */
  private generateStreakMilestoneTemplate(
    userName: string, 
    streakDays: number
  ): EmailTemplate {
    const subject = `🎉 Incredible! ${streakDays}-Day Coding Streak!`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${streakDays}-Day Streak Achievement</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .header {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 30px;
            border-radius: 12px 12px 0 0;
            text-align: center;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .streak-display {
            font-size: 48px;
            font-weight: bold;
            color: #f5576c;
            text-align: center;
            margin: 20px 0;
        }
        .achievement-badge {
            background: #fef3c7;
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
        }
        .cta-button {
            display: inline-block;
            background: #f5576c;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Streak Achievement!</h1>
        <p>You're on fire!</p>
    </div>
    
    <div class="content">
        <p>Hi ${userName},</p>
        
        <p>Congratulations! You've achieved an incredible <strong>${streakDays}-day coding streak</strong>!</p>
        
        <div class="streak-display">${streakDays}</div>
        
        <div class="achievement-badge">
            <h3>🔥 Coding Champion</h3>
            <p>You've solved challenges for ${streakDays} consecutive days!</p>
        </div>
        
        <p>Your dedication to daily coding is inspiring. Keep up the amazing work!</p>
        
        <center>
            <a href="${process.env.REACT_APP_URL || 'http://localhost:5173'}/daily-challenge" class="cta-button">
                Continue Your Streak
            </a>
        </center>
        
        <p>See you tomorrow for another challenge!</p>
        
        <p>Best regards,<br>The DSArena Team</p>
    </div>
</body>
</html>
    `;

    const text = `
Hi ${userName},

Congratulations! You've achieved an incredible ${streakDays}-day coding streak!

Your dedication to daily coding is inspiring. Keep up the amazing work!

Continue your streak: ${process.env.REACT_APP_URL || 'http://localhost:5173'}/daily-challenge

See you tomorrow for another challenge!

Best regards,
The DSArena Team
    `;

    return { subject, html, text };
  }

  /**
   * Generate challenge completion email template
   */
  private generateChallengeCompletedTemplate(
    userName: string, 
    challengeTitle: string,
    streakDays: number
  ): EmailTemplate {
    const subject = `✅ Challenge Completed: ${challengeTitle}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Challenge Completed</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 30px;
            border-radius: 12px 12px 0 0;
            text-align: center;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .success-icon {
            font-size: 64px;
            text-align: center;
            margin: 20px 0;
        }
        .streak-display {
            font-size: 24px;
            font-weight: bold;
            color: #4facfe;
            text-align: center;
            margin: 20px 0;
        }
        .cta-button {
            display: inline-block;
            background: #4facfe;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>✅ Challenge Completed!</h1>
        <p>Great job!</p>
    </div>
    
    <div class="content">
        <p>Hi ${userName},</p>
        
        <div class="success-icon">🎉</div>
        
        <p>Congratulations! You've successfully completed today's challenge: <strong>${challengeTitle}</strong></p>
        
        <div class="streak-display">
            🔥 ${streakDays}-Day Streak!
        </div>
        
        <p>You're making incredible progress. Every challenge you complete strengthens your problem-solving skills!</p>
        
        <center>
            <a href="${process.env.REACT_APP_URL || 'http://localhost:5173'}/dashboard" class="cta-button">
                View Your Progress
            </a>
        </center>
        
        <p>Come back tomorrow for a new challenge and keep your streak alive!</p>
        
        <p>Best regards,<br>The DSArena Team</p>
    </div>
</body>
</html>
    `;

    const text = `
Hi ${userName},

Congratulations! You've successfully completed today's challenge: ${challengeTitle}

🔥 ${streakDays}-Day Streak!

You're making incredible progress. Come back tomorrow for a new challenge!

View your progress: ${process.env.REACT_APP_URL || 'http://localhost:5173'}/dashboard

Best regards,
The DSArena Team
    `;

    return { subject, html, text };
  }

  /**
   * Generate weekly summary email template
   */
  private generateWeeklySummaryTemplate(
    userName: string, 
    stats: {
      challengesCompleted: number;
      currentStreak: number;
      averageTimeSpent: number;
      problemsSolved: number;
    }
  ): EmailTemplate {
    const subject = `📊 Your Weekly Coding Summary`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weekly Summary</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .header {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            color: #333;
            padding: 30px;
            border-radius: 12px 12px 0 0;
            text-align: center;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .stat-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
        }
        .stat-label {
            color: #64748b;
            font-size: 14px;
            margin-top: 5px;
        }
        .cta-button {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Weekly Summary</h1>
        <p>Your coding progress this week</p>
    </div>
    
    <div class="content">
        <p>Hi ${userName},</p>
        
        <p>Here's a summary of your coding journey this week:</p>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${stats.challengesCompleted}</div>
                <div class="stat-label">Daily Challenges</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.currentStreak}</div>
                <div class="stat-label">Current Streak</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${Math.round(stats.averageTimeSpent)}</div>
                <div class="stat-label">Avg. Time (min)</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.problemsSolved}</div>
                <div class="stat-label">Problems Solved</div>
            </div>
        </div>
        
        <p>You're doing amazing! Keep up the consistent practice.</p>
        
        <center>
            <a href="${process.env.REACT_APP_URL || 'http://localhost:5173'}/dashboard" class="cta-button">
                View Full Dashboard
            </a>
        </center>
        
        <p>Looking forward to seeing your progress next week!</p>
        
        <p>Best regards,<br>The DSArena Team</p>
    </div>
</body>
</html>
    `;

    const text = `
Hi ${userName},

Here's your weekly coding summary:

📊 Daily Challenges: ${stats.challengesCompleted}
🔥 Current Streak: ${stats.currentStreak} days
⏱️ Average Time: ${Math.round(stats.averageTimeSpent)} minutes
✅ Problems Solved: ${stats.problemsSolved}

Keep up the amazing work!

View full dashboard: ${process.env.REACT_APP_URL || 'http://localhost:5173'}/dashboard

Best regards,
The DSArena Team
    `;

    return { subject, html, text };
  }

  /**
   * Simulate email sending (replace with actual email service)
   */
  private async simulateEmailSending(
    email: string, 
    template: EmailTemplate
  ): Promise<EmailResponse> {
    // In a real implementation, this would integrate with services like:
    // - SendGrid
    // - AWS SES
    // - Mailgun
    // - Resend
    // - etc.
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success/failure
        const success = Math.random() > 0.1; // 90% success rate
        
        if (success) {
          resolve({
            success: true,
            messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          });
        } else {
          resolve({
            success: false,
            error: 'Simulated email service error'
          });
        }
      }, 1000);
    });
  }

  /**
   * Get difficulty color for email template
   */
  private getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy':
        return 'background: #dcfce7; color: #166534;';
      case 'medium':
        return 'background: #fef3c7; color: #92400e;';
      case 'hard':
        return 'background: #fecaca; color: #991b1b;';
      default:
        return 'background: #f1f5f9; color: #475569;';
    }
  }

  /**
   * Get difficulty emoji for email template
   */
  private getDifficultyEmoji(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  }

  /**
   * Bulk send daily challenge emails
   */
  async sendBulkDailyChallengeEmails(
    recipients: Array<{ email: string; userName?: string }>,
    challenge: DailyChallenge
  ): Promise<{ successful: number; failed: number; errors: string[] }> {
    let successful = 0;
    let failed = 0;
    const errors: string[] = [];

    // Process emails in batches to avoid overwhelming the email service
    const batchSize = 10;
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      
      const promises = batch.map(async ({ email, userName }) => {
        try {
          const result = await this.sendDailyChallengeEmail(email, challenge, userName);
          if (result.success) {
            successful++;
          } else {
            failed++;
            errors.push(`${email}: ${result.error}`);
          }
        } catch (error) {
          failed++;
          errors.push(`${email}: ${error}`);
        }
      });

      await Promise.all(promises);
      
      // Add delay between batches
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return { successful, failed, errors };
  }
}

// Export singleton instance
export const emailService = new EmailService();
