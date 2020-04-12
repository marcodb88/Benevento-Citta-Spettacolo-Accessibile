"use strict";

document.write("<script type='text/javascript' src='js/outputStrings.js'> <\/script>");

var current_level_app;

var counter_programma;
var counter_tour;

var counter_voci_programma=6;
var counter_voci_tour=8;

var counter_venerdi_quattro;
var counter_voci_venerdi_quattro = 2;
var counter_sabato_cinque;
var counter_voci_sabato_cinque = 8;
var counter_domenica_sei;
var counter_voci_domenica_sei = 9;
var counter_venerdi_undici;
var counter_voci_venerdi_undici = 8;
var counter_sabato_dodici;
var counter_voci_sabato_dodici = 11;
var counter_domenica_tredici;
var counter_voci_domenica_tredici = 8;


function onBodyLoad() {
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
    current_level_app = 0; //prima schermata    
	
	open_xml_strings();	//per settare il file xml adatto

    var benvenuto= get_value_from_xml('benvenuto_text');

    set_output(benvenuto);	//creazione dei vari output
	
}

function onDeviceReady() {
		
	window.plugins.insomnia.keepAwake(); //per fare restare on lo schermo
	
	//document.addEventListener("backbutton", onBackKeyDown, false);	
	//document.addEventListener("menubutton", onMenuKeyDown, false);
	
	//document.addEventListener("searchbutton", onSearchKeyDown, false);	
	//document.addEventListener("startcallbutton", onStartCallKeyDown, false);	
	//document.addEventListener("endcallbutton", onEndCallKeyDown, false);
	
	//document.addEventListener("pause", onPause, false);
	//document.addEventListener("resume", onResume, false);
		
}


function onBackKeyDown() {
    var xmlString = get_value_from_xml('no_action');
    set_output(xmlString);	//creazione dei vari output
}

function onMenuKeyDown() {
    var xmlString = get_value_from_xml('no_action');
    set_output(xmlString);	//creazione dei vari output

}

function onPause() {
    var xmlString = get_value_from_xml('no_action');
    set_output(xmlString);	//creazione dei vari output
}

function onResume() {
    var xmlString = get_value_from_xml('no_action');
    set_output(xmlString);	//creazione dei vari output
}

function onSearchKeyDown() {
	var xmlString = get_value_from_xml('no_action');
	set_output(xmlString);
}

function onStartCallKeyDown() {
	var xmlString = get_value_from_xml('no_action');
	set_output(xmlString);
}

function onEndCallKeyDown() {
	var xmlString = get_value_from_xml('no_action');
	set_output(xmlString);
}


