console.log('loading function');

const fs = require('fs');
const ejs = require ('ejs');

exports.handler = (event, context, callback) => {
    console.log ('Received event: ',
    JSON.stringify(event, null, 2));
    
    /*
        Build a local filename, included in the 
        function deployment package,
        based on the path in the event
    */
    
    var fileName = './content' + event.path + 'index.ejs';
    
    console.log (fileName);
    
    fs.readFile(fileName, function(err, data) {
        if (err) {
            /*
                if the file is missing, fail returning a 404 string
                that the gateway can intercept and manage
            */
            callback ("Error 404");
        } else  {
            /*
                interpret the EJS template server side to produce HTML
                content
                
            */
            var html =  ejs.render(data.toString()));
            //return the HTML wrapped in JSON to preserve encoding
            
            callback (null, {data: html});
        }
        
    });
    
};