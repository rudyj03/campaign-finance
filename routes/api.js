/*
 * Serve JSON to our AngularJS client
 */

http = require('http')
async = require('async')

var getCandidateData = function(state, callback){
	http.get('http://api.nytimes.com/svc/elections/us/v3/finances/2014/seats/'+state+'.json?api-key=4aa4fc19b02fb4f07e622815725030f3:4:69239152', 
	function(apiRequest) {
		var output='';
		
	   apiRequest.on('data', function(data){
		   output+=data;
	   	});
		
		apiRequest.on('end', function() {
		            var obj = JSON.parse(output);
		            callback(null, obj);
		        });
		
	})
}

var getCandidateFinancialData = function(results, callback){
	var candidates = results.results;
	var appendedCandidates = [];
	var totalCount = 0;
	for(var i =0; i<candidates.length; i++){
		var candidate = candidates[i].candidate;
		http.get('http://api.nytimes.com/svc/elections/us/v3/finances/2014/candidates/'+candidate.id+'.json?api-key=4aa4fc19b02fb4f07e622815725030f3:4:69239152',
		function(apiRequest) {
			var output = '';

			apiRequest.on('data', function(data) {
				console.log("BODY: " + data);
				output += data;
			});

			apiRequest.on('end', function() {
				var obj = JSON.parse(output);
				candidate.totalReceipts = obj.results[0].total_receipts;
				appendedCandidates.push(candidate);
	
				totalCount++;
	
				if(totalCount === candidates.length){
					results.results = appendedCandidates;
					callback(null, results);
				}
			});
		});

	}
}

exports.getCandidates = function (req, res) {
	var state = req.params.state;
	  if (state != null){
		  state = state.toUpperCase();
	  }
	  else{
		  state = "MD"
	  }
	
  	async.waterfall([
		function(callback){callback(null, state)},
  		getCandidateData
  		], function(err, results){
  			res.json(results);
  		});
};

exports.getCandidateDetails = function (req, res) {
	var candidateId = req.params.candidateId;
	console.log("Candidate Id is " + candidateId);
	http.get('http://api.nytimes.com/svc/elections/us/v3/finances/2014/candidates/'+candidateId+'.json?api-key=4aa4fc19b02fb4f07e622815725030f3:4:69239152', 
	function(apiRequest) {
		var output='';
		
	   apiRequest.on('data', function(data){
		   console.log("BODY: " + data);
		   output+=data;
	   	});
		
		apiRequest.on('end', function() {
		            var obj = JSON.parse(output);
		            res.json(obj);
		        });
		
	})
};