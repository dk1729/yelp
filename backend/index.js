//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var multer = require('multer');
var path = require('path');
const { response } = require('express');
const { stringify } = require('querystring');
const { json } = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('uploads'))
//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot"
});

var backup;
//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const storage = multer.diskStorage({
  destination:"./uploads/",
  filename:(req, file, callback)=>{
    callback(null, "PROFILE-"+Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits:{fileSize:1000000}
}).single("profile_photo");

app.post("/upload",(req,res) => {
  console.log("TRYING TO UPLOADDDD");
  console.log("Request = ",req)
  upload(req,res,err=>{
    console.log("Body : ",req.body)
    console.log("File: ",req.file)
    
        
    let sql = "UPDATE `yelp`.`user_details` SET `path` = "+mysql.escape(req.file.filename)+" WHERE (`id` = "+req.query.id+");"
    
      con.query(sql, function (err, result) {
        if (err) throw err;
        if(result.length>0){
          console.log("UPLOADED SUCCESSFULLY")
          res.status(202,{
            'Content-Type' : 'application/json'
          });
          res.end("UPLOADED")
        }
        else{
          res.status(205,{
            'Content-Type' : 'application/json'
          });
          res.end("Some error occured")
        }
      });
    
    
    if(!err){
      return res.sendStatus(200).end();
    }
  })
})

app.post("/login", (req,res) => {
  var email = req.body.email;
  var password = req.body.password;

  console.log("Email = "+email+" password = "+password)

  var sql = "SELECT * FROM yelp.user_register WHERE email = " + mysql.escape(email);
  var b = {}
  console.log("Query = "+sql)
  

    con.query(sql, function (err, results) {
      if (err) {           
        console.log("Fuck 1")     
        res.writeHead(404, {
          'Content-Type': 'application/json'
        });
        res.end("No user");
    } else {        
      console.log("SO : "+results[0])
        if(results.length > 0){
          console.log("Going inside : "+results[0])
          bcrypt.compare(password, results[0].password, function (err, isMatch) {
              if (isMatch && !err) {
                  res.cookie('cookie','user',{maxAge: 900000, httpOnly: false, path : '/'});
                  req.session.userid = results[0].id;
                  console.log(req.session)
                  b.email = results[0].email;
                  b.id = results[0].id;
                  res.status(200, {
                      'Content-Type': 'application/json'
                  });
                  res.send(b);
              } else {
                  console.log("Fuck 2")     
                  res.writeHead(403, {
                      'Content-Type': 'application/json'
                  });
                  res.end("Credentials don't match");
              }
          }, function (err) {
              if (err) {
                  console.log(err)
              }
          })
        }
        else {
          res.writeHead(205, {
            'Content-Type': 'application/json'
          });
          res.end("User does not exist");
        }
      }
    })
  
})

app.post("/restlogin", (req,res) => {
  
  var email = req.body.email;
  var password = req.body.password;
  console.log("REST LOGINNNN, with email = "+email+" password = "+password)

  var sql = "SELECT * FROM yelp.rest_register WHERE email = " + mysql.escape(email);
  var b = {}


  
    con.query(sql, function (err, results) {
      if (err) {
        console.log("No user")
        callback(err, " User does not exist ... ")
    } else {
      console.log("Results came back : "+JSON.stringify(results[0]))
        if(results.length > 0){
          bcrypt.compare(password, results[0].password, function (err, isMatch) {
              if (isMatch && !err) {
                  console.log("It matched")
                  res.cookie('cookie','rest',{maxAge: 900000, httpOnly: false, path : '/'});                  
                  console.log(req.session)
                  b.email = results[0].email;
                  b.rest_id = results[0].rest_id;
                  res.status(202, {
                      'Content-Type': 'application/json'
                  });
                  res.send(b);
              } else {
                  console.log("It didnt matched")
                  res.writeHead(401, {
                      'Content-Type': 'application/json'
                  });
                  res.end("Credentials don't match");
              }
          }, function (err) {
              if (err) {
                  console.log(err)
              }
          })
        }
        else {
          res.writeHead(205, {
            'Content-Type': 'application/json'
          });
          res.end("Restaurant does not exist");
        }
      }
    })
  
})

