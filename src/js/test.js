function test(r) {
   var RegExp = /^(0|[1-9][0-9]{0,10})(\.[0-9]{1,2})?$/;
   console.log(RegExp.test(r));
}

test('00001');