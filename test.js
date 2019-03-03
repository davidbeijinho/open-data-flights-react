function test(myArg) {  
    console.log(`${myArg} -- ${arguments[0]}`);  
    arguments[0] = 20;  
    console.log(`${myArg} -- ${arguments[0]}`);  
  }  
    
  test(10);