app.post("/signup", (req,res) => {
  console.log("SIGNING UPPP");  
  
  let q1 = "Select * from `yelp`.`user_register` where email="+mysql.escape(req.body.email);

  
    con.query(q1, function (err, result) {
      if (err) throw err;
      else if(result.length!=0){
        res.status(202,{
          'Content-Type' : 'application/json'
        });
        res.end("Email already exists");
      }
      else{
        let hashedPassword = bcrypt.hashSync(req.body.password,10);
        let user = {
          'first_name':req.body.first_name,
          'last_name':req.body.last_name,
          'email':req.body.email, 
          'password':hashedPassword, 
          'zip':req.body.zip, 
          'month':req.body.month, 
          'day':req.body.day, 
          'year':req.body.year
        };

        const exec = async () => {
          console.log("USer = ",user)
          let sql = "INSERT INTO `yelp`.`user_register` SET"+mysql.escape(user);
          const temp = await con.query(sql);          
          console.log("1st response = "+temp);
        }                
        exec().then(() => {
          const exec2 = async () => {
            let sql2 = "INSERT INTO `yelp`.`user_details` (`first_name`, `last_name`) VALUES ("+mysql.escape(req.body.first_name)+", "+mysql.escape(req.body.last_name)+")";
            const temp2 = await con.query(sql2);
            res.status(202,{
              'Content-Type' : 'application/json'
            });
            res.end();
          }          
          exec2();
        });
      }
    });
  
})

app.post("/restsignup", (req,res) => {
  console.log("SIGNING UPPP");

  
  let q1 = "Select * from `yelp`.`rest_register` where email="+mysql.escape(req.body.email);

  
    con.query(q1, function (err, result) {
      if (err) throw err;
      else if(result.length!=0){
        res.status(400,{
          'Content-Type' : 'application/json'
        });
        res.end("Email already exists");
      }
      else{
        let hashedPassword = bcrypt.hashSync(req.body.password,10);
        let user = {
          'rest_name':req.body.rest_name,
          'email':req.body.email, 
          'password':hashedPassword, 
          'zip':req.body.zip, 
          'location':req.body.location
        };

        const exec = async () => {
          console.log("USer = ",user)
          let sql = "INSERT INTO `yelp`.`rest_register` SET"+mysql.escape(user);
          const temp = await con.query(sql);          
          console.log("1st response = "+temp);
        }                
        exec().then(() => {
          const exec2 = async () => {
            let sql2 = "INSERT INTO `yelp`.`rest_details` (`rest_name`, `zip`, `location`) VALUES ("+mysql.escape(req.body.rest_name)+", "+mysql.escape(req.body.zip)+", "+mysql.escape(req.body.location)+")";
            const temp2 = await con.query(sql2);
            res.status(202,{
              'Content-Type' : 'application/json'
            });
            res.end();
          }          
          exec2();
        });
      }
    });
  
})

app.get("/getData/:id",(req,res) => {
  console.log("Inside get...")


  let q1 = "Select * from `yelp`.`user_details` where id="+mysql.escape(req.params.id);
  console.log("ID = "+req.params.id)
  
    con.query(q1, function (err2, results) {      
      if(err2){
        console.log("Error occured: "+err2)
      }
      console.log("Results = "+JSON.stringify(results[0]))
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify(results[0]))
    })
  
})

app.get("/getRestData/:rest_id",(req,res) => {
  console.log("Inside get for restaurant...")
  
  console.log("Rest ID = "+req.params.rest_id)
  let q1 = "Select * from `yelp`.`rest_details` where rest_id="+mysql.escape(req.params.rest_id);  
  
    con.query(q1, function (err2, results) {      
      if(err2){
        console.log("Error occured: "+err2)
      }
      console.log("Results = "+JSON.stringify(results[0]))
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify(results[0]))
    })
  
})

app.post("/update", (req,res) => {
  
  
    
  let q1 = "UPDATE `yelp`.`user_details` SET "+mysql.escape(req.body)+" WHERE (`id` = "+mysql.escape(req.body.id)+")";  
  
  
    con.query(q1, function (err, result) {
      if (err) throw err;
      else if(result.length!=0){
        console.log("DONE")
        res.status(202,{
          'Content-Type' : 'application/json'
        });
        res.end("UPDATED")
      }
      else{
        res.status(403,{
          'Content-Type' : 'application/json'
        });
        res.end("UPDATED")
      }
      });
  
})

