var fs          =   require('fs');

module.exports = (function(){
  var _stream = {};
    _stream.fileread = function(req,callback){ 
        
        var readerStream = fs.createReadStream(req.file.path);             
        var text = '';
        readerStream.on('data',function(chunk){
            text += chunk;
            return callback(null, text);   
        })        
    }    

    _stream.jsonread = function(req,callback){ 
        var readerStream = fs.readFile('./junk/testObjects.json',function(err, obj){
          if(err){
            console.log('Error is : ' + err);
          }
          return callback(null, JSON.parse(obj));   
        });  
        
    }

  return _stream;
})();