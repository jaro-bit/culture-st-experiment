angular.module('tutor').controller("HomeCtrl", function($scope, $location, $mdDialog, configService, User) {
    console.log("HomeCtrl ok");


    var answers = ['B', 'E', 'E', 'E', 'A', 'B', 'D', 'E', 'B', 'B', 'E', 'B', 'C', 'E', 'A', 'C', 'B', 'D', 'B', 'A'];
    var userAnswer = null;
    var totalPoints = 0;
    var currentQuestion = 0;
    var showSet1 = true;
    var totalPoints = 0;
    var userAvatar = "assets/" + configService.getTheme() + "/images/avatar1.jpg";
    var level = 0;
    var color = "white";

    var inc = false;
    var dec = false;

    var bgColor = "white";

    var currentMessage = "Correct!"
    var flagMessage = false;

    var levelFiveFlag = true;
    var levelTenFlag = true;

    //select names used for the enviroment
    var names = [];
    
    var theme = configService.getTheme();

    if(theme == 'st_brazil'){
        names = ['Maria','Jose','Joao','Ana','Antonio'];
    }else if(theme == 'st_china'){
        names = ['王伟祺','李徽因','张海云','刘念真','陈鸿涛'];
    }else if(theme == 'st_england'){
        names = ['Susan','David','Mary','John','James'];
        color = "#000000";
    }else if(theme == 'st_germany'){
        names = ['Ursula','Peter','Werner','Maria','Hans'];
    }else if(theme == 'st_india'){
        names = ['मुहम्मद','सुनीता','अनीता','संजय','संतोष'];
        color = "#000000";
    }else if(theme == 'st_mexico'){
        names = ['Jose','Juana','Rosa','Juan','Maria'];
    }else if(theme == 'st_russia'){
        names = ['Сергей','Елена','Ольга','Ирина','Иван']; 
    }

    console.log(names)


    var users = [{
        name: names[0],
        points: 79,
        avatar: "assets/" + configService.getTheme() + "/images/ranking1.jpg"
    }, {
        name: names[1],
        points: 75,
        avatar: "assets/" + configService.getTheme() + "/images/ranking2.jpg"
    }, {
        name: names[2],
        points: 63,
        avatar: "assets/" + configService.getTheme() + "/images/ranking3.jpg"
    }, {
        name: names[3],
        points: 27,
        avatar: "assets/" + configService.getTheme() + "/images/ranking4.jpg"
    }, {
        name: names[4],
        points: totalPoints,
        avatar: userAvatar
    }];

    $scope.badges = [];
    $scope.items = ['A', 'B', 'C', 'D', 'E'];
    $scope.progress = 0;

    $scope.number = 6;

    $scope.increment = false;
    $scope.decrement = false;

    $scope.showAvatar = true;

    $scope.showQuestions = false;

    $scope.getName = function() {
        return names[4];
    }

    $scope.getUserColor = function(name) {
        if (name == names[4])
            return "#e0e0e0";
        return "white";
    };
    $scope.getBgColor = function() {
        return bgColor;
    };

    $scope.hideAvatar = function() {
        $scope.showAvatar = false;
        $scope.showQuestions = true;
        //updatePoints(10);
    };

    $scope.getUsers = function() {
        return users;
    };

    $scope.getImage = function(value) {
        return "assets/" + configService.getTheme() + "/images/avatar" + value + ".jpg";
    };

    $scope.setAvatar = function(value) {
        userAvatar = value;
        users[4].avatar = value;
    };

    $scope.getNumber = function(num) {
        var array = new Array(num);
        for (var i = 0; i < num; i++) {
            array.push(i);
        };

        return array;
    };

    $scope.getBar = function() {
        return "assets/" + configService.getTheme() + "/images/bar.png";

    };

    $scope.getFlag = function() {
        console.log("assets/" + configService.getTheme() + "/images/flag.png");
        return "assets/" + configService.getTheme() + "/images/flag.png";
    };

    $scope.getTopbarTextcolor = function() {
        console.log(color)
        return color;
    }

    $scope.checkSet1 = function() {
        return showSet1;
    };


    $scope.checkAvatar = function() {
        return !$scope.showAvatar;
    };

    $scope.setSet1 = function(value) {
        showSet1 = value;
    };

    $scope.showNext = function() {
        return configService.getNext();
    };

    $scope.showPosttest = function() {
        $location.path("/posttest");
    };

    $scope.getStars = function() {

        if (configService.nextOn) {
            return "star";
        }

        return "star_border";
    };

    $scope.getRanking = function(value) {
        return users[value].avatar;

    };

    var checkBadge = function(index) {

        return configService.getBadges()[index];
    };


    $scope.getBadge = function(name) {

        var id = 0;

        switch (name) {
            case "badge5":
                id = 0;
                break;
            case "badge10":
                id = 1;
                break;
            case "badge":
                id = 2;
                break;
            default:
                console.log("invalid badge name");
        }


        var flag = checkBadge(id) ? name : "noBadge";

        //  console.log("flag: " + flag + " check: " + checkBadge(id));

        return "assets/" + configService.getTheme() + "/images/" + flag + ".png";
    };

    $scope.getAvatar = function() {
        return userAvatar;
    };

    $scope.getLevel = function() {
        return level;
    };

    $scope.chooseAvatar = function() {
        $scope.showAvatar = false;
    };

    $scope.getPoints = function() {

        return totalPoints;
    };

    $scope.question = function() {
        return "assets/" + configService.getTheme() + "/images/q-0.png";
    };

    $scope.dynamicTheme = function() {
        return configService.getTheme();
    };

    var setCurrent = function setCurrent(index) {
        userAnswer = $scope.items[index];
    };

    $scope.getCurrent = function() {
        return Math.trunc(totalPoints / 10);
    };

    $scope.getQuestion = function() {
        return currentQuestion + 1;
    };

    $scope.getUserName = function(index) {
        return users[index].name;
    };

    $scope.getUserPoints = function(index) {

        return users[index].points;
    };

    var setMsgType = function(type) {

        if (type == "red") {
            currentMessage = "Wrong answer!"
        } else {
            currentMessage = "Correct answer!"
        };
    };

    var playAnimation = function(type) {

        console.log("playing animation: " + type);


        bgColor = type;
        flagMessage = true;

        setMsgType(type);

        setTimeout(function() {
            $scope.$apply(function() {
                bgColor = "white";
                flagMessage = false;
            });
        }, 2000);
    };

    var updatePoints = function(value) {

        if (value < 0 && (totalPoints + value) >= 0) {
            totalPoints += value;
            // dec = true;
            decrement = true;
            new Audio('assets/default/audio/wrong.mp3').play();
        };

        if (value > 0) {
            console.log("right answer");
            totalPoints += value;
            level++;
            increment = true;
            new Audio('assets/default/audio/right.mp3').play();
        };

        //updates ranking
        users = [{
            name: names[0],
            points: 79,
            avatar: "assets/" + configService.getTheme() + "/images/ranking1.jpg"
        }, {
            name: names[1],
            points: 75,
            avatar: "assets/" + configService.getTheme() + "/images/ranking2.jpg"
        }, {
            name: names[2],
            points: 63,
            avatar: "assets/" + configService.getTheme() + "/images/ranking3.jpg"
        }, {
            name: names[3],
            points: 27,
            avatar: "assets/" + configService.getTheme() + "/images/ranking4.jpg"
        }, {
            name: names[4],
            points: totalPoints,
            avatar: userAvatar
        }];

        var sortedList = users.slice(0);
        sortedList.sort(function(a, b) {
            return a.points - b.points;
        });

        users = sortedList.reverse();

        setTimeout(function() {
            $scope.decrement = false;
            $scope.increment = false;
        }, 1000);


    };

    $scope.getMessage = function() {
        return currentMessage;
    };

    $scope.showMessage = function() {
        return flagMessage;
    }

    $scope.processAnswer = function(value) {
        setCurrent(value);
        var dialogType = null;

        //right answer
        if (userAnswer == answers[currentQuestion]) {

            updatePoints(5);
            playAnimation("green");

            //badge level 5
            if (totalPoints == 25 && levelFiveFlag) {
                levelFiveFlag = false;

                $mdDialog.show({
                    controller: 'Badge5Ctrl',
                    templateUrl: 'views/badge5.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                });

                configService.addBadge(0);

                setTimeout(function() {
                    $mdDialog.hide();
                }, 2000);


            } else if (totalPoints == 50 && levelTenFlag) {
                levelTenFlag = false;
                $mdDialog.show({
                    controller: 'Badge10Ctrl',
                    templateUrl: 'views/badge10.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                });

                configService.addBadge(1);

                setTimeout(function() {
                    $mdDialog.hide();
                }, 2500);


            } else if (currentQuestion == 19) {
                $mdDialog.show({
                    controller: 'BadgeCtrl',
                    templateUrl: 'views/badge.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                });

                configService.addBadge(2);

                setTimeout(function() {
                    $mdDialog.hide();
                }, 2500);
            };



        } else if (currentQuestion == 19) {

            playAnimation("red");
            $mdDialog.show({
                controller: 'BadgeCtrl',
                templateUrl: 'views/badge.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });

            configService.addBadge(2);

            showSet1 = false;
            setTimeout(function() {
                $mdDialog.hide();
            }, 2500);
        } else {
            playAnimation("red");
            updatePoints(-5)

        };

        currentQuestion++;
        $scope.progress = 100 * (currentQuestion + 1) / 20;
        $scope.question = function() {
            return "assets/" + configService.getTheme() + "/images/q-" + currentQuestion + ".png";
        };

        if (currentQuestion >= 20) {
            configService.addBadge(2);

            //  configService.setNext(true);
            User.setActivityPoints(totalPoints);
            console.log(User.getResponse());
            //  $location.path("/home");
            showSet1 = false;

            $scope.showQuestions = false;
        };

    };
});
