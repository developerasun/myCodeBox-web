 // unit test : for browser compatibility, do unit test like below. 
 // Object.keys method is added in ECMA 5. So it is not supported 
 // previous JS version. To make the method compatible, add codes like below. 

 if (!Object.keys) {
     Object.keys = function () {
         // corresponding codes here
     }
 }
