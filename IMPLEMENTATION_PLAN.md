# DSArena Feature Implementation Plan

## Features to Implement

### 1. Change Lives Restore Time from 24 Hours to 10 Minutes
- **Current**: Lives restore after 24 hours (86400000ms)
- **Target**: Lives restore after 10 minutes (600000ms)
- **Files to modify**: 
  - `/src/lib/livesSystem.ts`
  - Any hardcoded references in other files

### 2. Enhanced Problem Descriptions
- **Current**: Basic descriptions with examples
- **Target**: More comprehensive descriptions with detailed explanations, hints, and approach suggestions
- **Files to modify**:
  - `/src/lib/problemsData.ts`
  - `/src/lib/pythonProblemsData.ts`
  - `/src/lib/javascriptProblemsData.ts`
  - `/src/lib/javaProblemsData.ts`
  - `/src/lib/cppProblemsData.ts`

### 3. Scrollable Code Editor and Test Cases
- **Current**: Fixed layout with limited scrolling
- **Target**: Fully scrollable code editor and test cases section
- **Files to modify**:
  - `/src/components/editor/CodeEditor.tsx`
  - `/src/components/problems/TestCasePanel.tsx`
  - `/src/pages/ProblemDetail.tsx` (layout adjustments)

### 4. Persistent User Dashboard with Streak Badges
- **Current**: Basic dashboard with streak display
- **Target**: Enhanced dashboard with persistent data and shareable streak badges
- **Features**:
  - Data persistence after logout
  - Badge system for achievements
  - Social sharing capabilities (LinkedIn, Twitter, etc.)
- **Files to modify**:
  - `/src/pages/Dashboard.tsx`
  - `/src/lib/progressStorage.ts`
  - New badge component files
  - `/src/integrations/supabase/types.ts` (for badge data)

## Implementation Steps

### Phase 1: Lives System Update
1. Update `TWENTY_FOUR_HOURS` constant to `TEN_MINUTES`
2. Update all time calculations and display messages
3. Test the new 10-minute restore functionality

### Phase 2: Enhanced Descriptions
1. Expand problem descriptions with more context
2. Add approach hints and complexity analysis
3. Include time/space complexity information
4. Add edge case discussions

### Phase 3: Scrollable Components
1. Modify CodeEditor to be fully scrollable
2. Enhance TestCasePanel scrolling
3. Adjust responsive layout in ProblemDetail
4. Ensure proper overflow handling

### Phase 4: Dashboard Enhancement
1. Implement badge system with achievement categories
2. Add persistent data storage
3. Create shareable badge generation
4. Add social sharing integration
5. Enhance user profile and statistics

## Technical Considerations
- Maintain backward compatibility
- Ensure responsive design across devices
- Optimize performance for larger descriptions
- Implement proper data validation
- Add error handling for new features

## Testing Strategy
1. Test lives restoration timing
2. Verify scrollable components work on different screen sizes
3. Test badge system functionality
4. Validate social sharing features
5. Check data persistence across sessions
