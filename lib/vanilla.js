function $ (_element, _all){
	if(!_element)
        return document
        
    if (_all)
        return document.querySelectorAll(_element)
    else
        return document.querySelector(_element)
}

function $forEach (_element, _func){
	Array.prototype.forEach.call(document.querySelectorAll(_element), _func);
}

function $xhrRequest (_url, _onReady,_xhr){
	var xhr = _xhr || new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			_onReady(xhr.responseText, _xhr);
		}
	}
	xhr.open("GET", _url, true);
	xhr.send();
}

function $xhrPost (_url, _data, _onReady, _xhr) {
    const xhr = _xhr || new XMLHttpRequest();

    xhr.addEventListener( 'load', () => {console.log('request succesful!')});
    xhr.open( 'POST', _url );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
			_onReady(xhr.responseText, _xhr);
		}
    }

    xhr.send( JSON.stringify( _data ) );
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var onlyCharacters = '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    result += onlyCharacters.charAt(Math.floor(Math.random() * onlyCharacters.length));

    for ( var i = 0; i < length-1; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
 }