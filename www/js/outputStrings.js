
var xmlDocStrings;      //contiene il file con le stringhe
var langTextToSpeech;	//salva la lingua per il text to speech

var point_duration = 400;	//durata (in millisecondi) della vibrazione per la codifica del punto. 
var line_duration = 800;	//durata (in millisecondi) della vibrazione per la codifica della linea. 


function open_xml_strings() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "text/text.xml", false);
    xhttp.send();
    xmlDocStrings = xhttp.responseXML;
    langTextToSpeech = 'it-IT';
    navigate_initial_menu();
}

function get_value_from_xml(param) {	//per prendere il valore adatto da un file xml
    var x = xmlDocStrings.getElementsByTagName(param);
    return x[0].getAttribute("value");
}

function set_output_strings(str1, str2, str3, str4) { //si settano le stringhe da stampare nella homepage
	var statusdivHome = document.getElementById('statusdivHome');
    statusdivHome.innerHTML = '' + str1;
	var statusdivUp = document.getElementById('statusdivUp');
    statusdivUp.innerHTML = '' + str2;
	var statusdivEnter = document.getElementById('statusdivEnter');
    statusdivEnter.innerHTML = '' + str3;
	var statusdivDown = document.getElementById('statusdivDown');
    statusdivDown.innerHTML = '' + str4;
}

function set_output(textToPrint) {	//si manda la stringa giusta da mandare in output
	
	//alert(textToPrint);
	TTS.speak({text:textToPrint, locale: langTextToSpeech});	
}

function pushing_button(button) {
	//vibrazione di default che scatta ogni volta che viene premuto un tasto
	
	if(button == 'home') {			//home
		navigator.vibrate(line_duration);	//linea
	}		
	else if(button == 'up') {		//up
		navigator.vibrate(line_duration);	//linea - punto
		sleep(line_duration + 500);
		navigator.vibrate(point_duration);
	}
	else if(button == 'enter') {	//enter
		navigator.vibrate(point_duration);	//punto
	}
	else {							//down
		navigator.vibrate(point_duration);	//punto - linea
		sleep(point_duration + 500);
		navigator.vibrate(line_duration);	
	}	
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}



/************************** MENU INIZIALE ****************************/

function navigate_initial_menu() {
	
	var enter_bottom = get_value_from_xml('descrizione_evento');
	
    var back_xmlTemp = get_value_from_xml('exit');		
    var home_bottom = back_xmlTemp;
	
	var up_bottom= get_value_from_xml('programma');
	
	var down_bottom= get_value_from_xml('tour_accessibile');
	
	set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);	
}


/************************** PROGRAMMA ****************************/


