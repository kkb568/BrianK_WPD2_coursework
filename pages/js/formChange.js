function openOtherText(box,input) {
    var checkBox = document.getElementById(box);
    var textInput = document.getElementById(input);
    if(checkBox.checked) {
        textInput.style.visibility = 'visible';
    }
    else {
        textInput.style.visibility = 'hidden';
    }
}

function showServices() {
    var services = document.getElementById('category').value;
    if (services == 'estate') {
        document.getElementById('real_estate').style.display = 'block';
        document.getElementById('education').style.display = 'none';
        document.getElementById('wellness').style.display = 'none';
    }
    else if (services == 'education') {
        document.getElementById('real_estate').style.display = 'none';
        document.getElementById('education').style.display = 'block';
        document.getElementById('wellness').style.display = 'none';
    }
    else if (services == 'wellness') {
        document.getElementById('real_estate').style.display = 'none';
        document.getElementById('education').style.display = 'none';
        document.getElementById('wellness').style.display = 'block';
    }
}