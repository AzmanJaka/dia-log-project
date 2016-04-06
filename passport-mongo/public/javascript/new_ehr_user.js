
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';



var username = 'ja2207@student.uni-lj.si';
var password = 'ja2207';
var authorization = "Basic " + (new Buffer(username + ":" + password).toString('base64'));
//var authorization = "Basic " + btoa(username + ":" + password);

var url = baseUrl + "/ehr";
var ehrId = "";

function createUser(){

$.ajaxSetup({
    headers: {
        "Authorization": authorization
    }
});
$.ajax({
    url: baseUrl + "/ehr",
    type: 'POST',
    success: function (data) {
        ehrId = data.ehrId;
        //document.getElementById("ehrId").innerHTML = ehrId;
        $("#ehrId").val(ehrId);
        //document.getElementById("test").innerHTML = ehrId;

        //("#testni").value(ehrId);

        // build party data
        var partyData = {
            firstNames: "Jaka",
            lastNames: "Azman",
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
        //return ehrId;
    }
});
}

function returnEhrId(){
    createUser();
    return ehrId;
}

