# Appunti per RETE

## Firewall 5505

attivare key che si trovano all'inizio della CLi con 

activation-key <tutte le 5 chiavi>

ramo outside 
- security level 0
- interface Vlan2
- ip address con ip pubblico (?)

ramo inside protetto
- security level 100

dmz 
- security level 50 (modificabile)

*DHCP configurabile sul firewall*

configurare vlan3 per dmz
- interface <interfaccia>
- switchport access vlan 3
- interface vlan3
- ip address 192.168.2.14 255.255.255.240
- nameif dmz
- security-level 50
  
 applicare routing statico al fw
 - route outside 0.0.0.0 0.0.0.0 195.191.53.6
  (route outside <ip dest> <mask dest> <next_op>)
  con 0.0.0.0 e mask 0.0.0.0 si identifica tutto il traffico
  
 configurare napt da inside-outside che dmz-outside per traslare ip sorgente in 195.191.53.1
 creare oggetti che identificano vlan
  - object network inside-subnet (inisde subnet etichetta che mi identifica le seguenti configurazioni)
  - subnet 192.168.1.0 255.255.255.0
  
  -object network outside-subnet
  -subnet 195.191.53.0 255.255.255.248
	
 - object network dmz-subnet
 - subnet 192.168.2.0 255.255.255.240
  
 per configurare napt entrare nella configurazione dei singoli object
  nat (inside, outside) dynamic interface
  
 a questo punto il traffico in uscita è permessa ma non è permesso ai pacchetti di risposta di rientrare 
  perchè vlan outside ha security level 0 mentre le altre 50 e 100 quindi blocca il pacchetto di rientro.
  
  
  per accettare i pacchetti di ritorno:
  
  - class-map inspection_default
  - match default-inspection-traffic
  - exit
  
  -match default-inspection-traffic
  - match default-inspection-traffic
  - inspect icmp
  - inspect http
  -inspect ftp
  - exit
  - service-policy global_policy global
  
  
  
  
