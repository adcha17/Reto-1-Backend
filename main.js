$(function(){

	var config = {
		apiKey: "AIzaSyBXK9HrXsUbWUkQrIdHIGs6ZUPcrZZ_MsM",
		authDomain: "core-upgrade-5d3e2.firebaseapp.com",
		databaseURL: "https://core-upgrade-5d3e2.firebaseio.com",
		storageBucket: "core-upgrade-5d3e2.appspot.com",
		messagingSenderId: "344233321206"
	};
	firebase.initializeApp(config);

	var led = document.getElementById('led'),
	els = led.childNodes,
	uid=0, size=15, w=0, h=0, row=0, col=0,
	arr_lights=[];

	var hh = document.getElementById('time-hh'),
	hx = document.getElementById('time-h'),
	mm = document.getElementById('time-mm'),
	mx = document.getElementById('time-m'),
	ss = document.getElementById('time-ss'),
	sx = document.getElementById('time-s');

	for(var k=0, len=els.length; k<len; k++){
		if(els[k].nodeType!=1)
			continue;
		w = parseInt(els[k].clientWidth);
		h = parseInt(els[k].clientHeight);
		row   = parseInt(h/size);
		col = parseInt(w/size);

		var t, l, sum=0;
		for(var i=0; i<row; i++){
			for(var j=0; j<col; j++){
				uid++;
				t = size*i;
				l = size*j;
				arr_lights.push( '<div uid="'+uid+'" id="l-'+uid+'" class="light row-'+i+' col-'+j+'" style="top:'+t+'px;left:'+l+'px"></div>');
			}
		}
		els[k].innerHTML = arr_lights.join("");
		arr_lights=[];
	}

	setInterval(function(){
		var now = new Date(),
		time_hh = parseInt(now.getHours()),
		time_mm = parseInt(now.getMinutes())

		hh.className = "block-digital num-"+parseInt(time_hh/10);
		hx.className = "block-digital num-"+parseInt(time_hh%10);
		mm.className = "block-digital num-"+parseInt(time_mm/10);
		mx.className = "block-digital num-"+parseInt(time_mm%10);


	}, 1000);

//captura el value del input con id=user
function getUser() {
	var input_user_val = $("#user").val();
	if (input_user_val.trim().length===0) {
		alert("Por favor ingresa tu Usuario");
	}
	
	return input_user_val;
}
//captura la hora usando slice para obtener el ultimo carater usando slice(-1) a variable.className
function getHour() {
	return hh.className.slice(-1)+hx.className.slice(-1);
}
//captura los minutos usando slice para obtener el ultimo carater usando slice(-1) a variable.className
function getMinute() {
	return mm.className.slice(-1)+mx.className.slice(-1);
}
//genera el mensaje
function getMessage(user, hour, minute) {
	
		if (hour < 9) {
			var text_msg = 'Has madrugado, te mereces un premio';
			//console.log("mensaje: "+text_msg);
		}else if(hour == 9 && minute >= 0 && minute <= 15){
			var text_msg = 'Llegaste a la hora';
			//console.log("mensaje: "+text_msg);
		}else {
			var text_msg = 'Has llegado tarde';
			//console.log("mensaje: "+text_msg);
		}		
		//console.log(user+" - "+hour+" - "+minute+" - "+text_msg);
		return text_msg;
	
}

//captura el value del input con id=origen
function storeMessage(user, hour, minute, message) {
	
	//console.log(user+" - "+hour+" - "+minute+" - "+message);

	if (user.trim().length===0) {
		return false;
	}else{
		firebase.database().ref('asistencia/'+user).set({
			entrada: {hora: "09", minuto: "00"},
			llegada: {hora: hour, minuto:minute},
			mensaje: message
		});
	}
	
	
}

$(document).ready(function() {
	$("#btn-marcar").on('click', function(e) {

		var html = "";

		var user = getUser();
		var hour = getHour();
		var minute = getMinute();
		var message = getMessage(user,hour,minute);
		
		storeMessage(user,hour,minute, message);

		if (user.trim().length!==0) {
			var html = '<table class="table table-hover">'+
							'<thead>'+
								'<tr>'+
									'<th>Usuario</th>'+
									'<th>Hora Entrada</th>'+
									'<th>Hora Llegada</th>'+
									'<th>Mensaje</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody>'+
								'<tr>'+
									'<td>'+user+'</td>'+
									'<td>9:00</td>'+
									'<td>'+hour+':'+minute+'</td>'+
									'<td>'+message+'</td>'+
								'</tr>'+
							'</tbody>'+
						'</table>';

			$(".section").html(html);
		}

		
		
	});
});



























//fin del jquery
});