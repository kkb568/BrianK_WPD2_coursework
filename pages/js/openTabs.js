function openContent(evt,contentName) {
    var i;
    var tabLinks = document.getElementsByClassName("tabLinks");
    var tabContent = document.getElementsByClassName("tabContent");

    for(i=0;i<tabContent.length;i++) {
        tabContent[i].style.display = 'none';
    }

    for(i=0;i<tabLinks.length;i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active","");
    }

    document.getElementById(contentName).style.display = "block";
    evt.currentTarget.className += " active";
}