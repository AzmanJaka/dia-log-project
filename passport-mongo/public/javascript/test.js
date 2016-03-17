var baseUrl = "https://rest.ehrscape.com/rest/v1";
    var ehrId = "42629e99-95b4-4880-9bd8-6d5ab1c8bdd2";
    var username = 'ja2207@student.uni-lj.si';
    var password = 'ja2207';
    
    var ehrId = '78499c04-871f-4d05-8992-7b4229971899';
    
    var authorization = "Basic " + btoa(username + ":" + password)

$.ajax({
    url: baseUrl + "/view/" + ehrId + "/body_temperature",
    type: 'GET',
    headers: {
        "Authorization": authorization
    },
    success: function (res) {
        $("#header").append("Body Temperatures");
        for (var i in res) {
            $("#temperature").append(res[i].time + ': ' + res[i].temperature  + res[i].unit + "<br>");
        }
    }
});