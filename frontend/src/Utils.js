const trovaColoreProgressBar = (stato) => {
	if(stato > 80){
		return "success";
	}

	if(stato > 65){
		return "warning";
	}
	
	return "danger";
};

const scegliColoreGrafico = (parametro) => {
	switch (parametro) {
		case "Asfalto":
			return 'rgba(255, 0, 0, 0.6)';
			break;

		case "Elettricita":
			return 'rgba(0, 0, 0, 0.6)';
			break;

		case "Struttura":
			return 'rgba(0, 0, 255, 0.6)';
			break;
	}
}

function formatDate(date){

    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    date = dd+'/'+mm+'/'+yyyy;
    return date
 }

function LastDays (n) {
    var result = [];
    for (var i=0; i<n; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push( formatDate(d) )
    }

    return result;
}

const trovaColoreStato = (valoreStato) => {
	if(valoreStato > 80){
		return "green";
	}
	
	if(valoreStato > 65){
		return "orange";
	}
	
	return "red";
	

}

export { trovaColoreProgressBar, trovaColoreStato, scegliColoreGrafico, LastDays };