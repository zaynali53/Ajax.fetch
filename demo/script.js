var link = document.getElementById('link');
var content = document.getElementById('content');

link.addEventListener("click", function(e) {
    content.innerHTML = "";
    link.innerHTML = "loading...";
    link.className = "btn btn-success";
    e.preventDefault();
    Ajax.fetch('data.json', function (data) {
        var text = "";
        data.map(function (obj) {
            text += "<div class='panel panel-primary'>";
            text += "<div class='panel-heading'>";
            text += "<h3 class='panel-title'>" + obj.first_name + ' ' + obj.last_name + "</h3>";
            text += "</div>";
            text += "<div class='panel-body'>";
            text += "<div class='row'>";
            text += "<div class='col-md-2'><b>ID:</b></div><div class='col-md-10'>" + obj.id + "</div>";
            text += "<div class='col-md-2'><b>Email:</b></div><div class='col-md-10'>" + obj.email + "</div>";
            text += "<div class='col-md-2'><b>Country:</b></div><div class='col-md-10'>" + obj.country + "</div>";
            text += "<div class='col-md-2'><b>IP Address:</b></div><div class='col-md-10'>" + obj.ip_address + "</div>";
            text += "</div>";
            text += "</div>";
            text += "</div>";
        });
        link.innerHTML = "Get Data";
        link.className = "btn btn-primary";
        content.innerHTML = text;
    }, 'json');
});
