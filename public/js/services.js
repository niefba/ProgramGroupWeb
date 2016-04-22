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
      "radioShop" : {"fr": "Boutique", "en": "Shop"},
      "radioCustomer" : {"fr": "Client", "en": "Customer"},
      "radioOther" : {"fr": "Autre", "en": "Other"},

      // Radio beforeAfterLunch
      "radioBeforeLunch":  {"fr": "Avant", "en": "Before"},
      "radioAfterLunch":  {"fr": "Après", "en": "After"},

      // Radio busCarTaxi
      "radioBus" : {"fr": "Bus", "en": "Bus"},
      "radioCar" : {"fr": "Voiture", "en": "Car"},
      "radioTaxi" : {"fr": "Taxi", "en": "Taxi"},

      // Radio clubTicket
      "yes" : {"fr": "Oui", "en": "Yes"},
      "no" : {"fr": "Non", "en": "No"},

      // Radio lunchDinner
      "radioLunch" : {"fr": "Déjeuner", "en": "Lunch"},
      "radioDinner" : {"fr": "Dîner", "en": "Dinner"},

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
      "roomName": {"fr": "Nom de la salle", "en": "Room name"},
      "room": {"fr": "Salle", "en": "Room"},
      "nbRoom": {"fr": "Nbre de Salles", "en": "No. of rooms"},
      "nbInstructor": {"fr": "Nbre de moniteurs", "en": "No. of Ski instructor"},
      "breakType": {"fr": "Type de pause", "en": "Type of breaks"},
      "welcomeType": {"fr": "Prestation", "en": "Prestation"},
      "serviceType": {"fr": "Type de prestation", "en": "Type of service"},
      "arrangement": {"fr": "Disposition", "en": "Room Style"},
      "flightTrainNo": {"fr": "N°Vol / N°Train", "en": "Train/Flight No."},
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
      "productType": {"fr": "Produit", "en": "Product"},
      "nbBreakfast": {"fr": "Nb de P. Déjeuner", "en": "No. of breakfast"},
      "hourBreakfast": {"fr": "Heure", "en": "Time"},
      "placeBreakfast": {"fr": "Lieu", "en": "Location"},
      "nbLunch": {"fr": "Nb de Déjeuner", "en": "No. of lunch"},
      "hourLunch": {"fr": "Heure", "en": "Time"},
      "placeLunch": {"fr": "Lieu", "en": "Location"},
      "nbDinner": {"fr": "Nb de Diner", "en": "No. of dinner"},
      "hourDinner": {"fr": "Heure", "en": "Time"},
      "placeDinner": {"fr": "Lieu", "en": "Location"},
      "catererName": {"fr": "Nom prestataire", "en": "Service provider"},

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
      "contractualExtras"    : {"fr": "Prestations annexes prévues au contrat payées par le client", "en": "Service included in contract paid by the client"},
      "nonContractualExtras" : {"fr": "Prestations annexes non prévues au contrat à facturer au client", "en": "Service not included in contract subject to additional fees"},
      "clubMedExtras"       : {"fr": "Prestations annexes offertes au client par M&E", "en": "Services offered to the client by M&E"},
      "planningReport"       : {"fr": "Rapprochement Village", "en": "Planning Report"},
      "securityInformation"                 : {"fr": "Informations sécurité", "en": "Security information"},
      "shop"                 : {"fr": "Boutique", "en": "Shop"},
      "conferenceInformation"                 : {"fr": "Conférence d'information dédiée", "en": "Conference of dedicaded information"},
      "dailyMeals"                 : {"fr": "Repas journalier", "en": "Daily meals"},
      "cooking"                 : {"fr": "Cuisine", "en": "Cooking"},
      "caterer"                 : {"fr": "Traiteur", "en": "Caterer"},
      "spa"                 : {"fr": "SPA", "en": "SPA"},
      "photographer"                 : {"fr": "Photographe", "en": "Photographer"},
      "spectacle"                 : {"fr": "Animation", "en": "Spectacle"},
      "sports"                 : {"fr": "Sports", "en": "Sports"},
      "skiInsurance"                 : {"fr": "Assurance ski Zéro Souci", "en": "Ski insurance"},

      // Contractual Extras
      "tableToBeCompleted": {"fr": "TABLEAU A COMPLETER ET A RENVOYER. NE PAS UTILISER D'AUTRES DOCUMENTS", "en":  "TABLE TO BE COMPLETED AND RETURNED. DO NOT USE OTHER DOCUMENTS"},
      "completedByResort": {"fr": "PARTIE A REMPLIR PAR LE VILLAGE", "en": "PART TO BE COMPLETED BY THE VILLAGE"},
      "changedByResort": {"fr": "Modification des  prestations réelles réalisées en village", "en": "Changes on services done by the Village"},
      "completedByClubmed": {"fr": "Renseigné par M&E", "en": "Completed by M&E"},
      "monthlyRate": {"fr": "TAUX MENSUEL UTILISE PAR LE VILLAGE :", "en": "MONTHLY RATE USED BY THE VILLAGE :"},
      "number": {"fr": "Nombre", "en": "Number"},
      "retailPriceTTC": {"fr": "Prix de vente TTC unitaire", "en": "Retail price per unit incl. taxes"},
      "totalTTC": {"fr": "Total TTC", "en": "Total incl. taxes"},
      "nbPax": {"fr": "Nombre de pax réalisé", "en": "No. of Pax"},
      "totalTTCLocal": {"fr": "Total TTC en monnaie locale", "en": "Total incl. taxes in local currency"},
      "undersigned": {"fr": "Je, soussigné(e),", "en": "I, the undersigned,"},
      "certifyExact": {"fr": ",certifie exactes les prestations mentionnées sur ce relevé de compte pris en charge par ma société.", "en": ",certify that this Planning Report is exact and will be paid for by my company."},
      "goSignature": {"fr": "Signature du GO en charge du groupe", "en": "Group G.O's signature"},
      "leaderSignature": {"fr": "Signature du Responsable du Groupe", "en": "Group Leader signature"},

      // clubMedExtras
      "retailPriceHT": {"fr": "Prix de revient HT unitaire en", "en": "Retail price per unit excl. taxes in"},
      "totalHT": {"fr": "Total HT en", "en": "Total excl. taxes in"},
      "totalHTLocal": {"fr": "Total HT en monnaie locale", "en": "Total excl. taxes in local currency"},
      "resortExtras": {"fr": "PRESTATIONS ANNEXES OFFERTES PAR LE VILLAGE", "en": "RELATED SERVICES OFFERED TO THE CLIENT BY THE VILLAGE"},
      "commercialGesture": {"fr": "GESTES COMMERCIAUX FINANCES PAR LES MARGES DU BUREAU COMMERCIAL ET COMPTABILISES EN PRIX DE REVIENT HT AU VILLAGE DANS LES ACTIVITES OPERATIONS CREEES POUR M&E", "en": "COMMERCIAL GESTURES FINANCED BY M&E COMMERCIAL OFFICE TO BE ENTERED IN THE RESORT'S ACCOUNTS AT COST PRICE AS M&E EXTRAS"},
      "commercialGestureCode": {"fr": "(231 CMA / 341 CMA / 350 CMA / 351 CMA / 353 CMA)", "en": "(231 CMA / 341 CMA / 350 CMA / 351 CMA / 353 CMA)"},
      "managerSignature": {"fr": "Signature du Gestionnaire (obligatoire) :", "en": "Manager Signature (required):"},
      "internalDocument": {"fr": "(DOCUMENT INTERNE CLUB)", "en": "(CLUB MED INTERNAL DOCUMENT)"},

      // planningReport
      "planningManager": {"fr": "Nom du Responsable Planning", "en": "Name of planning manager"},
      "planningReportForCubmed": {"fr": "RAPPROCHEMENT PLANNING POUR MEETINGS & EVENTS", "en": "PLANNING REPORT FOR MEETINGS & EVENTS"},
      "groupName": {"fr": "Nom du groupe", "en": "Name of the group"},
      "expectedDate": {"fr": "Dates de séjour prévues", "en": "Expected dates"},
      "expectedPeople": {"fr": "Nombre de participants prévu", "en": "Expected numbre of people"},
      "actualPeople": {"fr": "Nombre de participants réalisé", "en": "Actual number of people"},
      "roomRecap": {"fr": "RECAPITULATIF DES SEJOURS PARTICIPANTS PAR TYPE LOGEMENT POUR FACTURATION CLIENT.", "en": "ROOM RECAP PER ACCOMODATION TYPE FOR FINAL INVOICE"},
      "roomType": {"fr": "Type Logement", "en": "Room types"},
      "arrivalDepartureDate": {"fr": "Dates Arrivée et Départ", "en": "Dates of arrival and departure"},
      "singleBed": {"fr": "Single", "en": "Single"},
      "doubleBed": {"fr": "Double", "en": "Double"},
      "threeBed": {"fr": "Triple", "en": "Three-bed"},
      "fourBed": {"fr": "Quadr.", "en": "Four-bed"},
      "children4": {"fr": "dont Enfant 0 à 4 ans", "en": "Children 0-4 years"},
      "children12": {"fr": "dont Enfant 4 à 12 ans", "en": "Children 4-12 years"},
      "children18": {"fr": "dont Enfant 12 à 18 ans", "en": "Children 12-18 years"},
      "noShowName": {"fr": "Noms des No Show (IMPERATIF)", "en": "Name of No Show (REQUIRED)"},
      "goShowName": {"fr": "Noms des Go Show (IMPERATIF)", "en": "Name of Go Show (REQUIRED)"},
      "mealsPerDay": {"fr": "Nombre de repas par jour et Journées hôtelières.", "en": "No. of meals per day and Hotel days."},
      "totalMeal": {"fr": "Total Repas ........................................", "en": "Total Meals ........................................"},
      "lunch": {"fr": "Midi ..............", "en": "Lunch .............."},
      "dinner": {"fr": "Soir ..............", "en": "Dinner .............."},
      "additionalMeals": {"fr": "Nombre repas en supplément", "en": "Additional meals"},
      "toCharge": {"fr": "à facturer", "en": "to charge"},
      "totalHotelDays": {"fr": "Total Journées Hôtelières .................", "en": "Total Hotel days ................."},
      "toBeSentToClubmed": {"fr": "A RENVOYER IMPERATIVEMENT A MEETINGS & EVENTS DES LE DEPART DU GROUPE AVEC LE LISTING PLANNING", "en": "TO BE SENT TO M&E SALES RIGHT AFTER GROUP DEPARTURE"},
      "": {"fr": "", "en": ""},
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