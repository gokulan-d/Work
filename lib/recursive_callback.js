var request = require('request');

module.exports = (function(){
	var _getdata = {};
	_getdata.contacts = [];

		_getdata.getcontacts = function(page_number, callback){
			console.log("getcontacts" ,page_number);
			// var _this = this;
			page_number = page_number  || 1;

			var getapivalue = function(){
				request({
				    headers					: {
				      'Accept'				: 	'application/vnd.moxi-platform+json;version=1',
				      'Content-Type'		: 	'application/x-www-form-urlencoded',
				      'Authorization'		: 	'Basic OTJlNWFiNWUtOWM4Zi0xMWU2LTgxMDUtMDA1MDU2OWMxMTlhOjVIZ1RhR1FIMm9PZVQ5Y3hmWHU2Ymd0dA=='
				    },
				    uri						: 'https://api.moxiworks.com/api/contacts?moxi_works_agent_id=demo_4@moxiworks.com&partner_contact_id=cont_10011&page_number=' + page_number,
				    method					: 'GET'
				},
				  	function (err, res) {

				  		var curr_data = JSON.parse(res.body);

				  		console.log("current iteration:"+ page_number + '=' + curr_data.total_pages);

				  		if(page_number == curr_data.total_pages){
			  				console.log('loop ended');
			  				return callback(null, _getdata.contacts);
			  			}else{
			  				// _getdata.contacts = _getdata.contacts.concat(curr_data.contacts);
			  				for(var i in curr_data.contacts){
			  					_getdata.contacts.push(curr_data.contacts[i]);
			  					if(curr_data.contacts[curr_data.contacts.length - 1] == curr_data.contacts[i]){
			  						page_number++;
			  						return getapivalue();
			  					}
			  				}

						};	
				});
			}

			getapivalue();
		};


	return _getdata;
})();
