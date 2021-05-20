from genera_dati import nuovo_dato
import requests
import datetime
import time


def main():
    verbose = True
    r = requests.get("http://localhost:8000/get-sensori.php")
    sensori = r.json()

    for sensore in sensori:
        if verbose:
            print("Sensore: ", sensore["IdSensore"])
        params = {
            "id": sensore["IdSensore"],
            "limite": 3
        }
        r = requests.get("http://localhost:8000/get-last-val.php", params=params)
        val = r.json()
        last_values = [(datetime.datetime.strptime(x["data"], "%Y-%m-%d %H:%M:%S").timestamp(), float(x["Valore"])) for x in reversed(val)]
        nuovo = nuovo_dato(last_values, momentum_mult=1,
                               max_decaduta=0.05, punti_momentum=3, verbose=verbose)
        params = {
            "id": sensore["IdSensore"],
            "valore": nuovo
        }
        if verbose: print(params, "\n")
        #r = requests.post("http://localhost:8000/post-new-val-sensore.php", data=params)


if __name__ == "__main__":
    main()
