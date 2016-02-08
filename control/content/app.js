'use strict';

(function (angular, buildfire) {
  angular.module('googleAppsFormPluginContent', ['ui.bootstrap'])
    .controller('ContentHomeCtrl', ['$scope', 'Buildfire', 'STATUS_CODE', 'TAG_NAMES', 'DataStore', 'Utils', '$timeout',
      function ($scope, Buildfire, STATUS_CODE, TAG_NAMES, DataStore, Utils, $timeout) {
        var ContentHome = this;

      }
    ])
})(window.angular, window.buildfire);