// Bonus code system for consecutive fast solves
import { supabase } from '@/integrations/supabase/client';

const FAST_SOLVE_THRESHOLD_SECONDS = 300; // 5 minutes
const BREAK_THRESHOLD_MS = 10 * 60 * 1000; // 10 minutes
const CONSECUTIVE_REQUIRED = 3;

interface FastSolveStatus {
  consecutiveFastSolves: number;
  lastFastSolveAt: Date | null;
  qualifiesForBonus: boolean;
}

// Check if user qualifies for bonus code
export async function checkBonusEligibility(userId: string): Promise<boolean> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('consecutive_fast_solves, last_fast_solve_at')
    .eq('id', userId)
    .single() as { data: any; error: any };

  if (error || !profile) return false;

  const consecutiveSolves = profile.consecutive_fast_solves || 0;
  const lastSolveAt = profile.last_fast_solve_at ? new Date(profile.last_fast_solve_at) : null;

  // Check if break was too long (resets the streak)
  if (lastSolveAt) {
    const timeSinceLastSolve = Date.now() - lastSolveAt.getTime();
    if (timeSinceLastSolve > BREAK_THRESHOLD_MS) {
      // Reset streak due to long break
      await resetFastSolveStreak(userId);
      return false;
    }
  }

  return consecutiveSolves >= CONSECUTIVE_REQUIRED;
}

// Record a fast solve
export async function recordFastSolve(userId: string, solveTimeSeconds: number): Promise<FastSolveStatus> {
  const isFastSolve = solveTimeSeconds <= FAST_SOLVE_THRESHOLD_SECONDS;
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('consecutive_fast_solves, last_fast_solve_at')
    .eq('id', userId)
    .single() as { data: any; error: any };

  if (error || !profile) {
    return { consecutiveFastSolves: 0, lastFastSolveAt: null, qualifiesForBonus: false };
  }

  let consecutiveSolves = profile.consecutive_fast_solves || 0;
  const lastSolveAt = profile.last_fast_solve_at ? new Date(profile.last_fast_solve_at) : null;

  // Check if break was too long (resets the streak)
  if (lastSolveAt) {
    const timeSinceLastSolve = Date.now() - lastSolveAt.getTime();
    if (timeSinceLastSolve > BREAK_THRESHOLD_MS) {
      consecutiveSolves = 0;
    }
  }

  if (isFastSolve) {
    consecutiveSolves++;
  } else {
    consecutiveSolves = 0;
  }

  // Update profile (using any cast due to column not in generated types)
  await supabase
    .from('profiles')
    .update({
      consecutive_fast_solves: consecutiveSolves,
      last_fast_solve_at: new Date().toISOString(),
    } as any)
    .eq('id', userId);

  const qualifiesForBonus = consecutiveSolves >= CONSECUTIVE_REQUIRED;
  
  return {
    consecutiveFastSolves: consecutiveSolves,
    lastFastSolveAt: new Date(),
    qualifiesForBonus,
  };
}

// Reset fast solve streak (called when bonus is used)
export async function resetFastSolveStreak(userId: string): Promise<void> {
  await supabase
    .from('profiles')
    .update({
      consecutive_fast_solves: 0,
    } as any)
    .eq('id', userId);
}

// Get bonus code based on language and problem type
export function getBonusCode(language: string, problemType?: string): string {
  const bonusCodes: Record<string, string> = {
    python: `# 🎁 BONUS CODE! Here's a head start for being fast!
# You've solved 3 problems quickly in a row!

def solution(data):
    """
    Helpful utilities included:
    - Input is already parsed for you
    - Common patterns pre-setup
    """
    # Parse your input
    lines = data.strip().split('\\n')
    
    # Your solution logic here
    result = None
    
    return result

# Main execution
if __name__ == "__main__":
    import sys
    data = sys.stdin.read()
    print(solution(data))
`,
    javascript: `// 🎁 BONUS CODE! Here's a head start for being fast!
// You've solved 3 problems quickly in a row!

const readline = require('readline');

function solution(lines) {
    // Helpful utilities included:
    // - Input lines are already split for you
    // - Parse numbers: lines[0].split(' ').map(Number)
    
    // Your solution logic here
    let result = null;
    
    return result;
}

// Main execution
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => console.log(solution(lines)));
`,
    java: `// 🎁 BONUS CODE! Here's a head start for being fast!
// You've solved 3 problems quickly in a row!

import java.util.*;
import java.io.*;

public class Main {
    // Helpful utilities included
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static PrintWriter out = new PrintWriter(System.out);
    
    static int[] readIntArray() throws IOException {
        return Arrays.stream(br.readLine().split(" "))
                     .mapToInt(Integer::parseInt)
                     .toArray();
    }
    
    public static void main(String[] args) throws IOException {
        // Parse input
        // int n = Integer.parseInt(br.readLine());
        // int[] arr = readIntArray();
        
        // Your solution here
        
        out.flush();
    }
}
`,
    cpp: `// 🎁 BONUS CODE! Here's a head start for being fast!
// You've solved 3 problems quickly in a row!

#include <bits/stdc++.h>
using namespace std;

// Fast I/O
#define FAST_IO ios::sync_with_stdio(false); cin.tie(nullptr);

// Helpful macros
#define FOR(i, a, b) for(int i = (a); i < (b); i++)
#define ALL(x) (x).begin(), (x).end()

int main() {
    FAST_IO
    
    // Parse input
    // int n; cin >> n;
    // vector<int> arr(n);
    // for(int& x : arr) cin >> x;
    
    // Your solution here
    
    return 0;
}
`,
    go: `// 🎁 BONUS CODE! Here's a head start for being fast!
// You've solved 3 problems quickly in a row!

package main

import (
    "bufio"
    "fmt"
    "os"
)

var reader = bufio.NewReader(os.Stdin)
var writer = bufio.NewWriter(os.Stdout)

func readInt() int {
    var n int
    fmt.Fscan(reader, &n)
    return n
}

func main() {
    defer writer.Flush()
    
    // Parse input
    // n := readInt()
    
    // Your solution here
    
}
`,
    rust: `// 🎁 BONUS CODE! Here's a head start for being fast!
// You've solved 3 problems quickly in a row!

use std::io::{self, BufRead, Write};

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = io::BufWriter::new(stdout.lock());
    
    let mut lines = stdin.lock().lines();
    
    // Parse input
    // let n: i32 = lines.next().unwrap().unwrap().parse().unwrap();
    
    // Your solution here
    
}
`,
  };

  return bonusCodes[language] || bonusCodes.python;
}

// Check if user should see bonus notification
export async function shouldShowBonusNotification(userId: string): Promise<boolean> {
  return await checkBonusEligibility(userId);
}
