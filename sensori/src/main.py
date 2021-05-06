from genera_dati import nuovo_dato
import matplotlib.pyplot as plt
import numpy as np

def main():
	dati = []
	tempo = []
	verbose = False
	prob_base_stazionare = 0.8
	decadimento_temporale = 0.99
	for i in range(1, 180, 2):
		if verbose: print("Minuto ", i)
		nuovo = nuovo_dato(dati, tempo, prob_base_stazionare=prob_base_stazionare, max_decaduta=0.1, momentum_mult=0.5, punti_momentum=10, verbose=verbose)
		prob_base_stazionare *= decadimento_temporale
		if nuovo < 60:
			break
		dati.append(nuovo)
		tempo.append(i)
		if verbose: print("\n")

	plt.plot(tempo, dati, '-ok')
	plt.xlabel("Tempo (min)")
	plt.ylabel("Salute infrastruttura (%)")
	plt.show()

if __name__ == "__main__":
	main()