app.post("/updateRest", (req,res) => {
  
  
    
  let q1 = "UPDATE `yelp`.`rest_details` SET "+mysql.escape(req.body)+" WHERE (`rest_id` = "+mysql.escape(req.body.rest_id)+")";
  
  
    con.query(q1, function (err, result) {
      if (err) throw err;
      else if(result.length!=0){
        console.log("DONE")
        res.status(202,{
          'Content-Type' : 'application/json'
        });
        res.end("UPDATED")
      }
      else{
        res.status(403,{
          'Content-Type' : 'application/json'
        });
        res.end("UPDATED")
      }
      });
  
})

app.post("/addDish", (req,res) => {
  
  console.log("Adding dish with data = "+JSON.stringify(req.body))
  let q1 = "INSERT INTO `yelp`.`dish_details` SET"+mysql.escape(req.body);
  
    con.query(q1, function (err, result) {
      if (err) throw err;
      else if(result.length!=0){
        console.log("DONE")
        res.status(202,{
          'Content-Type' : 'application/json'
        });
        res.end("Added")
      }
      else{
        res.status(403,{
          'Content-Type' : 'application/json'
        });
        res.end("Not added")
      }
      });
  
})

app.post("/updateDish", (req,res) => {
  
    
  console.log("Updating dish with data = "+JSON.stringify(req.body))
  let q1 = "UPDATE `yelp`.`dish_details` SET "+mysql.escape(req.body)+" WHERE (`dish_id` = "+mysql.escape(req.body.dish_id)+")";
  
    con.query(q1, function (err, result) {
      if (err) throw err;
      else if(result.length!=0){
        console.log("DONE")
        res.status(202,{
          'Content-Type' : 'application/json'
        });
        res.end("Added")
      }
      else{
        res.status(403,{
          'Content-Type' : 'application/json'
        });
        res.end("Not added")
      }
      });
  
})

app.get("/getDishes/:rest_id", (req,res) => {
  console.log(req.params.rest_id)

      
  let q1 = "Select * from `yelp`.`dish_details` where rest_id="+mysql.escape(req.params.rest_id);
  
    con.query(q1, function (err2, results) {      
      if(err2){
        console.log("Error occured: "+err2)
      }
      console.log("Results = "+JSON.stringify(results))
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify(results))
    })
  
})

app.get("/getOrders", (req,res) => {
  console.log("Trying to get orders for restid: ")
  console.log(req.query)
  
  let q1;
  if(req.query.type === 'rest')
    q1 = "Select * from `yelp`.`order_register` where rest_id="+mysql.escape(req.query.id);
  else if(req.query.type === 'user')
    q1 = "Select * from `yelp`.`order_register` where user_id="+mysql.escape(req.query.id);
  answer = []
  con.query(q1, function (err2, results) {
    if(err2){
      console.log("Error occured: "+err2)
    }

    for(let j in results){      
      let dishes = []
      let temp = {status:results[j].status, order_id:results[j].order_id, mode:results[j].mode, total:results[j].total}
      let q2 = "Select * from `yelp`.`order_details` where order_id="+mysql.escape(results[j].order_id);
      con.query(q2, (err2, results2) => {        
        //Query 4     
        let q4;
        if(req.query.type === 'rest'){
          q4 = "Select first_name, last_name from `yelp`.`user_details` where id="+mysql.escape(results[j].user_id);
          con.query(q4, (err4, results4) => {
            temp = {...temp, user_name:results4[0].first_name+" "+ results4[0].last_name}
          })
        }          
        else if(req.query.type === `user`){
          q4 = "Select rest_name from `yelp`.`rest_details` where rest_id="+mysql.escape(results[j].rest_id);
          con.query(q4, (err4, results4) => {
            temp = {...temp, rest_name:results4[0].rest_name}
          })
        }
          
        //Query 3
        for(let i in results2){          
          console.log("R2: "+JSON.stringify(results2[i]))
          let q3 = "Select dish_name from `yelp`.`dish_details` where dish_id="+mysql.escape(results2[i].dish_id);          
          con.query(q3, (err3, results3) => {
            dishes.push(results2[i].quantity+" * "+results3[0].dish_name)
            if(i == results2.length-1){
              temp = {...temp, dishes:dishes}
              answer.push(temp)
              if(j == results.length - 1){
                console.log("Final Asnwer : "+JSON.stringify(answer));
                res.status(200,{
                  'Content-Type' : 'application/json'
                });
                res.end(JSON.stringify(answer))
              }
            }            
          })
        }
      })
    }
  })
})

