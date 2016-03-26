'use strict';

/* Services */

angular.module('app.services', [], function($provide) {

   /**
   * Transaction
   */
  $provide.factory('Transaction', ['$rootScope', '$http', '$location', function($rootScope, $http, $location) {
      var transaction = {};

      var TransactionFactory = {
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
              transaction = data;
              $location.path('/');
            });
         },
         getTransaction : function () {
           return transaction;
         },
       }
       return TransactionFactory;
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
      "formatDate" : {"fr": "aaaa-mm-jj", "en": "yyyy-mm-dd"},
      "today"                 : {"fr": "Aujourd'hui", "en": "Today"},
      "home"                 : {"fr": "Accueil", "en": "Home"},
      "from"                  : {"fr": "Du", "en": "From"},
      "to"                      : {"fr": "au", "en": "to"},
      "edit"                    : {"fr": "Editer", "en": "Edit"},
      "services"             : {"fr": "Prestations", "en": "Services"},
      "print"                   : {"fr": "Imprimer", "en": "Print"},
      "documents"         : {"fr": "Documents", "en": "Documents"},
      "language"            : {"fr": "Langue", "en": "Language"},
      "french"                : {"fr": "Français", "en": "French"},
      "english"               : {"fr": "Anglais", "en": "English"},

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
      "additionalMeals"      : {"fr": "Repas supplémentaires", "en": "Additional meals"},
      "conferenceRooms"      : {"fr": "Salles", "en": "Conference rooms"},
      "basicEquipment"       : {"fr": "Matériel base", "en": "Basic equipment"},
      "rentalEquipment"      : {"fr": "Matériel location", "en": "Rental equipment"},
      "eventManager"         : {"fr": "Chef de projet Evénementiel", "en": "Event Manager Project"},
      "discovery"            : {"fr": "Espace Découverte", "en": "Discovery"},
      "otherServices"        : {"fr": "Prestations diverses", "en": "Other services"},
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