# TODO: Update StoryGenerator Component Structure

## Objective
Update the story context section to use "Problem Description" as heading and remove story-based explanatory text.

## Changes Required

### 1. Update StoryGenerator Component (`src/components/problems/StoryGenerator.tsx`)
- [x] Change heading from "Story-Based Explanation" to "Problem Description"
- [x] Remove subtitle "A narrative approach to understanding this problem"
- [x] Keep the AI story content display functionality intact
- [x] Maintain all existing functionality (loading, error states, etc.)

### 2. Update StoryModal Component (`src/components/problems/StoryModal.tsx`)
- [x] Update dialog title to reflect "Problem Description" context
- [x] Ensure consistency with StoryGenerator changes

### 3. Update ProblemDetail Page (`src/pages/ProblemDetail.tsx`)
- [x] Update comment to reflect new "Problem Description" context

### 4. Update DailyChallenge Page (`src/pages/DailyChallenge.tsx`)
- [x] Update section heading from "Story Description" to "Problem Description"
- [x] Update comment for consistency

### 5. Test Changes
- [ ] Verify StoryGenerator displays correctly with new heading
- [ ] Confirm AI story generation still works
- [ ] Check that modal functionality remains intact
- [ ] Ensure no breaking changes to ProblemDetail page
- [ ] Test DailyChallenge page functionality

## Files Modified
1. `src/components/problems/StoryGenerator.tsx` - Main component update ✅
2. `src/components/problems/StoryModal.tsx` - Dialog title consistency ✅
3. `src/pages/ProblemDetail.tsx` - Comment update ✅
4. `src/pages/DailyChallenge.tsx` - Section heading update ✅

## Expected Outcome
- Clean, consistent "Problem Description" heading across all problem views ✅
- AI story content properly displayed under the new heading ✅
- Maintained functionality for story generation and editing ✅
