var tutorServices = angular.module("tutor.services", []);

tutorServices.service("configService", function() {

    var currentTheme = "stFemale";
    var next = false;

    this.setTheme = function(value) {
        console.log("setting theme: " + value);
        currentTheme = value;
    };

    this.getTheme = function() {
        return currentTheme;
    };

    this.setNext = function(value) {
        next = value;
    }

    this.getNext = function() {
        return next;
    }
});

tutorServices.service("User", function($http) {
    var response = {
        gender: "",
        age: "",
        testType: "",
        pretestPoints: 0,
        activityPoints: 0,
        posttestPoints: 0,
    };

    this.setGender = function(value) {
        response.gender = value;
        console.log("setting gender: " + value);
    };

    this.setAge = function(value) {
        response.age = value;
    };

    this.setTestType = function(value) {
        response.testType = value;
    };

    this.setPretestPoints = function(value) {
        response.pretestPoints = value;
    };

    this.setPosttestPoints = function(value) {
        response.posttestPoints = value;
    };

    this.setActivityPoints = function(value) {
        response.activityPoints = value;
    };

    this.getResponse = function() {
        return response;
    };

    this.save = function() {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        $http({
            url: "http://localhost:8080/CapstoneBackend/CapstoneServlet",
            method: "POST",
            data: JSON.stringify(response)
        }).then(function(response) {
            // success
            console.log("Response sent!");

        }, function(response) {
            // failed
            console.error("Failed on submitting answer.");
        });
    };

});