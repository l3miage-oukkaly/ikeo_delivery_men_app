# Ikeo Delivery - V1.0 (Golem)

### Version française :

L'application permet à un livreur de visualiser la tournée lui est associée pour la journée en cours.

Au démarrage de l'application :
- Le livreur saisit son adresse mail afin de créer un header d'identification pour les 
requêtes au serveur
- Il accède à un écran avec un bouton qui lui permet de visualiser la tournée qui lui est attribuée

Le processus de visualisation consiste en :
- Requête au serveur de la Tournée, en lui passant l'adresse mail du livreur en header
- Le serveur renvoie la Tournée sous la forme :
  - Tournée { Livraisons : Delivery[], Livreurs : DeliveryMan[], Camion : Truck }
- Le client se charge ensuite d'afficher l'équipe du livreur : Nom, Prénom des livreurs & Camion
- Le client affiche également les différentes livraisons sous forme de liste

---

### English version :

The app enables a delivery man to visualize an assigned delivery tour for the day.

On startup :
- The delivery man enters its e-mail address to create an identification header for
server requests
- He then has access to a view with a single button that enables him to visualize its assigned delivery tour

The visualization process consists in :
- Request the DeliveryTour to the server, forwarding its email in the request header
- The server communicates back the DeliveryTour :
  - DeliveryTour { Deliveries : Delivery[], DeliveryMan[], Truck }
- The client then displays the delivery man's team : Name, Surname of delivery men & Truck
- The client finally displays the deliveries as a list
