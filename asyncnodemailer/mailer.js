
 var async = require("async");
 var http = require("http");
 var nodemailer = require("nodemailer");
 // This will store emails needed to send.
 // We can fetch it from DB (MySQL,Mongo) and store here.
 var listofemails = ["abhishek@eduthon.in","abhisheksharwe32423423423rma18@gmail.com"];
 // Will store email sent successfully.
 var success_email = [];
 // Will store email whose sending is failed.
 var failure_email = [];

 var transporter;

 /* Loading modules done. */

 exports.massMailer = function() {
     var self = this;
     transporter = nodemailer.createTransport({
         service: "Gmail",
         auth: {
             user: "education@eduthon.in",
             pass: "BittuSittu1"
         }
     });
     // Fetch all the emails from database and push it in listofemails
         // Will do it later.



 /* Invoking email sending operation at once */

 self.invokeOperation = function() {
     var self = this;
     async.each(listofemails,self.SendEmail,function(){
         console.log(success_email);
         console.log(failure_email);
     });
 }

 /*
 * This function will be called by multiple instance.
 * Each instance will contain one email ID
 * After successfull email operation, it will be pushed in failed or success array.
 */

self.SendEmail = function(Email,callback) {
     console.log("Sending email to " + Email);
     var self = this;
     self.status = false;
     // waterfall will go one after another
     // So first email will be sent
     // Callback will jump us to next function
     // in that we will update DB
     // Once done that instance is done.
     // Once every instance is done final callback will be called.
     async.waterfall([
         function(callback) {
             var mailOptions = {
                 from: 'education@eduthon.in',
                 to: Email,
                 subject: 'Hi ! This is sample test script',
                 text: "wassupSSS !"
             };
             transporter.sendMail(mailOptions, function(error, info) {
                 if(error) {
                     console.log(error)
                     failure_email.push(Email);
                 } else {
                     self.status = true;
                     success_email.push(Email);
                 }
                 callback(null,self.status,Email);
             });
         },
         function(statusCode,Email,callback) {
                 console.log("Will update DB here for " + Email + "With " + statusCode);
                 callback();
         }
         ],function(){
             //When everything is done return back to caller.
             callback();
     });
 }
   self.invokeOperation();
};
