var fs = require('fs');
var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
};
var gen = function *(){
    var f1 = yield readFile('1.txt');
    var f2 = yield readFile('2.txt');
    console.log(f1.toString());
    console.log(f2.toString());
}

var autoRun = function(gen){
    var g = gen();
    function next(data){
        var result = g.next(data);
        if(result.done){
            return result.value;
        }else{
            result.value.then(function(data){
                next(data);
            });
        }
    }
    next();
}

autoRun(gen);