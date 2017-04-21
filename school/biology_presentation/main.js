var elements = ["main","intro","creationism","spontaneous-generation","pansperm","bioevolution"];
var start = 0;

function setPage(numb)
{
    for (var i = 0; i < elements.length; i++) {
        document.getElementById(elements[i]).style.display = "none";        
    }    
    document.getElementById(elements[numb]).style.display = "block";
}

function incPage()
{
    if (start < 5)
        start++;
    setPage(start);
}

function decPage()
{
    if (start > 0)
        start--;
    setPage(start);
}

window.onload = function() {
    setPage(0);
    document.addEventListener("keydown", function(e) {if (e.keyCode == "37") {decPage();} else if (e.keyCode == "39") {incPage();}}, false)
}