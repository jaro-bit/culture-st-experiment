angular.module('tutor').controller("PretestCtrl", function($scope, $window, $location, configService, User) {

    var themes = ["st_brazil", "st_china", "st_england","st_germany","st_india","st_mexico","st_russia"];

    var random = Math.floor((Math.random() * 10000)) % 7;


    $scope.questions = ["I feel calm", "I feel secure", "I am tense", "I feel strained", "I feel at ease", "I feel upset", "I am pressently worrying over possible misfortunes", "I feel satisfied", "I feel frightened", "I feel comfortable", "I feel self-confident", "I feel nervous", "I am jittery", "I feel indecisive", "I am relaxed", "I am content", "I am worried", "I feel confused", "I feel steady", "I feel good"];
    $scope.answers = [];

    $scope.setTime = function() {
        var time = new Date().getTime();
        User.setStartTime(time);
    };

    $scope.processAnswers = function() {

        //console.log($scope.answers);
        //  validation
        if ($scope.answers.length < 20) {
            $scope.msg = "Please answer all questions!"
        } else {
            function add(a, b) {
                return parseInt(a) + parseInt(b);
            };

            var ans = $scope.answers;
            console.log(ans);

            //invert positive answers
            ans[0] = 5 - ans[0];
            ans[1] = 5 - ans[1];
            ans[4] = 5 - ans[4];
            ans[7] = 5 - ans[7];
            ans[9] = 5 - ans[9];
            ans[10] = 5 - ans[10];
            ans[14] = 5 - ans[14];
            ans[15] = 5 - ans[15];
            ans[18] = 5 - ans[18];
            ans[19] = 5 - ans[19];

            var sum = ans.reduce(add, 0);

            console.log(ans);
            console.log("PRETEST: " + sum);

            
            
            User.setGender($scope.gender);
            User.setAge($scope.age);
            User.setCulture($scope.culture);
            User.setEducation($scope.education);
            User.setIdentification($scope.identification);

            //dependend on user culture choose study enviroment
            var userCulture = User.getCulture()
            console.log(userCulture)

            //options: Brazil : 0, China : 1, England : 2, Germany : 3, India : 4, Mexico : 5, Russia : 6
            if(userCulture == 'Brazil'){
                var rDistance = Math.floor((Math.random() * 10000)) % 3;
                if(rDistance == 0){
                    User.setDistance("low")
                    //options Brazil
                    random = 0
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options China
                    random = 1
                }else{
                    User.setDistance("high")
                    //options China
                    random = 1
            }
            //options: Brazil : 0, China : 1, England : 2, Germany : 3, India : 4, Mexico : 5, Russia : 6
            }else if(userCulture == 'China'){
                var rDistance = Math.floor((Math.random() * 10000)) % 3;
                if(rDistance == 0){
                    User.setDistance("low")
                    //options China
                    random = 1
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options China
                    random = 1
                }else{
                    User.setDistance("high")
                    //options China
                    random = 1
                }
            //options: Brazil : 0, China : 1, England : 2, Germany : 3, India : 4, Mexico : 5, Russia : 6
            }else if(userCulture == 'United Kingdom'){
                var rDistance = Math.floor((Math.random() * 10000)) % 3;
                if(rDistance == 0){
                    User.setDistance("low")
                    //options China
                    random = 1
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options China
                    random = 1
                }else{
                    User.setDistance("high")
                    //options China
                    random = 1
                }
            //options: Brazil : 0, China : 1, England : 2, Germany : 3, India : 4, Mexico : 5, Russia : 6
            }else if(userCulture == 'Germany'){
                var rDistance = Math.floor((Math.random() * 10000)) % 3;
                if(rDistance == 0){
                    User.setDistance("low")
                    //options Germany
                    random = 3
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options India, Brazil, UK 
                    var iDistance = Math.floor((Math.random() * 10000)) % 3;
                    if(iDistance == 0){
                        random = 4
                    }else if(iDistance == 1){
                        random = 0
                    }else{
                        random = 2
                    }
                }else{
                    User.setDistance("high")
                    //options China, Mexico, Russia
                    var iDistance = Math.floor((Math.random() * 10000)) % 3;
                    if(iDistance == 0){
                        random = 1
                    }else if(iDistance == 1){
                        random = 5
                    }else{
                        random = 6
                    }
                }
            //options: Brazil : 0, China : 1, England : 2, Germany : 3, India : 4, Mexico : 5, Russia : 6
            }else if(userCulture == 'India'){
                var rDistance = Math.floor((Math.random() * 10000)) % 3;
                if(rDistance == 0){
                    User.setDistance("low")
                    //options India
                    random = 4
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options Germany, China, Brazil, UK, Russia
                    var iDistance = Math.floor((Math.random() * 10000)) % 5;
                    if(iDistance == 0){
                        random = 3
                    }else if(iDistance == 1){
                        random = 1
                    }else if(iDistance == 2){
                        random = 0
                    }else if(iDistance == 3){
                        random = 2
                    }else{
                        random = 6
                    }
                }else{
                    User.setDistance("high")
                    //options Mexico
                    random = 5
                }
            //options: Brazil : 0, China : 1, England : 2, Germany : 3, India : 4, Mexico : 5, Russia : 6
            }else if(userCulture == 'Mexico'){
                var rDistance = Math.floor((Math.random() * 10000)) % 3;
                if(rDistance == 0){
                    User.setDistance("low")
                    //options China
                    random = 1
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options China
                    random = 1
                }else{
                    User.setDistance("high")
                    //options China
                    random = 1
                }
            //options: Brazil : 0, China : 1, England : 2, Germany : 3, India : 4, Mexico : 5, Russia : 6
            }else if(userCulture == 'Russia'){
                var rDistance = Math.floor((Math.random() * 10000)) % 3;
                if(rDistance == 0){
                    User.setDistance("low")
                    //options China
                    random = 1
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options China
                    random = 1
                }else{
                    User.setDistance("high")
                    //options China
                    random = 1
                }
            }else{ //none of the predefined cultrues was chosen --> choose random culture
                random = Math.floor((Math.random() * 10000)) % 7
            }

            configService.setTheme(themes[random]);
            User.setTestType(themes[random]);
            User.setPretestPoints(sum);
            User.setPre(ans);
            console.log(themes[random])

            console.log(User.getResponse());
            // User.save();
            $location.path("/home");

        };

    };
});