// app.get("/getOrders/:rest_id", (req,res) => {
//   // console.log("Trying to get orders for restid: "+req.params.rest_id)    
//   let q1 = "Select * from `yelp`.`order_register` where rest_id="+mysql.escape(req.params.rest_id);
//   answer = []
//   con.query(q1, function (err2, results) {
//     if(err2){
//       console.log("Error occured: "+err2)
//     }

//     for(let j in results){      
//       let dishes = []
//       let temp = {status:results[j].status, order_id:results[j].order_id, mode:results[j].mode, total:results[j].total}
//       let q2 = "Select * from `yelp`.`order_details` where order_id="+mysql.escape(results[j].order_id);
//       con.query(q2, (err2, results2) => {        
//         //Query 4        
//         let q4 = "Select first_name, last_name from `yelp`.`user_details` where id="+mysql.escape(results[j].user_id);
//         con.query(q4, (err4, results4) => {
//           temp = {...temp, user_name:results4[0].first_name+" "+ results4[0].last_name}
//         })
//         //Query 3
//         for(let i in results2){          
//           console.log("R2: "+JSON.stringify(results2[i]))
//           let q3 = "Select dish_name from `yelp`.`dish_details` where dish_id="+mysql.escape(results2[i].dish_id);          
//           con.query(q3, (err3, results3) => {
//             dishes.push(results2[i].quantity+" * "+results3[0].dish_name)
//             if(i == results2.length-1){
//               temp = {...temp, dishes:dishes}
//               answer.push(temp)
//               if(j == results.length - 1){
//                 console.log("Final Asnwer : "+JSON.stringify(answer));
//                 res.status(200,{
//                   'Content-Type' : 'application/json'
//                 });
//                 res.end(JSON.stringify(answer))
//               }
//             }            
//           })
//         }
//       })
//     }
//   })
// })

app.get("/getCart/:user_id", (req,res) => {
  
  console.log("Inside get cart")
  answer = []
  let q1 = "Select * from `yelp`.`cart` where user_id="+mysql.escape(req.params.user_id);

  con.query(q1, function (err2, results) {
    if(err2){
      console.log("Error occured: "+err2)
      throw err2;
    }
    if(results.length>0){
      let q2 = "Select rest_name,takeout, delivery, dineout from `yelp`.`rest_details` where rest_id="+mysql.escape(results[0].rest_id);
      con.query(q2, function (err3, results2) {
        if(err3){
          console.log("Error occured: "+err2)
          throw err3;
        }
        for(let i in results){
          temp = {}
          temp = {...temp, rest_name:results2[0].rest_name, takeout:results2[0].takeout, delivery:results2[0].delivery, dineout:results2[0].dineout}
          console.log(JSON.stringify(results[i].dish_id))
          let q2 = "Select dish_name,dish_price from `yelp`.`dish_details` where dish_id="+mysql.escape(results[i].dish_id);
          con.query(q2, function (err3, results2) {
            if(err3){
              console.log("Error occured: "+err2)
              throw err3;
            }        
            console.log("Quantity : "+JSON.stringify(results[0]))
            temp = {...temp, user_id:req.params.user_id, cart_id:results[i].cart_id, dish_price:results2[0].dish_price, dish_name:results2[0].dish_name, dish_id:results[i].dish_id, rest_id:results[0].rest_id, quantity:results[i].count}
            answer.push(temp)
            if(i == results.length-1){
              console.log("Length of answer = "+answer.length)
              res.status(202,{
                'Content-Type' : 'application/json'
              });
              res.end(JSON.stringify(answer))
            }
          })
        }
      })      
    }       
    else{
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify({}))
    }     
  })

})

