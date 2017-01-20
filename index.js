'use strict';

const ViberBot  = require('viber-bot').Bot;

const BotEvents = require('viber-bot').Events;

//exports.handler = function(event, context, callback) {

const bot    = new ViberBot({
    authToken: process.env.auth_token,
    name: "EchoBot",
    avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
console.log("Viber working");
	// Echo's back the message to the client. Your bot logic should sit here.
    response.send("Welcome to viber bot in Heroku");
});

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const https = require('https');
const port  = process.env.PORT || 8081;

// Viber will push messages sent to this URL. Web server should be internet-facing.
const webhookUrl = process.env.WEBHOOK_URL;

const httpsOptions = { key: "" , cert: "" , ca: "" }; // Trusted SSL certification (not self-signed).
https.createServer(httpsOptions, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));

/* console.log("Body:"+JSON.stringify(event));
	
var login_data = JSON.stringify({ Credentials: { user: process.env.user_name, password: process.env.password } });

var host = process.env.host_name;

var login_path = process.env.login_path;

var customer_path = process.env.customer_path;

var msisdn = event.text;

/*var login_data = JSON.stringify({ Credentials: { user: 'Asmsa1', password: 'Asmsa1' } });

var host = 'ipllin07.amdocs.com';

var login_path = '/rest/nphproxy.pl/000000A/http/lrt930s150m377:51000/rp-webapp-9-common/Login';

var customer_path = '/rest/nphproxy.pl/000000A/http/lrt930s150m377:51000/rp-webapp-9-common/customer/';
	
var msisdn = '639178526195';
	
function isDigit(input) {
    return (input < '0' || input > '9') ? 0 : 1; 
}

function output_res_balance(text2, text3, text4, callback_res_balance)
{
console.log("Inside third webservice to get the outstanding balance.");
//console.log("Body1:"+text4);
	
var options_balance = {
  method: 'GET',
  host: host,
  port: null,
  path: customer_path+text2+'/userBalance',
  headers: {
	'Authorization': text3
	}
};	
		
var req13 = http.request(options_balance, function (res2) {
  var chunks2 = [];

  res2.on("data", function (chunk2) {
    chunks2.push(chunk2);
  });

  res2.on("end", function () {
    var body2 = Buffer.concat(chunks2);
    //console.log(body2.toString());	

var parsedResponse1 = JSON.parse(text4);

var parsedResponse2 = JSON.parse(body2);

//console.log ("Parsed JSON response is : " + JSON.stringify(parsedResponse2));

var customspeech;

if(JSON.parse(text4).CustomerDetailsL === undefined || JSON.parse(text4).CustomerDetailsL === "")
{
customspeech = "Please check the number you have entered.";
}

else
{
customspeech = "Hi "+parsedResponse1.CustomerDetailsL.name+", Your outstanding balance is "+parsedResponse2.UserBalanceResponse.balanceX9+" and you are a "+parsedResponse1.CustomerDetailsL.paymentCategory+" subscriber.";
}

console.log("Output:"+customspeech);

callback(null, customspeech);

context.succeed('Success');

//return callback(customspeech);

//return customspeech;

});

});

req13.end();

}

function output(text1, callback_customer)
{
console.log("Inside the webservice to get customerID");
var options_customer_info = {
	  method: 'GET',
	  host: host,
	  port: null,
	  path: customer_path+msisdn+'/msisdn',
	  headers: {
        'Content-Type': 'application/json',
		'authorization': text1
		}
	};	

 //console.log(options1);
 
var req12 = http.request(options_customer_info, function(response1) {
  var chunks1 = [];

  response1.on("data", function (chunk1) {
    chunks1.push(chunk1);
  // console.log(response1.statusCode);
  });

  response1.on("end", function () {
    var body1 = Buffer.concat(chunks1);

	var customer_id;

if(JSON.parse(body1).CustomerDetailsL === undefined || JSON.parse(body1).CustomerDetailsL === "")
{
customer_id = "not_found";
}

else
{
customer_id = JSON.parse(body1).CustomerDetailsL.customerID;
}

console.log("customerID:"+customer_id);	

output_res_balance(customer_id, text1, body1, function(response1) {
});

  });
  
}); 

req12.end();

}
	
var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
	
switch(event.text)
{
case "Hello":
 return new viberTemplate.Text(`Hello ! How can I help you? As of now I can do the following for you. And of course we can chat in general.`)
      .addReplyKeyboard()
        .addKeyboardButton('Get Outstanding Balance', 'Get Outstanding Balance', 6, 1)
        .addKeyboardButton('Top offers', 'Top offers', 6, 1)
        .addKeyboardButton('I am ok, I do not need anything as of now', 'I am ok, I do not need anything as of now', 6, 1)
      .get();

case "Hi":
 return new viberTemplate.Text(`Hello ! How can I help you? As of now I can do the following for you. And of course we can chat in general.`)
      .addReplyKeyboard()
        .addKeyboardButton('Get Outstanding Balance', 'Get Outstanding Balance', 6, 1)
        .addKeyboardButton('Top offers', 'Top offers', 6, 1)
        .addKeyboardButton('I am ok, I do not need anything as of now', 'I am ok, I do not need anything as of now', 6, 1)
      .get();

case "Get Outstanding Balance":	
callback(null, "I would like to know your mobile number to get your info.");

case "Enter the valid phone number":
return 'I would like to know your mobile number to get your info.';

case "No, I do not want to continue":
return new viberTemplate.Text(`Hello ! How can I help you? As of now I can do the following for you. And of course we can chat in general.`)
      .addReplyKeyboard()
        .addKeyboardButton('Get Outstanding Balance', 'Get Outstanding Balance', 6, 1)
        .addKeyboardButton('Top offers', 'Top offers', 6, 1)
        .addKeyboardButton('I am ok, I do not need anything as of now', 'I am ok, I do not need anything as of now', 6, 1)
      .get();

case "I am ok, I do not need anything as of now":	
return 'Thanks, if you ever need me, I am just a "Hi" away';
	
case "Top offers":
 return new viberTemplate.Text(`Find the Offers list below`)
      .addReplyKeyboard()
        .addKeyboardButton('Facebook Offer', 'https://goo.gl/sIZCze', 6, 1, {
		          BgColor: '#3b5998', 
				  Color: '#FFFFFF'	
		})
        .addKeyboardButton('Youtube Offer', 'https://goo.gl/G8x0Rq', 6, 1, {
		          BgColor: '#bb0000'	
		})
      .get();

default:
if ( isDigit(event.text) ) {
if(event.text.length == 12)
{	
var options = {
  method: 'POST',
  host: host,
  port: null,
  path: login_path,
  headers: {
    'Content-Type': 'application/json',
	'Content-Length': Buffer.byteLength(login_data)
	} 
  };

  var req11 = http.request(options, function(response) {

      var str = '';

      response.on("data", function (chunk) {
         str += chunk;
      });

      response.on("end", function () {
		 console.log("Token:"+response.headers.uxfauthorization);	 
			output(response.headers.uxfauthorization, function(response) {
		 });
		  //output(response.headers.uxfauthorization,callback_output);
      });
   });

  req11.write(login_data);

  req11.end();

}

else
{
 return new viberTemplate.Text(`I did not understand you. At the moment I can do the below for you.`)
      .addReplyKeyboard()
        .addKeyboardButton('Please enter the valid phone number. It should be in format like 63XXXYYYZZZZ e.g. 639081117878 ( country code and then the number without + sign )', 'Enter the valid phone number', 6, 1)
        .addKeyboardButton('No, I do not want to continue', 'No, I do not want to continue', 6, 1)
      .get();	
}	
}

else if(regex.test(event.text))
{
console.log(regex.test(event.text));
return "";		
}

else   
{
 return new viberTemplate.Text(`I did not understand you. At the moment I can do the below for you.`)
      .addReplyKeyboard()
        .addKeyboardButton('Get Outstanding Balance', 'Get Outstanding Balance', 6, 1)
        .addKeyboardButton('Top offers', 'Top offers', 6, 1)
        .addKeyboardButton('I am ok, I do not need anything as of now', 'I am ok, I do not need anything as of now', 6, 1)
      .get();
}
} */	
// };
