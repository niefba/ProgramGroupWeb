'use strict';

/* Services */

angular.module('app.services', [], function($provide) {

   /**
   * Manager
   */
  $provide.factory('Manager', ['$rootScope', '$http', '$location', function($rootScope, $http, $location) {
      var manager = {};

      var ManagerFactory = {

        saveTransaction : function (transaction) {
          $http({
            url: '/saveTransaction',
            method: "POST",
            data: {transaction: transaction},
          }).
          error(function(data, status, headers, config) {
            //$scope.errorMessage = 'Translation error';
          }).
          success(function(data, status, headers, config) {
            manager.transaction = transaction;
            //$scope.data = $scope.transaction;
          });

        },
         init : function (key) {
            $http({
              url: '/data',
              method: "GET",
              params: {token: key},
            }).
            error(function(data, status, headers, config) {
               console.log(data);
            }).
            success(function(data, status, headers, config) {
              console.log(data);
              manager.transaction = data;
              var types = ['eventPersonalization', 'vipOffered', 'vip', 'arrivalNoTransfer', 'departNoTransfer',
                'transferArrival', 'transfertDepart', 'coffeeBreaks', 'cocktails', 'restaurantIncluded', 'restaurantExtra', 'additionalMeals', 'conferenceRooms',
                'basicEquipment', 'rentalEquipment', 'discovery', 'otherServices', 'skiRental', 'skiBootRental', 'skiInstructor'];
              angular.forEach(types, function(type) {
                if (!manager.transaction[type]) {
                  manager.transaction[type] = {commentProduction: '', commentResort: ''};
                }
              });
               
              $location.path('/');
            });
         },
         get : function () {
           return manager;
         },
       }
       return ManagerFactory;
  }]),

  
  /**
   * Translation
   */
  $provide.factory('Translation', ['$rootScope', function($rootScope) {
    var ref = {
      "companyActivity" : [
         {"fr": "Agence de voyage", "en": "Travel agency"},
         {"fr": "Industrie", "en": "Industry"},
      ],
      "aimOfMeeting" :  [
         {"fr": "Challenge", "en": "Challenge"},
         {"fr": "Détente", "en": "Relaxation"},
         {"fr": "Séminaire de travail", "en": "Seminar work"},
         {"fr": "Récompense", "en": "Reward"},
         {"fr": "Fédérer les équipes", "en": "Unite teams"},
         {"fr": "Voyage clients", "en": "Customers travel"},
         {"fr": "Lancement de produit", "en": "Product launch"},
         {"fr": "Convention", "en": "Convention"},
         {"fr": "Formation", "en": "Training"},
         {"fr": "Team building", "en": "Team building"},
      ],
      "leaderFunction" : [
         {"fr": "Directeur", "en": "CEO"},
         {"fr": "Manager", "en": "Manager"},
      ],
    }
    var msg = {
      "1"  : {"fr": "Jan.", "en": "Jan."},
      "2"  : {"fr": "Fév.", "en": "Feb."},
      "3"  : {"fr": "Mars", "en": "Mar."},
      "4"  : {"fr": "Avr.", "en": "Apr."},
      "5"  : {"fr": "Mai", "en": "May"},
      "6"  : {"fr": "Juin", "en": "Jun."},
      "7"  : {"fr": "Juil.", "en": "Jul."},
      "8"  : {"fr": "Août", "en": "Aug."},
      "9"  : {"fr": "Sep.", "en": "Sep."},
      "10" : {"fr": "Oct.", "en": "Oct."},
      "11" : {"fr": "Nov.", "en": "Nov."},
      "12" : {"fr": "Déc.", "en": "Dec."},
      "save" : {"fr": "Sauvegarder", "en": "Save changes"},
      "close" : {"fr": "Fermer", "en": "Close"},
      "cancel" : {"fr": "Annuler", "en": "Cancel"},
      "formatDate" : {"fr": "aaaa-mm-jj", "en": "yyyy-mm-dd"},
      "formatHour" : {"fr": "hh:mm", "en": "hh:mm"},
      "today"                 : {"fr": "Aujourd'hui", "en": "Today"},
      "home"                 : {"fr": "Accueil", "en": "Home"},
      "about"                 : {"fr": "A propos", "en": "About"},
      "contact"                 : {"fr": "Contact", "en": "Contact"},
      "from"                  : {"fr": "Du", "en": "From"},
      "to"                      : {"fr": "au", "en": "to"},
      "edit"                    : {"fr": "Editer", "en": "Edit"},
      "services"             : {"fr": "Prestations", "en": "Services"},
      "print"                   : {"fr": "Imprimer", "en": "Print"},
      "documents"         : {"fr": "Documents", "en": "Documents"},
      "language"            : {"fr": "Langue", "en": "Language"},
      "french"                : {"fr": "Français", "en": "French"},
      "english"               : {"fr": "Anglais", "en": "English"},
      "total"               : {"fr": "Total", "en": "Total"},

      // Radio Origin
      "shop" : {"fr": "Boutique", "en": "Shop"},
      "customer" : {"fr": "Client", "en": "Customer"},
      "other" : {"fr": "Autre", "en": "Other"},

      // Radio beforeAfterLunch
      "beforeLunch":  {"fr": "Avant", "en": "Before"},
      "afterLunch":  {"fr": "Après", "en": "After"},

      // Radio busCarTaxi
      "bus" : {"fr": "Bus", "en": "Bus"},
      "car" : {"fr": "Voiture", "en": "Car"},
      "taxi" : {"fr": "Taxi", "en": "Taxi"},

      // Radio clubTicket
      "yes" : {"fr": "Oui", "en": "Yes"},
      "no" : {"fr": "Non", "en": "No"},

      // Radio lunchDinner
      "lunch" : {"fr": "Déjeuner", "en": "Lunch"},
      "dinner" : {"fr": "Dîner", "en": "Dinner"},

      // Select arrangement
      "arrangementU" : {"fr": "En U", "en": "U style"},
      "arrangementTheatre" : {"fr": "Théâtre", "en": "Theatre"},
      "arrangementConference" : {"fr": "Conférence", "en": "Conference"},
      "arrangementClassroom" : {"fr": "Salle de classe", "en": "Classroom"},

      // Select payment
      "paymentClubmed"               : {"fr": "M&E", "en": "M&E"},
      "paymentCustomer"               : {"fr": "Client", "en": "Customer"},
      "paymentResort"               : {"fr": "Village", "en": "Resort"},

      "noLine"               : {"fr": "Aucune ligne.", "en": "No line."},
      "noComment"               : {"fr": "Aucun commentaire.", "en": "No comment."},
      "comment"               : {"fr": "Commentaire", "en": "M&E Comment"},
      "commentProduction"               : {"fr": "Commentaires M&E", "en": "M&E Comments"},
      "commentResort"               : {"fr": "Commentaires Village", "en": "Resort Comments"},
      "addLine"                    : {"fr": "Ajouter une ligne", "en": "Add a line"},

      // Table columns for services
      "date"                    : {"fr": "Date", "en": "Date"},
      "schedule"                    : {"fr": "Horaire", "en": "Schedule"},
      "hour"                    : {"fr": "Heure", "en": "Time"},
      "hourFrom"                    : {"fr": "de", "en": "from"},
      "hourTo"                    : {"fr": "à", "en": "to"},
      "quantity"                    : {"fr": "Quantité", "en": "Quantity"},
      "price": {"fr": "Tarif unitaire", "en": "Unit price"},
      "prestation"                    : {"fr": "Prestation", "en": "Prestation"},
      "payment"                    : {"fr": "Paiement", "en": "Payment"},
      "hour":  {"fr": "Heure", "en": "Hour"},
      "nbPerson": {"fr": "Nb de personnes", "en": "No. of people"},
      "beforeAfterLunch":  {"fr": "Avant ou après déjeuner", "en": "Before or after lunch"},
      "busCarTaxi":  {"fr": "Bus ou voiture", "en": "Bus or car"},
      "nbBusTaxi": {"fr":  "Nb bus/taxi", "en": "No. bus/taxi"},
      "origin": {"fr": "Provenance", "en": "Origin"},
      "giftType": {"fr": "Type Cadeau", "en": "Type of gift"},
      "depositPrice": {"fr": "Prix Dépôt", "en": "Deposit price"},
      "cocktailType": {"fr": "Type de Cocktail", "en": "Type of cocktail"},
      "pricePerPerson": {"fr": "Tarif par personne", "en": "Price/pax"},
      "place": {"fr": "Lieu", "en": "Location"},
      "lunchDinner": {"fr": "Déjeuner / Dîner", "en": "Lunch/Dinner"},
      "discoveryType": {"fr": "Type d'excursion", "en" : "Type of excursion"},
      "dateFromTo": {"fr": "Date (du-au)", "en": "Date (from-to)"},
      "nbDay": {"fr": "Nbre de jours", "en": "No. of days"},
      "equipmentType": {"fr": "Type de matériel", "en": "Type of equipment"},
      "shoeRental": {"fr": "Loc. Chaussures", "en": "Quantity"},
      "skiRental": {"fr": "Loc. Skis", "en": "Quantity"},
      "roomName": {"fr": "Nom de la salle", "en": "Room name"},
      "room": {"fr": "Salle", "en": "Room"},
      "nbRoom": {"fr": "Nbre de Salles", "en": "No. of rooms"},
      "nbInstructor": {"fr": "Nbre de moniteurs", "en": "No. of Ski instructor"},
      "breakType": {"fr": "Type de pause", "en": "Type of breaks"},
      "welcomeType": {"fr": "Prestation", "en": "Prestation"},
      "serviceType": {"fr": "Type de prestation", "en": "Type of service"},
      "arrangement": {"fr": "Disposition", "en": "Room Style"},
      "flightTrainNo": {"fr": "N°Vol/N°Train", "en": "Train/Flight No."},
      "airportStation": {"fr": "Aéroport / Gare", "en": "Airport/Station"},
      "hourAirportStation": {"fr": "Heure Aéroport / Gare", "en": "Airport/Station hour"},
      "hourResort": {"fr": "Heure village", "en": "Resort hour"},
      "comingFrom": {"fr": "Provenance", "en": "Coming from"},
      "clubTicket": {"fr": "Billet Club", "en": "CM Tickets"},
      "destination": {"fr": "Destination", "en": "Destination"},
      "titleVIP": {"fr": "Nom Client", "en": "Client name"},
      "typeVIP": {"fr": "Type VIP", "en": "Type of VIP"},
      "arrivalDate": {"fr": "Date arrivée", "en": "Arrival date"},
      "names": {"fr": "Nom(s)", "en": "Name(s)"},

      // Informations
      "chiefOfVillage"       : {"fr": "Nom du Chef de Village", "en": "Chief of Village"},
      "resortManager"        : {"fr": "Nom du M&E", "en": "Resort M&E manager"},
      "resort"               : {"fr": "Nom du Village", "en": "Resort"},
      "salePerson"           : {"fr": "Chargé(e) de clientèle", "en": "Sale Person"},
      "executivePerson"      : {"fr": "Chargé(e) de production", "en": "M&E Executive"},
      "company"              : {"fr": "Nom de la société", "en": "Company name"},
      "remarks"              : {"fr": "Observations", "en": "Remarks"},
      "companyActivity"      : {"fr": "Activité de la société", "en": "Company activity sector"},
      "aimOfMeeting"         : {"fr": "Objectif de cette réunion", "en": "Aim of the meeting"},
      "leaderName"           : {"fr": "Nom du responsable", "en": "Name of group leader"},
      "leaderFunction"       : {"fr": "Fonction du responsable", "en": "Function of group leader"},
      "dates"                : {"fr": "Dates de séjour", "en": "Dates"},
      "dateFrom"             : {"fr": "Arrivée", "en": "Arrival"},
      "dateTo"               : {"fr": "Départ", "en": "Departure"},
      "numbreOfPeople"       : {"fr": "Nombre de participants", "en": "No. of people"},
      "transactionNumber"    : {"fr": "N° opération", "en": "Transaction #"},

      // Services
      "eventPersonalization" : {"fr": "Personnalisation Evénementielle", "en": "Event Personalization"},
      "vipOffered"           : {"fr": "VIP offert", "en": "VIP welcome offered"},
      "vip"                  : {"fr": "VIP", "en": "VIP paying welcome"},
      "gift"                 : {"fr": "Cadeau", "en": "Gift"},
      "calculateService"     : {"fr": "Calculer les prestations", "en": "Calculate services"},
      "OpenTextForProgram"   : {"fr": "Atteindre textes pour programme PDF", "en": "Open text for PDF program"},
      "arrivalNoTransfer"    : {"fr": "Arrivée sans transfert", "en": "Arrival with no transfers"},
      "departNoTransfer"     : {"fr": "Départ sans transfert", "en": "Departure with no transfer"},
      "transferArrival"      : {"fr": "Transfert Arrivée", "en": "Transfer on arrival"},
      "transfertDepart"      : {"fr": "Transfert Départ", "en": "Transfer on departure"},
      "coffeeBreaks"         : {"fr": "Pauses", "en": "Coffee Breaks"},
      "cocktails"            : {"fr": "Cocktails", "en": "Cocktails"},
      "restaurantIncluded"   : {"fr": "Restaurant SF", "en": "Restaurant included"},
      "restaurantExtra"      : {"fr": "Restaurant AF", "en": "Restaurant with extra fees"},
      "additionalMealsArrival"      : {"fr": "Repas supplémentaires arrivée", "en": "Arrival additional meals"},
      "additionalMealsDepart"      : {"fr": "Repas supplémentaires départ", "en": "Departure additional meals"},
      "conferenceRooms"      : {"fr": "Salles", "en": "Conference rooms"},
      "basicEquipment"       : {"fr": "Matériel base", "en": "Basic equipment"},
      "rentalEquipment"      : {"fr": "Matériel location", "en": "Rental equipment"},
      "eventManager"         : {"fr": "Chef de projet Evénementiel", "en": "Event Manager Project"},
      "discovery"            : {"fr": "Espace Découverte", "en": "Discovery"},
      "otherServices"        : {"fr": "Prestations autres", "en": "Other services"},
      "skiRental"            : {"fr": "Location de skis", "en": "Ski rental"},
      "skiBootRental"        : {"fr": "Location de chaussures", "en": "Ski boot rental"},
      "skiInstructor"        : {"fr": "Moniteur", "en": "Ski instructor"},
      "transactionUpdate"    : {"fr": "Mise à jour OP", "en": "Transaction update"},
      "programCreation"      : {"fr": "Création du programme PDF", "en": "PDF program creation"},
      "emailSending"         : {"fr": "Envoi par e-mail", "en": "Email sending"},
      "importedInfoLetter"   : {"fr": "Atteindre Lettre de renseignements importée", "en": "Open imported Information letter"},
      "printProgram"         : {"fr": "Impression programme", "en": "Print program"},
      "printTables"          : {"fr": "Impression tableaux", "en": "Print tables"},
      "printAll"             : {"fr": "Impression de tout", "en": "Print all"},
      "infoLetter"           : {"fr": "Atteindre lettre de renseignements", "en": "Open Information letter"},
      "infoLetterSend"       : {"fr": "Envoi lettre de renseignements", "en": "Send Information letter"},
      "infoLetterDownload"   : {"fr": "Importer lettre de renseignements", "en": "Download information letter"},
      "infoCannotBeModified" : {"fr": "Les informations grisées ne sont pas modifiables", "en": "Information in the grey area cannot be modified"},
      "contractualExtras"    : {"fr": "Atteindre prestations payantes prévues clients", "en": "Open contractual paying extras"},
      "nonContractualExtras" : {"fr": "Atteindre prestations payantes non prévues", "en": "Open non-contractual paying extras"},
      "clubMedExtras"       : {"fr": "Atteindre prestations M&E + Village", "en": "Open M&E + Resort extras"},
      "planningReport"       : {"fr": "Atteindre rapprochement Village", "en": "Open Planning Report"},
    };


    var TranslationFactory = {
      getMsg : function () {
        return msg;
      },
      getRef : function () {
        return ref;
      },
    }
    return TranslationFactory;
  }]);

});