app.post("/placeOrder", (req,res) => {
  console.log("Received order on backend")
  console.log("Orders "+JSON.stringify(req.body))
  let t1_data = {
    "rest_id":req.body.orders[0].rest_id,
    "status":"Placed",
    "mode":req.body.mode,
    "total":req.body.total,
    "user_id":req.body.orders[0].user_id
  };
  let q1 = "INSERT INTO `yelp`.`order_register` SET "+mysql.escape(t1_data);
  
  const q1_exec = async () => {
    return await con.query(q1)
  }

  con.query(q1, (err,results) => {
    if(err)
      throw err
    console.log("Results : "+JSON.stringify(results))
    req.body.orders.map(order => {
      let t2_data = {
        "order_id":results.insertId,
        "dish_id":order.dish_id,
        "quantity":order.quantity
      };
      let q2 = "INSERT INTO `yelp`.`order_details` SET "+mysql.escape(t2_data);
      con.query(q2, (err1,t_results) => {
        if(err1)
          throw err1
        console.log("Yeah, I inserted them")
      })
    })

    let q3 = "TRUNCATE `yelp`.`cart`;"
    con.query(q3, (err2, del_result) => {
      if(err2)
        throw err2
      console.log("Deleted cart")
    })
    
    res.status(200,{
      'Content-Type' : 'application/json'
    });
    res.end("Order placed")
  })
})

app.post("/deleteCart", (req,res) => {
  console.log("I will delete "+JSON.stringify(req.body))
  
      
  let q1 = "DELETE from `yelp`.`cart` where cart_id="+mysql.escape(req.body.cart_id);
  
    con.query(q1, function (err2, results) {      
      if(err2){
        console.log("Error occured: "+err2)
      }
      console.log("Results = "+JSON.stringify(results))
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify(results))
    })
  

})

app.get("/getRestaurants", (req,res) => {
      
  let q1 = "Select * from `yelp`.`rest_details`";
  
    con.query(q1, function (err2, results) {      
      if(err2){
        console.log("Error occured: "+err2)
      }
      console.log("Results = "+JSON.stringify(results))
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify(results))
    })
  
})

app.post("/filter", (req,res) => {
     
  console.log("Filter = "+JSON.stringify(req.body))

  let temp1 = ""
  let temp2 = ""
  let temp3 = ""

  if(!req.body.takeout){
    temp1 = "%"
  }
  else{
    temp1 = req.body.takeout
  }

  if(!req.body.delivery){
    temp2 = "%"
  }
  else{
    temp2 = req.body.delivery
  }

  if(!req.body.dineout){
    temp3 = "%"
  }
  else{
    temp3 = req.body.dineout
  }
  let q1;

  if(req.body.hood !== undefined)
    q1 = "Select * from `yelp`.`rest_details` where takeout LIKE '"+temp1+"' AND delivery LIKE '"+temp2+"' AND dineout LIKE '"+temp3+"' AND hood in ("+mysql.escape(req.body.hood)+")";
  else
    q1 = "Select * from `yelp`.`rest_details` where takeout LIKE '"+temp1+"' AND delivery LIKE '"+temp2+"' AND dineout LIKE '"+temp3+"'";
  console.log("QUERY = "+q1)
  
    con.query(q1, function (err2, results) {      
      if(err2){
        console.log("Error occured: "+err2)
      }
      console.log("Results = "+JSON.stringify(results))
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify(results))
    })
  
})

