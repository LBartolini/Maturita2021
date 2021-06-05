from genera_dati import nuovo_dato
import requests
import datetime
import time

BASE_URL = "http://192.168.1.10/atmi-api"


def main():
    verbose = False
    send_data = True
    r = requests.get(BASE_URL+"/get-sensori.php")
    sensori = r.json()

    for sensore in sensori:
        if verbose:
            print("Sensore: ", sensore["IdSensore"])
        params = {
            "id": sensore["IdSensore"],
            "limite": 3
        }
        r = requests.get(BASE_URL+"/get-last-val.php", params=params)
        val = r.json()
        last_values = [(datetime.datetime.strptime(
            x["data"], "%Y-%m-%d").timestamp(), float(x["Valore"])) for x in reversed(val)]
        nuovo = nuovo_dato(last_values, momentum_mult=1, prob_base_stazionare=0.8,
                           max_decaduta=0.05, punti_momentum=3, verbose=verbose)
        params = {
            "id": sensore["IdSensore"],
            "valore": nuovo
        }
        if verbose:
            print(params, "\n")
        if send_data:
            r = requests.post(
                    BASE_URL+"/post-new-val-sensore.php", data=params)

if __name__ == "__main__":
    main()
