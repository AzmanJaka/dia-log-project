
   var baseUrl = "https://rest.ehrscape.com/rest/v1";
    var glucose_levels = [];
    var queryUrl = baseUrl + '/query';
        var username = 'ja2207@student.uni-lj.si';
        var password = 'ja2207';
        
    var ehrId = "#{user.ehrId}";
    
    var authorization = "Basic " + btoa(username + ":" + password);
    
    function getSessionId() {
    
        var response = $.ajax({
            type: "POST",
            url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                    "&password=" + encodeURIComponent(password),
            async: false
        });
        return response.responseJSON.sessionId;
    }
    
    
    function getPatientVitalData(ehr_id){
        $.ajaxSetup({
        headers: {
            "Authorization": authorization
        }
        });
       
        //var aql = "SELECT a_a#Result_Group/Result/Glucose_Result as Glucose_Result FROM EHR e CONTAINS COMPOSITION a CONTAINS OBSERVATION a_a#Blood_Glucose_Test_Result OFFSET 0 limit 100";
        var aql = "select a_a/data[at0001|Event Series|]/events[at0002|Any event|]/data[at0003]/items[at0095|Result Group|]/items[at0096|Result|]/items[at0078.1.1|Glucose Result|]/value as Glucose_Result " +
        "from EHR e " +
        "contains COMPOSITION a " +
        "contains OBSERVATION a_a[openEHR-EHR-OBSERVATION.pathology_test-blood_glucose-ltfe.v1|Blood_Glucose_Test_Result|] "+
        "order by a_a/data[at0001|Event Series|]/events[at0002|Any event|]/data[at0003]/items[at0075|DateTime Result Issued|]/value/value desc "+
        "offset 0 limit 5";
        $.ajax({
            url: baseUrl + "/query?" + $.param({"aql": aql}),
            type: 'GET',
            success: function (res) {
                $("#header").html("Compositions");
                var rows = res.resultSet;
                rowe = rows;
                for (var i in rows) {
                    $("#result").append(rows[i].Glucose_Result.magnitude + " " + rows[i].Glucose_Result.units + "<br>");
                    glucose_levels.push(rows[i].Glucose_Result.magnitude);
                   // alert(JSON.stringify(rows[i].Glucose_Result));
                }
            }
        });
        //return glucose_levels;
    }

    function writePatientBloodGlucoseData(ehrId, glucose, units) {
    	var sessionId = getSessionId();
    	$.ajaxSetup({
    	    headers: {
    	        //"Authorization": authorization,
    	        "Ehr-Session": sessionId
    	    }
    	});
    	var compositionData = {
    
    		// Preview Structure: https://rest.ehrscape.com/rest/v1/template/Blood_Glucose_LTFE/example
    	    "ctx/language":"en",
    	    "ctx/territory":"SI",
    	    "blood_glucose_test/blood_glucose_test_result:0/any_event:0/datetime_result_issued": new Date(),
    	    "blood_glucose_test/blood_glucose_test_result:0/any_event:0/result_group:0/result:0/glucose_result|magnitude":glucose,
    	    "blood_glucose_test/blood_glucose_test_result:0/any_event:0/result_group:0/result:0/glucose_result|unit":units
    	};
    	var queryParams = {
    	    "ehrId": ehrId,
    	    templateId: 'Blood_Glucose_LTFE',
    	    format: 'FLAT',
    	    committer: 'Silvia Blake'
    	};
    	$.ajax({
    	    url: baseUrl + "/composition?" + $.param(queryParams),
    	    type: 'POST',
    	    contentType: 'application/json',
    	    data: JSON.stringify(compositionData),
    	    success: function (res) {
    	        $("#header").html("Store composition");
    	        $("#result").html(res.meta.href);
    	    },
    	    error: function(res){
    	        $("#result").html(JSON.stringify(res));
    	        alert(res.responseText + ", " + res.statusText);
    	    }
    	});
        //alert("Ajax: " + xhr.responseText);
    
    
    }
    function writePatientVitalData() {
    
    	var sessionId = getSessionId();
      	console.log(sessionId);
    
    	//var ehrId = document.forms["formWriteVitalData"].ehrId.value;
      	//var dataTime = document.forms["formWriteVitalData"].dataTime.value;
      	var dataBodyHeight = 100;
      	var dataBodyWeight = 100;
    	var dataBodyTemperature = 38;
    	var dataBloodPressureSystolic = 25;
    	var dataBloodOxigenSaturation = 35;
      	var dataCommitter = "Jaka";
      	
    	$.ajaxSetup({
    	    headers: {
    	        "Ehr-Session": sessionId
    	    }
    	});
    	var compositionData = {
    
    		// Preview Structure: https://rest.ehrscape.com/rest/v1/template/Vital%20Signs/example
    
    	    "ctx/language": "en",
    	    "ctx/territory": "SI",
    	    "ctx/time": "2014-8-11T13:10Z",
    	    "vital_signs/height_length/any_event/body_height_length": dataBodyHeight,
    	    "vital_signs/body_weight/any_event/body_weight": dataBodyWeight,
    	   	"vital_signs/body_temperature/any_event/temperature|magnitude": dataBodyTemperature,
    	    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
    	    "vital_signs/blood_pressure/any_event/systolic": dataBloodPressureSystolic,
    	    "vital_signs/blood_pressure/any_event/diastolic": 35,
    	    "vital_signs/indirect_oximetry:0/spo2|numerator": dataBloodOxigenSaturation
    
    	};
    	var queryParams = {
    	    "ehrId": ehrId,
    	    templateId: 'Vital Signs',
    	    format: 'FLAT',
    	    committer: dataCommitter
    	};
    	$.ajax({
    	    url: baseUrl + "/composition?" + $.param(queryParams),
    	    type: 'POST',
    	    contentType: 'application/json',
    	    data: JSON.stringify(compositionData),
    	    success: function (res) {
    	        $("#header").html("Store composition");
    	        $("#result").html(res.meta.href);
    	    },
    	    error: function(res){
    	        alert("Wop!");
    	    }
    	});
    
    
    }
    

