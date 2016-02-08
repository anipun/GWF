"use strict";
var browserKey = "AIzaSyCLM6cJwB7MboHwwIK3oh-5BsyvtIWMrzk";
var previewTemplate = '<div id="@id" class="preview"> <span>@fontname</span><span>@category</span><span>@variants</span><div class="sample" @style >AaBbCcDd</div> </div>';

function fill(n) {
    getFontList();
}

function getFontList() {
    var url = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + browserKey;
    
    getRequest(url, function(data) {
        var jsonres = JSON.parse(data);
        var container = document.getElementById("body");
        container.innerHTML += "<br>";
        for (var i=0; i<jsonres.items.length; i++) {
            var font = jsonres.items[i];
            
            if(i<=200) {
                container.innerHTML += previewTemplate.replace('@id',i+1).replace('@fontname',font.family).replace('@category',font.category).replace('@variants',font.variants.length).replace("@style","style='font-family:"+font.family+"'");
            
                applyPreviewFont(font.family);
            } else {
                container.innerHTML += previewTemplate.replace('@id',i+1).replace('@fontname',font.family).replace('@category',font.category).replace('@variants',font.variants.length).replace("@style","");
            
            }
        }alert(i);
    });
}

function getRequest(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
          callback(xhttp.responseText);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function addFontPreview(family, category, variants) {
    
}

function applyPreviewFont(font) {
    var url = "//fonts.googleapis.com/css?family="+font.replace(' ','+')+"&text=aAbBcCdD";
    //getRequest(url, function(){
        
    //});
    var link = document.createElement("link");
    link.href = url;//"http://example.com/mystyle.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}