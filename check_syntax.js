const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('frontend/my-bookings.html', 'utf8');
// Find script block that starts with <script> and doesn't have src
const scriptMatch = html.match(/<script(?!\s+src)>([\s\S]*?)<\/script>/);

if (scriptMatch) {
  const js = scriptMatch[1];
  // To find the exact line in my-bookings.html, we need to know where the script block starts.
  const linesBefore = html.split('<script')[0].split('\n').length;
  console.log(`Script starts around line ${linesBefore + 1}`);
  
  try {
    new vm.Script(js, { filename: 'my-bookings.html', lineOffset: linesBefore });
    console.log("Success: No syntax error found!");
  } catch (err) {
    console.error("Syntax Error Details:");
    console.error(err.stack || err.message);
  }
} else {
  console.log("No inline <script> tag found");
}
