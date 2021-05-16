const trovaColoreProgressBar = (stato) => {
	if(stato > 75){
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

const trovaColoreStato = (valoreStato) => {
	if(valoreStato > 75){
		return "green";
	}
	
	if(valoreStato > 65){
		return "orange";
	}
	
	return "red";
	

}

export { trovaColoreProgressBar, trovaColoreStato, scegliColoreGrafico };