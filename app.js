var express= require('express'),
    app= express(), 
    ejs = require('ejs'),
    request = require('request'),
    worker_orders,
    workers=[],
    sorter=[];

app.set("view engine", "ejs");
app.use (express.static(__dirname+"/public"));


request("https://www.hatchways.io/api/assessment/work_orders", function (error, response, body){
    if (!error && response.statusCode==200){
    	worker_orders= JSON.parse(body);
       worker_orders['orders'].forEach(function(order){
       	      request("https://www.hatchways.io/api/assessment/workers/"+order.workerId, function( err, response, body){
               if (!error && response.statusCode==200){
               var worker= JSON.parse(body);
                  workers.push([worker.worker, order]);  
                  sorter.push(order.deadline); 
              }else{
              	console.log(err);
              }
       	      });     
     });
    }else{
    	console.log(err);
    }

});

//ROUTES
app.get('/', function (req, res){	  
	 res.render('home', {worker:workers, sorter:sorter});
});

app.listen (3000, function(req, res){
	console.log("The challenge is running!");
});