app.post('/addToCart', (req,res) => {
  
  console.log("Trying to add")
  let q1 = "INSERT INTO `yelp`.`cart` SET"+mysql.escape(req.body);

  con.query(q1, function (err2, results) {      
    if(err2){
      console.log("Error occured, fucker: "+err2)
      
    }
    console.log("Results = "+JSON.stringify(results))
    console.log("Done adding")
    res.status(202,{
      'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(results))
  })
  
})

app.post('/updateOrderStatus', (req,res) => {
  console.log("Update status at details : "+JSON.stringify(req.body))

  let q1 = "UPDATE `yelp`.`order_register` SET `status` = "+mysql.escape(req.body.status)+" WHERE (`order_id` = "+req.body.order_id+");"
  console.log("QUERY : "+q1)
  con.query(q1, function (err2, results) {      
    if(err2){
      console.log("Error occured, fucker: "+err2)    
    }
    console.log("Updated")
    res.status(200,{
      'Content-Type' : 'application/json'
    });
    res.end("Done")
  })
})

app.post("/filter_order_status", (req,res) => {
  console.log("Give details reg: "+JSON.stringify(req.body.statuses))
  let q1;
  if(req.body.type === "rest")
    q1 = "Select * from `yelp`.`order_register` where status IN ("+mysql.escape(req.body.statuses)+") and rest_id="+mysql.escape(req.body.id);
  else if(req.body.type === "user")
    q1 = "Select * from `yelp`.`order_register` where status IN ("+mysql.escape(req.body.statuses)+") and user_id="+mysql.escape(req.body.id);

  answer = []
  con.query(q1, function (err2, results) {
    if(err2){
      console.log("Error occured: "+err2)
    }

    for(let j in results){
      let dishes = []
      let temp = {status:results[j].status, order_id:results[j].order_id, mode:results[j].mode, total:results[j].total}
      let q2 = "Select * from `yelp`.`order_details` where order_id="+mysql.escape(results[j].order_id);
      con.query(q2, (err2, results2) => {        
        //Query 4        
        let q4;

        if(req.body.type==="rest"){
          q4 = "Select first_name, last_name from `yelp`.`user_details` where id="+mysql.escape(results[j].user_id);
          con.query(q4, (err4, results4) => {
            temp = {...temp, user_name:results4[0].first_name+" "+ results4[0].last_name}
          })
        }
        else if(req.body.type==="user"){
          q4 = "Select rest_name from `yelp`.`rest_details` where rest_id="+mysql.escape(results[j].rest_id);
          con.query(q4, (err4, results4) => {
            temp = {...temp, rest_name:results4[0].rest_name}
          })
        }        
        //Query 3
        for(let i in results2){          
          console.log("R2: "+JSON.stringify(results2[i]))
          let q3 = "Select dish_name from `yelp`.`dish_details` where dish_id="+mysql.escape(results2[i].dish_id);          
          con.query(q3, (err3, results3) => {
            dishes.push(results2[i].quantity+" * "+results3[0].dish_name)
            if(i == results2.length-1){
              temp = {...temp, dishes:dishes}
              answer.push(temp)
              if(j == results.length - 1){
                console.log("Final Asnwer : "+JSON.stringify(answer));
                res.status(200,{
                  'Content-Type' : 'application/json'
                });
                res.end(JSON.stringify(answer))
              }
            }            
          })
        }
      })
    }
  })
})

// app.post("/filter_order_status", (req,res) => {
//   console.log("Give details reg: "+JSON.stringify(req.body.statuses))
//   console.log("Rest id ? "+req.body.rest_id)
  
//   let q1 = "Select * from `yelp`.`order_register` where status IN ("+mysql.escape(req.body.statuses)+") and rest_id="+mysql.escape(req.body.rest_id);
//   answer = []
//   con.query(q1, function (err2, results) {
//     if(err2){
//       console.log("Error occured: "+err2)
//     }

//     for(let j in results){      
//       let dishes = []
//       let temp = {status:results[j].status, order_id:results[j].order_id, mode:results[j].mode, total:results[j].total}
//       let q2 = "Select * from `yelp`.`order_details` where order_id="+mysql.escape(results[j].order_id);
//       con.query(q2, (err2, results2) => {        
//         //Query 4        
//         let q4 = "Select first_name, last_name from `yelp`.`user_details` where id="+mysql.escape(results[j].user_id);
//         con.query(q4, (err4, results4) => {
//           temp = {...temp, user_name:results4[0].first_name+" "+ results4[0].last_name}
//         })
//         //Query 3
//         for(let i in results2){          
//           console.log("R2: "+JSON.stringify(results2[i]))
//           let q3 = "Select dish_name from `yelp`.`dish_details` where dish_id="+mysql.escape(results2[i].dish_id);          
//           con.query(q3, (err3, results3) => {
//             dishes.push(results2[i].quantity+" * "+results3[0].dish_name)
//             if(i == results2.length-1){
//               temp = {...temp, dishes:dishes}
//               answer.push(temp)
//               if(j == results.length - 1){
//                 console.log("Final Asnwer : "+JSON.stringify(answer));
//                 res.status(200,{
//                   'Content-Type' : 'application/json'
//                 });
//                 res.end(JSON.stringify(answer))
//               }
//             }            
//           })
//         }
//       })
//     }
//   })
// })
app.listen(3001);
console.log("Server Listening on port 3001");