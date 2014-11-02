(function () {

  var english = angular.module('english', ['ngResource']);

  english.service('Verbs', function ($http) {

    var content = {
      IRREGULAR:[
        {
          present_tense:   'be',
          past_tense:      'was/were',
          past_participle: 'been',
          gerund:          'being',
          spanish:         'ser, estar'
        },
        {
          present_tense:   'become',
          past_tense:      'became',
          past_participle: 'become',
          gerund:          'becoming',
          spanish:         'llegar a ser'
        },
        {
          present_tense:   'begin',
          past_tense:      'began',
          past_participle: 'begun',
          gerund:          'begining',
          spanish:         'empezar'
        },
        {
          present_tense:   'break',
          past_tense:      'broke',
          past_participle: 'broken',
          gerund:          'breakning',
          spanish:         'romper'
        },
        {
          present_tense:   'bring',
          past_tense:      'brought',
          past_participle: 'brought',
          gerund:          'bringing',
          spanish:         'traer'
        },
        {
          present_tense:   'build',
          past_tense:      'built',
          past_participle: 'built',
          gerund:          'building',
          spanish:         'construir'
        },
        {
          present_tense:   'buy',
          past_tense:      'bought',
          past_participle: 'bought',
          gerund:          'buying',
          spanish:         'comprar'
        },
        {
          present_tense:   'catch',
          past_tense:      'caught',
          past_participle: 'caught',
          gerund:          'catching',
          spanish:         'atrapar/sorprender'
        },
        {
          present_tense:   'come',
          past_tense:      'came',
          past_participle: 'come',
          gerund:          'coming',
          spanish:         'venir'
        },
        {
          present_tense:   'cut',
          past_tense:      'cut',
          past_participle: 'cut',
          gerund:          'cuting',
          spanish:         'cortar'
        },
        {
          present_tense:   'do',
          past_tense:      'did',
          past_participle: 'done',
          gerund:          'doing',
          spanish:         'hacer'
        },
        {
          present_tense:   'dream',
          past_tense:      'dreamt',
          past_participle: 'dreamt',
          gerund:          'dreaming',
          spanish:         'dormir'
        },
        {
          present_tense:   'drink',
          past_tense:      'drank',
          past_participle: 'drunk',
          gerund:          'dringing',
          spanish:         'tomar, beber'
        },
        {
          present_tense:   'drive',
          past_tense:      'drove',
          past_participle: 'driven',
          gerund:          'driving',
          spanish:         'manejar, conducir'
        },
        {
          present_tense:   'eat',
          past_tense:      'ate',
          past_participle: 'eaten',
          gerund:          'eating',
          spanish:         'comer'
        },
        {
          present_tense:   'fall',
          past_tense:      'fell',
          past_participle: 'fallen',
          gerund:          'falling',
          spanish:         'caer'
        },
        {
          present_tense:   'feel',
          past_tense:      'feit',
          past_participle: 'feit',
          gerund:          'feeling',
          spanish:         'sentir'
        },
        {
          present_tense:   'fight',
          past_tense:      'fought',
          past_participle: 'fought',
          gerund:          'fighting',
          spanish:         'pelear / luchar'
        },
        {
          present_tense:   'find',
          past_tense:      'found',
          past_participle: 'found',
          gerund:          'finding',
          spanish:         'encontrar'
        },
        {
          present_tense:   'fly',
          past_tense:      'flew',
          past_participle: 'flown',
          gerund:          'flying',
          spanish:         'volar'
        }
      ],
      REGULAR: {
      }
    };

    // btn default
    for (var i = 0; i < content.IRREGULAR.length; i++) {
      content.IRREGULAR[i].btn = 'default';
    }


    this.all = function () {
      //return $http.get('js/verbs.json');
      return content;
    };

  });

  english.controller('VerbsCtrl', function ($scope, Verbs) {

    $scope.Model = {};
    $scope.Evt = {};

    var content = Verbs.all();

    $scope.Model.Content = content;
    $scope.Model.is_talk = false;
    $scope.Model.msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    $scope.Model.msg.voice = voices[10];
    $scope.Model.msg.voiceURI = 'native';
    $scope.Model.msg.volume = 1;
    $scope.Model.msg.rate = 1;
    $scope.Model.msg.pitch = 2;
    $scope.Model.msg.lang = 'en-US';

    $scope.Evt.talkVerb = function (verb, index) {
      var is_talk = $scope.Model.is_talk;
      if(!is_talk){
        $scope.Model.msg.lang = 'en-US';
        $scope.Model.is_talk = true;
        verb.btn = 'primary';

        var tenses = [
        verb.present_tense,
        verb.past_tense,
        verb.past_participle,
        verb.spanish
        ];

        series([
          function(next) { talk(tenses[0], false, next); },
          function(next) { talk(tenses[1], false, next); },
          function(next) { talk(tenses[2], false, next); },
          function(next) { talk(tenses[3], true, next); }
        ], function (result) {
          $scope.Model.is_talk = false;
        });

        function talk (text, es, cb) {
          $scope.Model.msg.text = text;
          if(es){
            $scope.Model.msg.lang = 'es-MEX';
          }
          $scope.Model.msg.onend = function(e) {
            cb(text);
          };
          speechSynthesis.speak($scope.Model.msg);
        }

      }
    };

    function series (cbs, last) {
      var results = [];
      function next () {
      var cb = cbs.shift();
      if(cb){
        cb(function () {
          results.push(Array.prototype.slice.call(arguments));
          next();
        });
      }else{
        last(results);
      }
      }
      next();
    }

  });


})();
