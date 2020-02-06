var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysqldb20.cfcvwdzyisch.ap-south-1.rds.amazonaws.com',
  user     : 'admin',
  password : 'admin2020',
  database : 'test'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});


exports.register = function(req,res){
  console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
  
}
  
 exports.longestCrawl = function(req,res){
	  var longestCrawlSQL = "select title as longest_crawl, Char_length(`opening_crawl`) as longest_crawl_char_count from films order by longest_crawl_char_count desc limit 0,1";
	  connection.query(longestCrawlSQL, function (error, results, fields) {
	  if (error) {
		console.log("error ocurred",error);
		res.send({
		  "code":400,
		  "failed":"error ocurred"
		})
	  }else{
		console.log('The solution is: ', results);
		
		res.send({
		  "code":200,
		  "data":results,
		  "success":"Longest crawl"
			});
	  }
	  });  
}

exports.mostAppearCharacter = function(req,res){
	  var mostAppearCharacterSQL = "SELECT (select name from people where id=fc.people_id) as character_name, count(film_id) as number_of_films FROM `films_characters` as fc group by people_id order by number_of_films DESC limit 0,1";
	  connection.query(mostAppearCharacterSQL, function (error, results, fields) {
	  if (error) {
		console.log("error ocurred",error);
		res.send({
		  "code":400,
		  "failed":"error ocurred"
		})
	  }else{
		console.log('The solution is: ', results);
		
		res.send({
		  "code":200,
		  "data":results,
		  "success":"most Appear Character"
			});
	  }
	  });  
}


exports.starWarsSpecies = function(req,res){
	  var starWarsSpeciesSQL = "SELECT  (SELECT name from species where id = fs.`species_id` ) as species_name, (SELECT COUNT(DISTINCT(people_id)) from species_people where species_id = fs.`species_id`) as number_of_characters_belongsTo_species FROM `films_species` as fs GROUP By species_id having number_of_characters_belongsTo_species>2";
	  connection.query(starWarsSpeciesSQL, function (error, results, fields) {
	  if (error) {
		console.log("error ocurred",error);
		res.send({
		  "code":400,
		  "failed":"error ocurred"
		})
	  }else{
		console.log('The solution is: ', results);
		
		res.send({
		  "code":200,
		  "data":results,
		  "success":"most Appear Character"
			});
	  }
	  });  
}


exports.planetVehiclePilotsDetail = function(req,res){
	  var planetVehiclePilotsDetailSQL = "SELECT (SELECT name from planets WHERE id=fp.planet_id) as planet_name, fp.planet_id, count(DISTINCT(vp.people_id)) as total_vehicle_pilots  FROM `films_planets` as fp, films_vehicles as fv, vehicles_pilots as vp WHERE fp.film_id  = fv.film_id and fv.vehicle_id = vp.vehicle_id group by fp.planet_id order by total_vehicle_pilots desc";
	  connection.query(planetVehiclePilotsDetailSQL, function (error, results, fields) {
	  if (error) {
		console.log("error ocurred",error);
		res.send({
		  "code":400,
		  "failed":"error ocurred"
		})
	  }else{
		console.log('The solution is: ', results);
		
		res.send({
		  "code":200,
		  "data":results,
		  "success":"most Appear Character"
			});
	  }
	  });  
}

