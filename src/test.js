let content = 'export default function count(num) { console.log(num); return num + 1;}'

console.log(content.replace(/console\.log\(.*\);?/gm, ''));