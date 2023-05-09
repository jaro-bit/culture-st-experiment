angular.module('tutor').controller("FinishCtrl", function($scope, User) {

    $scope.populationAnxiety = 40.1 * 100 / 80;
    $scope.userAnxiety = User.getAnxiety() * 100 / 80;

    $scope.share = function() {
        FB.ui({
            method: 'share',
            display: 'popup',
            href: 'http://ansiedade.tk/',
            title: 'Do you feel anxious?',
            description: 'Take part in this study on anxiety and find out!',
            picture: 'https://pixabay.com/static/uploads/photo/2016/02/07/14/51/hatena-1184896_960_720.png',
            layout: 'button'
        }, function(response) {});
    };
});
