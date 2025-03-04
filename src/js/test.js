function test(content) {
   console.log(content.replace(/console\.log\([^)]*\);?/g, ''));
   AQ1071
}

test("console.log(console.log(xxxx)xxxxx)");