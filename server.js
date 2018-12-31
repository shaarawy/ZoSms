/*server.js*/
const http = require('http');
url = require('url');
var firebase = require("firebase-admin");
var serviceAccount = require("./zosms.json");
var args;
var myarr;
var msgtime;
var msgfrom;
var msgto;
var msgbody;
var called = 0;

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://zosms-f6553.firebaseio.com"
});

const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello World\n');
  var query = url.parse(req.url,true).query;
  args = JSON.stringify(query);
  //res.end(JSON.stringify(query));
  myarr = args.split(",");
  msgtime = ''  + myarr[0];
  msgfrom = '' + myarr[1];
  msgto = '' + myarr[2];
  msgbody = '' + myarr[3];

  msgtime = (msgtime.split(":"));
  msgfrom = (msgfrom.split(":"));
  msgto = (msgto.split(":"));
  msgbody = (msgbody.split(":"));
  msgbody = '' + msgbody[1];
  msgbody = msgbody.substring (0, msgbody.length -1);

  mytime = ''+ msgtime[1];
  mytime = mytime.replace(/"/g, '');

  myfrom = ''+ msgfrom[1];
  myfrom = myfrom.replace(/"/g, '');

  myto = ''+ msgto[1];
  myto = myto.replace(/"/g, '');

  mybody = ''+ msgbody;
  mybody = mybody.replace(/"/g, '');

   res.end("Time:" + mytime + " details:" + myfrom+ "," + myto + "," + mybody);
   updatedb(mytime,myfrom,myto,mybody);
   //console.log (echohi(mytime,myfrom,myto,mybody))
   //console.log (echohi(1,2,3,4))
});


function echohi(funtime,funfrom,funto,funbody) {

var hhh = funtime+ funfrom+funto+funbody;
	return hhh;
}
function updatedb(funtime,funfrom,funto,funbody) {
		
if (funtime != "undefined") {
		console.log("funtime");

	console.log(funtime);
var db = firebase.database();
var ref = db.ref("sms/mobileno");
ref.once("value", function(snapshot) {
  //console.log(snapshot.val());
});

var usersRef = ref.child(funto);
var timestamp = Math.floor(Date.now());
var shakey = usersRef.push({
    smsTS: funtime,
    serverTS: timestamp,
    from: funfrom,
    amount: funbody
  
}).getKey();


console.log(shakey);





console.log('db updated');
}


}





function getdatabyfield(path, filedname, startat,endat,limit) {

var msgRef = firebase.database().ref("sms/mobileno/0100993166");

msgRef.orderByChild("date").startAt(1546170624122).endAt(1546170746005).limitToFirst(100).once("value", function(snapshot) {
  console.log(snapshot.val());
   // console.log(snapshot.val()); //all fields

});

}






server.listen(process.env.PORT || port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
  





 



//retrive data


/* return all records
msgRef.once("value", function(snapshot) {
	console.log(snapshot.key);

   console.log(snapshot.val());
}, function (error) {
   console.log("Error: " + error.code);
});

//const qdb = firebase.firestore();

*/

// return based on filter 









});





