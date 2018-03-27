var fs          =   require('fs');

module.exports = (function(){
  var _stream = {};
    _stream.fileread = function(req,callback){ 
        var readerStream = fs.createReadStream('./junk/testfile');  
            
        var text = '';
        readerStream.on('data',function(chunk){
            text += chunk;
             return callback(null, text);   
        })        
    }    

  return _stream;
})();