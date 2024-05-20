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

var tutorServices = angular.module("tutor.services", []);

tutorServices.service("configService", function() {

    var opts = ["st_brazil", "st_china", "st_england","st_germany","st_india","st_mexico","st_russia"];

    var random = Math.floor((Math.random() * 123457)) % 7;
    var currentTheme = opts[random];
    // var currentTheme = "default";


    var next = false;

    var badgeFlags = [false, false, false];

    this.setTheme = function(value) {
        console.log("setting theme: " + value);
        currentTheme = value;
    };

    this.getTheme = function() {
        return currentTheme;
    };



    this.setNext = function(value) {
        next = value;
    };

    this.getNext = function() {
        return next;
    };

    this.addBadge = function(id) {
        badgeFlags[id] = true;
    };

    this.getBadges = function() {
        return badgeFlags;
    };

});

tutorServices.service("User", function($http) {
    var resp = {
        startTime: 0,
        endTime: 0,
        education: "",
        culture: "",
        gender: "",
        identification: "",
        age: "",
        distance: "",
        testType: "",
        pretestPoints: 0,
        activityPoints: 0,
        posttestPoints: 0,
        pre: [],
        post: []
    };

    this.setGender = function(value) {
        resp.gender = value;
    };

    this.setAge = function(value) {
        resp.age = value;
    };

    this.setCulture = function(value) {
        resp.culture = value;
    };

    this.setEducation = function(value) {
        resp.education = value;
    };

    this.setIdentification = function(value) {
        resp.identification = value;
    };

    this.setDistance = function(value) {
        resp.distance = value;
    };

    this.setTestType = function(value) {
        resp.testType = value;
    };

    this.setPretestPoints = function(value) {
        resp.pretestPoints = value;
    };

    this.setPosttestPoints = function(value) {
        resp.posttestPoints = value;
    };

    this.setActivityPoints = function(value) {
        resp.activityPoints = value;
    };

    this.getResponse = function() {
        return resp;
    };

    this.getAnxiety = function() {
        return resp.pretestPoints;
    };

    this.getCulture = function(){
        return resp.culture;
    }

    this.setPre = function(value) {
        resp.pre = value;
    };

    this.setPost = function(value) {
        resp.post = value;
    };

    this.setStartTime = function(value) {
        resp.startTime = value;
    };

    this.setEndTime = function(value) {
        resp.endTime = value;
    };

    this.save = function() {
        $http({
            url: "/save-response",
            dataType: "csv",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Custom-Header": JSON.stringify(resp)
            },
            data: resp
        }).then(function(response) {
            // success
            console.log("response sent!");

        }, function(response) {
            // failed
            console.error("Failed to submit participant response. " + response);
        });
    };

});
