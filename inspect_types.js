const fs = require('fs');
const content = fs.readFileSync('d:\\DSArena\\DSArena\\src\\integrations\\supabase\\types.ts', 'utf8');

// Find exam_answers definition
const match = content.match(/exam_answers: \{[\s\S]*?\}/);

if (match) {
    console.log('FOUND EXAM_ANSWERS:');
    console.log(match[0]);
} else {
    console.log('exam_answers NOT FOUND');
}
