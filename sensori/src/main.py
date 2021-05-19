from genera_dati import nuovo_dato
import requests
import datetime
import time

def main():
	verbose = True
	r = requests.get("http://localhost:8000/get-sensori.php")
	sensori = r.json()
	#TODO fixare ordine delle date ricevute dal server
	while True:
		for sensore in sensori:
			if verbose: print("Sensore: ", sensore["IdSensore"])
			params = {
				"id": sensore["IdSensore"],
				"limite": 3
			}
			r = requests.get("http://localhost:8000/get-last-val.php", params=params)
			val = r.json()
			last_values = [(float(x["Valore"]), datetime.datetime.strptime(x["data"], "%Y-%m-%d").timestamp()) for x in reversed(val)]
			nuovo = nuovo_dato(last_values, prob_base_stazionare=0.3, momentum_mult=0.5, punti_momentum=3, verbose=verbose)
			if verbose: print("nuovo: ", nuovo)
			params = {
				"id": sensore["IdSensore"],
				"valore": nuovo
			}
			r = requests.post("http://localhost:8000/post-new-val-sensore.php", data=params)

			if verbose: print("\n")
		
		print("next")
		time.sleep(24*60*60) # attesa di 24 ore
	

if __name__ == "__main__":
	main()