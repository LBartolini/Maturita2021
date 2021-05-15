import numpy as np

def nuovo_dato(valori, tempi, prob_base_stazionare=0.8, max_decaduta=0.05, momentum_mult=1, punti_momentum=3, verbose=False):
	if len(valori)<punti_momentum:
		return 100

	last_punti = [(x, y) for x, y in zip(valori[-punti_momentum:], tempi[-punti_momentum:])]

	momentum = trova_rischio(last_punti, punti_momentum)

	if momentum > 0:
		return 100

	if verbose: print("Momentum ", momentum)

	prob_staz = max(0.2, prob_base_stazionare - min(0.4, abs(momentum)*momentum_mult))
	if verbose: print("prob staz ", prob_staz)
	if verbose: print("prob BASE staz ", prob_base_stazionare)

	if np.random.random() < prob_staz:
		return valori[-1] # last array con gli ultimi 3 punti (x, y)
	else:
		# trovare nuovo valore
		offset = (min(abs(momentum), 4)*2)/100 # momentum influenza al massimo l'8% del nuovo valore
		delta = np.random.randint(valori[-1]*offset, valori[-1]*offset+valori[-1]*max_decaduta)
		if verbose: print("Delta ",delta)
		return valori[-1]-delta

def trova_rischio(last_punti, punti_momentum):
	return sum([trova_m(last_punti[-(i+1)], last_punti[-1]) for i in range(1, punti_momentum)])/punti_momentum

def trova_m(p1, p2):  #p1 e p2 del tipo (x, y)
	try:
		m = (p2[1] - p1[1])/(p2[0] - p1[0])
	except ZeroDivisionError:
		m = 0

	return m