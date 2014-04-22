/*
 * Serve JSON to our AngularJS client
 */

http = require('http')

exports.getCandidates = function (req, res) {
	var state = req.params.state;
	  if (state != null){
		  state = state.toUpperCase();
	  }
	  else{
		  state = "MD"
	  }
	  console.log("State is " + state);
	http.get('http://api.nytimes.com/svc/elections/us/v3/finances/2014/seats/'+state+'.json?api-key=4aa4fc19b02fb4f07e622815725030f3:4:69239152', 
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