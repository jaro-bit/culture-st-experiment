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
            url: "http://localhost:8080/save-response",
            dataType: "json",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