function menu (touch){
	
    if(current_level_app==0){
        
        if(touch=='home'){
            var xmlString = get_value_from_xml('exit');
            pushing_button('home');	
            set_output(xmlString);		//creazione dei vari output
            sleep(1000);		//per dare tempo al tts di finire la frase
            navigator.app.exitApp(); //comando per chiudere l'applicazione
        }
        
        else if(touch=='enter'){	//descrizione evento
            var voceMenu= get_value_from_xml('text_bn_citta_spettacolo');
            pushing_button('up');	
            set_output(voceMenu);	//creazione dei vari output
        }
		
        else if(touch=='up'){
            current_level_app=1;
            counter_programma=0;
            navigate_string_programma();
			
            var xmlString = get_value_from_xml('selected_voce');
			var giorno = translate_giorno(counter_programma);
			
            var voceMenu = get_value_from_xml('navigate_programma');
         
            var output = voceMenu + ' ' + xmlString + ' ' + giorno;
				
            pushing_button('up');	
            set_output(output);	//creazione dei vari output
        }
		
        else if(touch=='down'){
			
			current_level_app=2;
            counter_tour=0;
            navigate_string_tour();
			
            var xmlString = get_value_from_xml('selected_voce');
			var giorno = translate_itinerario(counter_tour);
			
            var voceMenu = get_value_from_xml('navigate_tour');
         
            var output = voceMenu + ' ' + xmlString + ' ' + giorno;
				
            pushing_button('down');	
            set_output(output);	//creazione dei vari output
		
        }
		
    }
	
	else if(current_level_app==1){	//programma evento
		
		if(touch=='home'){
			
			current_level_app = 0; // torno al menu iniziale
            navigate_initial_menu(); //settaggio delle stringhe da stampare
           
            var xmlString = get_value_from_xml('menu_back');
			
            pushing_button('home');	//attivazione della vibrazione
            set_output(xmlString);	//creazione dei vari output
		
        }
		
		else if(touch=='enter'){
			
			if(counter_programma == 0){
				current_level_app=3;
				counter_venerdi_quattro = 0;
				navigate_string_venerdi_quattro();
				var ora= translate_venerdi_quattro(counter_venerdi_quattro);
			}
			else if(counter_programma == 1){
				current_level_app=4;
				counter_sabato_cinque = 0;
				navigate_string_sabato_cinque();
				var ora= translate_sabato_cinque(counter_sabato_cinque);
			}
			else if(counter_programma == 2){
				current_level_app=5;
				counter_domenica_sei = 0;
				navigate_string_domenica_sei();
				var ora= translate_domenica_sei(counter_domenica_sei);
			}
			else if(counter_programma == 3){
				current_level_app=6;
				counter_venerdi_undici = 0;
				navigate_string_venerdi_undici();
				var ora= translate_venerdi_undici(counter_venerdi_undici);
			}
			else if(counter_programma == 4){
				current_level_app=7;
				counter_sabato_dodici = 0;
				navigate_string_sabato_dodici();
				var ora= translate_sabato_dodici(counter_sabato_dodici);
			}
			else if(counter_programma == 5){
				current_level_app=8;
				counter_domenica_tredici = 0;
				navigate_string_domenica_tredici();
				var ora= translate_domenica_tredici(counter_domenica_tredici);
			}
			
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu= get_value_from_xml('continue_navigation_orario');
            
            var output= xmlString + ' ' + ora + '. ' + voceMenu;
				
            pushing_button('up');	//attivazione della vibrazione
            set_output(output, output);	//creazione dei vari output
		
        }
		
		else if(touch=='up'){
			
			if ((counter_programma + 1) < counter_voci_programma) {
			
				counter_programma++;
                var voce = translate_giorno(counter_programma);
				
				navigate_string_programma();
				var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_programma');
				
				var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			
			}
			else {
				var voce = translate_giorno(counter_programma);
                var xmlString = get_value_from_xml('no_voci');
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
		
        }
		
		else if(touch=='down'){
			
			if ((counter_programma - 1) < 0) {
				
				navigate_string_programma(); //per settare le stringhe da stampare
                
                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
			else {
				counter_programma--; 
                var voce = translate_giorno(counter_programma);
				
                navigate_string_programma(); //per settare le stringhe da stampare
                
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_programma');
                
                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			}
		
        }
		
	}
	
	else if(current_level_app==2){	//tour accessibile
		
		if(touch=='home'){
			
			current_level_app = 0; // torno al menu iniziale
            navigate_initial_menu(); //settaggio delle stringhe da stampare
           
            var xmlString = get_value_from_xml('menu_back');
			
            pushing_button('home');	//attivazione della vibrazione
            set_output(xmlString);	//creazione dei vari output
		
        }
		
		else if(touch=='enter'){
			
			var voceMenu = translate_itinerario_text(counter_tour);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu);	//creazione dei vari output
		
        }
		
		else if(touch=='up'){
			
			if ((counter_tour + 1) < counter_voci_tour) {
			
				counter_tour++;
                var voce = translate_itinerario(counter_tour);
				
				navigate_string_tour();
				var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_tour');
				
				var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			
			}
			else {
				var voce = translate_itinerario(counter_tour);
                var xmlString = get_value_from_xml('no_voci');
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
		
        }
		
		else if(touch=='down'){
			
			if ((counter_tour - 1) < 0) {
				
				navigate_string_tour(); //per settare le stringhe da stampare
                
                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
			else {
				counter_tour--; 
                var voce = translate_itinerario(counter_tour);
				
                navigate_string_tour(); //per settare le stringhe da stampare
                
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_tour');
                
                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			}
		
        }
		
	}
	
	else if(current_level_app==3){	//venerdi 4 settembre
		
		if(touch=='home'){
			
			current_level_app = 1;
			
            navigate_string_programma();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('continue_navigation_programma');
            var giorno = translate_giorno(counter_programma);
            var output =  xmlString + ' ' + giorno + '. ' + voceMenu;
				
            pushing_button('home');	//attivazione della vibrazione
            set_output(output);	//creazione dei vari output
			
		}
		
		else if(touch=='enter'){
			
			var voceMenu = translate_venerdi_quattro_text(counter_venerdi_quattro);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu);	//creazione dei vari output
			
		}
		
		else if(touch=='up'){
			
			if ((counter_venerdi_quattro + 1) < counter_voci_venerdi_quattro) {
			
				counter_venerdi_quattro++;
                var voce = translate_venerdi_quattro(counter_venerdi_quattro);
				
				navigate_string_venerdi_quattro();
				var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
				
				var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			
			}
			else {
				var voce = translate_venerdi_quattro(counter_venerdi_quattro);
                var xmlString = get_value_from_xml('no_voci');
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
		}
		
		else if(touch=='down'){
			
			if ((counter_venerdi_quattro - 1) < 0) {
				
				navigate_string_venerdi_quattro(); //per settare le stringhe da stampare
                
                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
			else {
				counter_venerdi_quattro--; 
                var voce = translate_venerdi_quattro(counter_venerdi_quattro);
				
                navigate_string_venerdi_quattro(); //per settare le stringhe da stampare
                
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
                
                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			}
			
		}
		
	}
	
	else if(current_level_app==4){	//sabato 5 settembre
		
		if(touch=='home'){
			
			current_level_app = 1;
			
            navigate_string_programma();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('continue_navigation_programma');
            var giorno = translate_giorno(counter_programma);
            var output =  xmlString + ' ' + giorno + '. ' + voceMenu;
				
            pushing_button('home');	//attivazione della vibrazione
            set_output(output);	//creazione dei vari output
			
		}
		
		else if(touch=='enter'){
			
			var voceMenu = translate_sabato_cinque_text(counter_sabato_cinque);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu);	//creazione dei vari output
			
		}
		
		else if(touch=='up'){
			
			if ((counter_sabato_cinque + 1) < counter_voci_sabato_cinque) {
			
				counter_sabato_cinque++;
                var voce = translate_sabato_cinque(counter_sabato_cinque);
				
				navigate_string_sabato_cinque();
				var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
				
				var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			
			}
			else {
				var voce = translate_sabato_cinque(counter_sabato_cinque);
                var xmlString = get_value_from_xml('no_voci');
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
		}
		
		else if(touch=='down'){
			
			if ((counter_sabato_cinque - 1) < 0) {
				
				navigate_string_sabato_cinque(); //per settare le stringhe da stampare
                
                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
			else {
				counter_sabato_cinque--; 
                var voce = translate_sabato_cinque(counter_sabato_cinque);
				
                navigate_string_sabato_cinque(); //per settare le stringhe da stampare
                
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
                
                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			}
			
		}
		
	}
	
	else if(current_level_app==5){	//domenica 6 settembre
		
		if(touch=='home'){
			
			current_level_app = 1;
			
            navigate_string_programma();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('continue_navigation_programma');
            var giorno = translate_giorno(counter_programma);
            var output =  xmlString + ' ' + giorno + '. ' + voceMenu;
				
            pushing_button('home');	//attivazione della vibrazione
            set_output(output);	//creazione dei vari output
			
		}
		
		else if(touch=='enter'){
			
			var voceMenu = translate_domenica_sei_text(counter_domenica_sei);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu);	//creazione dei vari output
			
		}
		
		else if(touch=='up'){
			
			if ((counter_domenica_sei + 1) < counter_voci_domenica_sei) {
			
				counter_domenica_sei++;
                var voce = translate_domenica_sei(counter_domenica_sei);
				
				navigate_string_domenica_sei();
				var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
				
				var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			
			}
			else {
				var voce = translate_domenica_sei(counter_domenica_sei);
                var xmlString = get_value_from_xml('no_voci');
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
		}
		
		else if(touch=='down'){
			
			if ((counter_domenica_sei - 1) < 0) {
				
				navigate_string_domenica_sei(); //per settare le stringhe da stampare
                
                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
			else {
				counter_domenica_sei--; 
                var voce = translate_domenica_sei(counter_domenica_sei);
				
                navigate_string_domenica_sei(); //per settare le stringhe da stampare
                
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
                
                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			}
			
		}
		
	}
	
	else if(current_level_app==6){	//venerdi 11 settembre
		
		if(touch=='home'){
			
			current_level_app = 1;
			
            navigate_string_programma();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('continue_navigation_programma');
            var giorno = translate_giorno(counter_programma);
            var output =  xmlString + ' ' + giorno + '. ' + voceMenu;
				
            pushing_button('home');	//attivazione della vibrazione
            set_output(output);	//creazione dei vari output
			
		}
		
		else if(touch=='enter'){
			
			var voceMenu = translate_venerdi_undici_text(counter_venerdi_undici);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu);	//creazione dei vari output
			
		}
		
		else if(touch=='up'){
			
			if ((counter_venerdi_undici + 1) < counter_voci_venerdi_undici) {
			
				counter_venerdi_undici++;
                var voce = translate_venerdi_undici(counter_venerdi_undici);
				
				navigate_string_venerdi_undici();
				var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
				
				var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			
			}
			else {
				var voce = translate_venerdi_undici(counter_venerdi_undici);
                var xmlString = get_value_from_xml('no_voci');
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
		}
		
		else if(touch=='down'){
			
			if ((counter_venerdi_undici - 1) < 0) {
				
				navigate_string_venerdi_undici(); //per settare le stringhe da stampare
                
                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
			else {
				counter_venerdi_undici--; 
                var voce = translate_venerdi_undici(counter_venerdi_undici);
				
                navigate_string_venerdi_undici(); //per settare le stringhe da stampare
                
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
                
                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			}
			
		}
		
	}
	
	else if(current_level_app==7){	//sabato 12 settembre
		
		if(touch=='home'){
			
			current_level_app = 1;
			
            navigate_string_programma();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('continue_navigation_programma');
            var giorno = translate_giorno(counter_programma);
            var output =  xmlString + ' ' + giorno + '. ' + voceMenu;
				
            pushing_button('home');	//attivazione della vibrazione
            set_output(output);	//creazione dei vari output
			
		}
		
		else if(touch=='enter'){
			
			var voceMenu = translate_sabato_dodici_text(counter_sabato_dodici);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu);	//creazione dei vari output
			
		}
		
		else if(touch=='up'){
			
			if ((counter_sabato_dodici + 1) < counter_voci_sabato_dodici) {
			
				counter_sabato_dodici++;
                var voce = translate_sabato_dodici(counter_sabato_dodici);
				
				navigate_string_sabato_dodici();
				var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
				
				var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			
			}
			else {
				var voce = translate_sabato_dodici(counter_sabato_dodici);
                var xmlString = get_value_from_xml('no_voci');
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
		}
		
		else if(touch=='down'){
			
			if ((counter_sabato_dodici - 1) < 0) {
				
				navigate_string_sabato_dodici(); //per settare le stringhe da stampare
                
                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
			else {
				counter_sabato_dodici--; 
                var voce = translate_sabato_dodici(counter_sabato_dodici);
				
                navigate_string_sabato_dodici(); //per settare le stringhe da stampare
                
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
                
                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			}
			
		}
		
	}
	
	else if(current_level_app==8){	//domenica 13 settembre
		
		if(touch=='home'){
			
			current_level_app = 1;
			
            navigate_string_programma();
            var xmlString = get_value_from_xml('selected_voce');
            var voceMenu = get_value_from_xml('continue_navigation_programma');
            var giorno = translate_giorno(counter_programma);
            var output =  xmlString + ' ' + giorno + '. ' + voceMenu;
				
            pushing_button('home');	//attivazione della vibrazione
            set_output(output);	//creazione dei vari output
			
		}
		
		else if(touch=='enter'){
			
			var voceMenu = translate_sabato_dodici_text(counter_domenica_tredici);
            pushing_button('up');	//attivazione della vibrazione
            set_output(voceMenu);	//creazione dei vari output
			
		}
		
		else if(touch=='up'){
			
			if ((counter_domenica_tredici + 1) < counter_voci_domenica_tredici) {
			
				counter_domenica_tredici++;
                var voce = translate_domenica_tredici(counter_domenica_tredici);
				
				navigate_string_domenica_tredici();
				var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
				
				var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			
			}
			else {
				var voce = translate_domenica_tredici(counter_domenica_tredici);
                var xmlString = get_value_from_xml('no_voci');
                
                pushing_button('up');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
		}
		
		else if(touch=='down'){
			
			if ((counter_domenica_tredici - 1) < 0) {
				
				navigate_string_domenica_tredici(); //per settare le stringhe da stampare
                
                var xmlString = get_value_from_xml('no_voci');
                pushing_button('down');	//attivazione della vibrazione
                set_output(xmlString);	//creazione dei vari output
			}
			
			else {
				counter_domenica_tredici--; 
                var voce = translate_domenica_tredici(counter_domenica_tredici);
				
                navigate_string_domenica_tredici(); //per settare le stringhe da stampare
                
                var xmlString1 = get_value_from_xml('selected_voce');
                var xmlString2 = get_value_from_xml('continue_navigation_orario');
                
                var current_state = xmlString1 + ' ' + voce + '. ' + xmlString2;
                
                pushing_button('down');	//attivazione della vibrazione
                set_output(current_state);	//creazione dei vari output
			}
			
		}
		
	}
	
}