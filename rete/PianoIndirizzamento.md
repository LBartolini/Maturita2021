# Piano d'Indirizzamento della Rete Informatica

## Reti:

- Sede Centrale

- Accentratore

---

## Sede Centrale



---

## Accentratore

Indirizzo di partenza: 192.168.0.0/27

Maschera di sottorete: 255.255.255.224

Wildcard: 0.0.0.31

### Sottoreti:

- Accentratore

- Infrastruttura A

- Infrastruttura B



#### Accentratore

Host: 1; Stampanti: 0; Ampliamenti futuri: 0;

IP riservati: 3 (This Net, Gateway, Broadcast)

Fabbisogno: 4 ip

Slash di sottorete: /30 (con h=2)

#### Infrastruttura A

Host: 1; Stampanti: 0; Ampliamenti futuri: 0;

IP riservati: 3 (This Net, Gateway, Broadcast)

Fabbisogno: 4 ip

Slash di sottorete: /30 (con h=2)

#### Infrastruttura B

Host: 1; Stampanti: 0; Ampliamenti futuri: 0;

IP riservati: 3 (This Net, Gateway, Broadcast)

Fabbisogno: 4 ip

Slash di sottorete: /30 (con h=2)

#### PaP A-GW

Host: 2; Stampanti: 0; Ampliamenti futuri: 0;

IP riservati: 2 (This Net, Broadcast)

Fabbisogno: 4 ip

Slash di sottorete: /30 (con h=2)

#### PaP B-GW

Host: 2; Stampanti: 0; Ampliamenti futuri: 0;

IP riservati: 2 (This Net, Broadcast)

Fabbisogno: 4 ip

Slash di sottorete: /30 (con h=2)

### Complessivo

Fabbisogno: 4 ip (SR Accentratore) + 4 ip (SR Infr A) + 4 ip (SR Infr B) + 4 ip (PaP A-GW) + 4 ip (PaP B-GW) = 20 ip

Slash di Rete: /27 (con h=5)

### Assegnazione IP:

#### Accentratore

This Net: 192.168.0.0

Subnet Mask: 255.255.255.252

Range Host: 192.168.0.1  (un unico IP assegnabile)

Gateway: 192.168.0.2

Broadcast: 192.168.0.3

#### Infr A

This Net: 192.168.0.4

Subnet Mask: 255.255.255.252

Range Host: 192.168.0.5 (un unico IP assegnabile)

Gateway: 192.168.0.6

Broadcast: 192.168.0.7

#### PaP A-GW

This Net: 192.168.0.8

Subnet Mask: 255.255.255.252

Range Host: 192.168.0.9 -> 192.168.0.10

Broadcast: 192.168.0.11

#### Infr B

This Net: 192.168.0.12

Subnet Mask: 255.255.255.252

Range Host: 192.168.0.13 (un unico IP assegnabile)

Gateway: 192.168.0.14

Broadcast: 192.168.0.15

#### PaP B-GW

This Net: 192.168.0.16

Subnet Mask: 255.255.255.252

Range Host: 192.168.0.17 -> 192.168.0.18

Broadcast: 192.168.0.19
