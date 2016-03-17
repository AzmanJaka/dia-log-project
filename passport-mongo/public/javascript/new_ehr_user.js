var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';


//var ehrId = '0569e0df-c936-4f8f-9815-068c0c8489dc';
var username = 'ja2207@student.uni-lj.si';
var password = 'ja2207';

var authorization = "Basic " + btoa(username + ":" + password);

$("#testni").prop("readonly", true);

$.ajaxSetup({
    headers: {
        "Authorization": authorization
    }
});
function createUser(){
$.ajax({
    url: baseUrl + "/ehr",
    type: 'POST',
    success: function (data) {
        var ehrId = data.ehrId;
        document.getElementById("testni").value = ehrId;
        //$("#testni").value(ehrId);

        // build party data
        var partyData = {
            firstNames: "Mary",
            lastNames: "Wilkinson",
            dateOfBirth: "1982-7-18T19:30",
            partyAdditionalInfo: [
                {
                    key: "ehrId",
                    value: ehrId
                }
            ]
        };
        $.ajax({
            url: baseUrl + "/demographics/party",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(partyData),
            success: function (party) {
                //if (party.action == 'CREATE') {
               //     $("#testni").html("Created: " + party.meta.href);
             //   }
            }
        });
    }
});
}