function navigate_string_programma() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_giorno(counter_programma);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('menu');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_programma + 1) >= counter_voci_programma){
        var up_bottom= get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_giorno(counter_programma + 1);
    }
    
    if ((counter_programma - 1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_giorno(counter_programma - 1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_giorno(corrent_day){
	
    var return_string_xml;
	
    if(corrent_day==0)
        return_string_xml=get_value_from_xml('venerdi_quattro');
    else if(corrent_day==1)
        return_string_xml=get_value_from_xml('sabato_cinque');
    else if(corrent_day==2)
        return_string_xml=get_value_from_xml('domenica_sei');
    else if(corrent_day==3)
        return_string_xml=get_value_from_xml('venerdi_undici');
	else if(corrent_day==4)
        return_string_xml=get_value_from_xml('sabato_dodici');
	else if(corrent_day==5)
        return_string_xml=get_value_from_xml('domenica_tredici');
    
    return return_string_xml;
}


/************************** ITINERARIO ****************************/


function navigate_string_tour() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_itinerario(counter_tour);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('menu');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_tour + 1) >= counter_voci_tour){
        var up_bottom = get_value_from_xml('no_voci');
    }
    else{
        var up_bottom= translate_itinerario(counter_tour + 1);
    }
    
    if ((counter_tour - 1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_itinerario(counter_tour - 1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_itinerario(corrent_day){
	
    var return_string_xml;
	
    if(corrent_day==0)
        return_string_xml=get_value_from_xml('tour_accessibile_info');
    else if(corrent_day==1)
        return_string_xml=get_value_from_xml('rocca_rettori_piazza_castello');
    else if(corrent_day==2)
        return_string_xml=get_value_from_xml('corso_garibaldi_chiesa_santa_sofia');
    else if(corrent_day==3)
        return_string_xml=get_value_from_xml('museo_sannio');
	else if(corrent_day==4)
        return_string_xml=get_value_from_xml('arco_traiano');
	else if(corrent_day==5)
        return_string_xml=get_value_from_xml('duomo_percorso_ipogeo');
	else if(corrent_day==6)
        return_string_xml=get_value_from_xml('area_archeologica_sacramento');
	else if(corrent_day==7)
        return_string_xml=get_value_from_xml('teatro_romano');
    
    return return_string_xml;
}

function translate_itinerario_text(current_tour){
	
	var return_string_xml;
    
	if(current_tour==0)
        return_string_xml=get_value_from_xml('text_info_tour_accessibile');
    else if(current_tour==1)
        return_string_xml=get_value_from_xml('text_rocca_rettori_piazza_castello');
    else if(current_tour==2)
        return_string_xml=get_value_from_xml('text_corso_garibaldi_chiesa_santa_sofia');
    else if(current_tour==3)
        return_string_xml=get_value_from_xml('text_museo_sannio');
    else if(current_tour==4)
        return_string_xml=get_value_from_xml('text_arco_traiano');
    else if(current_tour==5)
        return_string_xml=get_value_from_xml('text_duomo_percorso_ipogeo');
    else if(current_tour==6)
        return_string_xml=get_value_from_xml('text_area_archeologica_sacramento');
    else if(current_tour==7)
        return_string_xml=get_value_from_xml('text_teatro_romano');
    
    return return_string_xml;
}

/************************** VENERDI 4 SETTEMBRE ****************************/

function navigate_string_venerdi_quattro() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_venerdi_quattro(counter_venerdi_quattro);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_venerdi_quattro + 1) >= counter_voci_venerdi_quattro){
        var up_bottom = get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_venerdi_quattro(counter_venerdi_quattro + 1);
    }
    
    if ((counter_venerdi_quattro - 1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_venerdi_quattro(counter_venerdi_quattro - 1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_venerdi_quattro(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('diciotto_trenta_quattro');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('ventuno_quattro');

    
    return return_string_xml;	
}

function translate_venerdi_quattro_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('text_diciotto_trenta_quattro');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('text_ventuno_quattro');
    
    return return_string_xml;	
}


/************************** SABATO 5 SETTEMBRE ****************************/

function navigate_string_sabato_cinque() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_sabato_cinque(counter_sabato_cinque);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_sabato_cinque + 1) >= counter_voci_sabato_cinque){
        var up_bottom = get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_sabato_cinque(counter_sabato_cinque + 1);
    }
    
    if ((counter_sabato_cinque - 1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_sabato_cinque(counter_sabato_cinque - 1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_sabato_cinque(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('nove_trenta_tredici_cinque');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('dieci_trenta_tredici_cinque');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('diciassette_diciannove_cinque');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('diciassette_venti_cinque');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('diciotto_cinque');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('diciotto_trenta_cinque');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('ventuno_cinque');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('ventidue_trenta_cinque');

    
    return return_string_xml;	
}

function translate_sabato_cinque_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('text_nove_trenta_tredici_cinque');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('text_dieci_trenta_tredici_cinque');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('text_diciassette_diciannove_cinque');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('text_diciassette_venti_cinque');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('text_diciotto_cinque');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('text_diciotto_trenta_cinque');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('text_ventuno_cinque');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('text_ventidue_trenta_cinque');
    
    return return_string_xml;	
}


/************************** DOMENICA 6 SETTEMBRE ****************************/

function navigate_string_domenica_sei() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_domenica_sei(counter_domenica_sei);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_domenica_sei + 1) >= counter_voci_domenica_sei){
        var up_bottom = get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_domenica_sei(counter_domenica_sei + 1);
    }
    
    if ((counter_domenica_sei - 1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_domenica_sei(counter_domenica_sei - 1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_domenica_sei(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('sei_sei');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('dieci_trenta_tredici_sei');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('diciassette_venti_sei');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('diciotto_sei');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('diciotto_trenta_sei');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('venti_trenta_sei');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('ventuno_trenta_sei');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('ventitre_sei');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('solo_sul_sito_sei');

    
    return return_string_xml;	
}

function translate_domenica_sei_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('text_sei_sei');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('text_dieci_trenta_tredici_sei');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('text_diciassette_venti_sei');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('text_diciotto_sei');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('text_diciotto_trenta_sei');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('text_venti_trenta_sei');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('text_ventuno_trenta_sei');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('text_ventitre_sei');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('text_solo_sul_sito_sei');
    
    return return_string_xml;	
}


/************************** VENERDI 11 SETTEMBRE ****************************/

function navigate_string_venerdi_undici() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_venerdi_undici(counter_venerdi_undici);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_venerdi_undici + 1) >= counter_voci_venerdi_undici){
        var up_bottom = get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_venerdi_undici(counter_venerdi_undici + 1);
    }
    
    if ((counter_venerdi_undici - 1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_venerdi_undici(counter_venerdi_undici - 1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_venerdi_undici(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('quindici_diciannove_undici');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('sedici_ventitre_undici');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('diciotto_undici');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('diciannove_undici');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('venti_undici');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('venti_trenta_undici');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('ventuno_trenta_undici');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('ventidue_trenta_undici');

    
    return return_string_xml;	
}

function translate_venerdi_undici_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('text_quindici_diciannove_undici');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('text_sedici_ventitre_undici');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('text_diciotto_undici');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('text_diciannove_undici');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('text_venti_undici');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('text_venti_trenta_undici');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('text_ventuno_trenta_undici');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('text_ventidue_trenta_undici');
    
    return return_string_xml;	
}


/************************** SABATO 12 SETTEMBRE ****************************/

function navigate_string_sabato_dodici() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_sabato_dodici(counter_sabato_dodici);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_sabato_dodici + 1) >= counter_voci_sabato_dodici){
        var up_bottom = get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_sabato_dodici(counter_sabato_dodici + 1);
    }
    
    if ((counter_sabato_dodici - 1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_sabato_dodici(counter_sabato_dodici - 1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_sabato_dodici(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('nove_trenta_tredici_dodici');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('dieci_trenta_tredici_dodici');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('quindici_diciannove_dodici');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('sedici_ventitre_dodici');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('diciassette_venti_dodici');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('diciotto_dodici');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('diciannove_dodici');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('ventuno_dodici');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('ventidue_trenta_dodici');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('ventitre_trenta_dodici');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('solo_sul_sito_dodici');

    
    return return_string_xml;	
}

function translate_sabato_dodici_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('text_nove_trenta_tredici_dodici');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('text_dieci_trenta_tredici_dodici');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('text_quindici_diciannove_dodici');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('text_sedici_ventitre_dodici');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('text_diciassette_venti_dodici');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('text_diciotto_dodici');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('text_diciannove_dodici');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('text_ventuno_dodoci');
	else if(current_time==8)
        return_string_xml=get_value_from_xml('text_ventidue_trenta_dodoci');
	else if(current_time==9)
        return_string_xml=get_value_from_xml('text_ventitre_trenta_dodici');
	else if(current_time==10)
        return_string_xml=get_value_from_xml('text_solo_sul_sito_dodici');
    
    return return_string_xml;	
}


/************************** DOMENICA 13 SETTEMBRE ****************************/

function navigate_string_domenica_tredici() {
    
    var current_xmlEnter = get_value_from_xml('enter');	
    var update_xmlTemp = translate_domenica_tredici(counter_domenica_tredici);			
    var enter_bottom = current_xmlEnter + ' ' + update_xmlTemp;
    
    var back_xmlTemp = get_value_from_xml('programma');		//se si vuole tornare al livello precedente
    var home_bottom = back_xmlTemp;
    
    if ((counter_domenica_tredici + 1) >= counter_voci_domenica_tredici){
        var up_bottom = get_value_from_xml('no_voci');
    }
    else{
        var up_bottom = translate_domenica_tredici(counter_domenica_tredici + 1);
    }
    
    if ((counter_domenica_tredici - 1) < 0){
        var down_bottom = get_value_from_xml('no_voci');
    }
    else{
        var down_bottom = translate_domenica_tredici(counter_domenica_tredici - 1);
    }
    
    set_output_strings(home_bottom, up_bottom, enter_bottom, down_bottom);
}

function translate_domenica_tredici(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('dieci_trenta_tredici_tredici');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('undici_tredici');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('quindici_diciannove_tredici');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('diciassette_venti_tredici');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('diciannove_tredici');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('venti_ventidue_quaranta_tredici');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('venti_tredici');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('ventuno_trenta_tredici');

    
    return return_string_xml;	
}

function translate_domenica_tredici_text(current_time){
	
	var return_string_xml;
	
    if(current_time==0)
        return_string_xml=get_value_from_xml('text_dieci_trenta_tredici_tredici');
    else if(current_time==1)
        return_string_xml=get_value_from_xml('text_undici_tredici');
	else if(current_time==2)
        return_string_xml=get_value_from_xml('text_quindici_diciannove_tredici');
	else if(current_time==3)
        return_string_xml=get_value_from_xml('text_diciassette_venti_tredici');
	else if(current_time==4)
        return_string_xml=get_value_from_xml('text_diciannove_tredici');
	else if(current_time==5)
        return_string_xml=get_value_from_xml('text_venti_ventidue_quaranta_tredici');
	else if(current_time==6)
        return_string_xml=get_value_from_xml('text_venti_tredici');
	else if(current_time==7)
        return_string_xml=get_value_from_xml('text_ventuno_trenta_tredici');
    
    return return_string_xml;	
}