/*SUBLICENSE

Sublicensed under the MIT License with additional terms by Janne Rotter

Original MIT License
Copyright (c) [2020] [Josmario Albuquerque]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Additional Terms by Janne Rotter (2024)

1. Prohibition of Commercial Use: This software may not be used for any commercial purposes. 
Commercial use includes, but is not limited to, selling the software, using the software as part 
of a product or service that is sold, or using the software to generate revenue.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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
        if ($scope.answers.includes(undefined)) {
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
                    //options Germany, India, Mexico, Russia
                    var iDistance = Math.floor((Math.random() * 10000)) % 4;
                    if(iDistance == 0){
                        random = 3
                    }else if(iDistance == 1){
                        random = 4
                    }else if(iDistance == 1){
                        random = 5
                    }else{
                        random = 6
                    }
                }else{
                    User.setDistance("high")
                    //options China, UK
                    var iDistance = Math.floor((Math.random() * 10000)) % 2;
                    if(iDistance == 0){
                        random = 1
                    }else{
                        random = 2
                    }
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
                    //options India, Russia  
                    var iDistance = Math.floor((Math.random() * 10000)) % 2;
                    if(iDistance == 0){
                        random = 4
                    }else{
                        random = 6
                    }
                }else{
                    User.setDistance("high")
                    //options Germany, Mexico, Brazil, UK
                    var iDistance = Math.floor((Math.random() * 10000)) % 4;
                    if(iDistance == 0){
                        random = 3
                    }else if(iDistance == 1){
                        random = 5
                    }else if(iDistance == 2){
                        random = 0
                    }else{
                        random = 2
                    }
                }
            //options: Brazil : 0, China : 1, England : 2, Germany : 3, India : 4, Mexico : 5, Russia : 6
            }else if(userCulture == 'United Kingdom'){
                var rDistance = Math.floor((Math.random() * 10000)) % 3;
                if(rDistance == 0){
                    User.setDistance("low")
                    //options UK
                    random = 2
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options Germany, India
                    var iDistance = Math.floor((Math.random() * 10000)) % 2;
                    if(iDistance == 0){
                        random = 3
                    }else{
                        random = 4
                    }
                }else{
                    User.setDistance("high")
                    //options Brazil, China, Mexico, Russia
                    var iDistance = Math.floor((Math.random() * 10000)) % 4;
                    if(iDistance == 0){
                        random = 0
                    }else if(iDistance == 1){
                        random = 1
                    }else if(iDistance == 2){
                        random = 5
                    }else{
                        random = 6
                    }
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
                    //options Mexico
                    random = 5
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options Brazil
                    random = 0
                }else{
                    User.setDistance("high")
                    //options Germany, China, England, India, Russia
                    var iDistance = Math.floor((Math.random() * 10000)) % 5;
                    if(iDistance == 0){
                        random = 3
                    }else if(iDistance == 1){
                        random = 1
                    }else if(iDistance == 2){
                        random = 2
                    }else if(iDistance == 3){
                        random = 4
                    }else{
                        random = 6
                    }
                }
            //options: Brazil : 0, China : 1, England : 2, Germany : 3, India : 4, Mexico : 5, Russia : 6
            }else if(userCulture == 'Russia'){
                var rDistance = Math.floor((Math.random() * 10000)) % 3;
                if(rDistance == 0){
                    User.setDistance("low")
                    //options Russia
                    random = 6
                }else if(rDistance == 1){
                    User.setDistance("medium")
                    //options India, China, Brazil
                    var iDistance = Math.floor((Math.random() * 10000)) % 3;
                    if(iDistance == 0){
                        random = 4
                    }else if(iDistance == 1){
                        random = 1
                    }else{
                        random = 0
                    }
                }else{
                    User.setDistance("high")
                    //options UK, Mexico, Germany
                    var iDistance = Math.floor((Math.random() * 10000)) % 3;
                    if(iDistance == 0){
                        random = 2
                    }else if(iDistance == 1){
                        random = 5
                    }else{
                        random = 3
                    }
                }
            }else if(userCulture=='Albania'){
                random = 0;
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
