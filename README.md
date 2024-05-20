## Cultural stereotypes, student anxiety, and gamification


This repository contains the code for the experiment described in the article, "Investigating Culture-Induced Stereotype Threat in an Intelligent and Gamified Tutoring System" and is based on the framework provided by [Albuquerque et al., 2020](https://github.com/rgalhos/gender-st-experiment).


## Overview
This project comprises an experimental environment to study the impact of cultural stereotype threat on student anxiety and performance. In summary, the application has the following workflow:
1. Consent form
2. Pre-test (anxiety assessment) including demographic assesment
3. Gamified activity. There are seven different design flavours for this activity: Brazilian, chinese, great british, german, indian, mexican and russian. Upon finishing the pre-test, one of the seven flavours is selected for the current participant. Please note the activity content does not change across versions (only UI elements like colours and images).
4. Post-test (anxiety assessment, same as the pre-test).


## Getting started

**_NOTE:_**  The text in this subheading is taken from [Albuquerque et al., 2020](https://github.com/rgalhos/gender-st-experiment).

In order to setup this project for a real use in your research, you will need to follow two basic steps: (1) adapt the project for your research needs; and (2) actual run the project. If you just want to see how it looks like, you can go straight to step 2 and run the project locally.  

### Step 1: Adapting the project for your needs

* In general, most textual content can be changed by editing the '*.html' files located in:
	* `webapp/views/`
* To change the anxiety questions, refer to:
	* `webapp/scripts/controllers/PretestCtrl.js`
	* `webapp/scripts/controllers/PosttestCtrl.js`
* For server configurations, refer to:
	* `Server.js`
	* The server listens to `localhost` at port `8080` by default
* To change the endpoint URL to where the responses are submitted, refer to:
	* `webapp/scripts/services.js`


### Step 3: Running the project
A simple way to run this project is:

1. Make sure [Node.js](https://nodejs.org/) is installed
2. Go to the project directory
2. Install the dependencies:
```
npm install
```
3. Run the project:
```
npm start
```

[Click here](https://drive.google.com/file/d/1YnbAe3Cyg9QkmeYZGYLtSXDwopX4VXaH/view?usp=sharing) to see a tutorial.

## Guide

### Changing the questions
In the folder `/webapp/scripts/controllers/` there are two files called `PretestCtrl.js` and `PosttestCtrl.js`. The process is identical in both.

1. Open the file with a text editor.
2. Search for `$scope.questions`
3. This line contains an array with all questions.
 + The questions must be between quotation marks, separated by commas and within the same block delimited by square brackets. E.g:
```javascript
$scope.questions = ["Do you like apples?", "And pineapples?", "...even on pizza?"]
```
5. Change the number of questions in ``$scope.processAnswers``

### Adding questionaries
1. Open ``/webapp/views/``, copy the file `posttest.html` and paste it in the same folder, and rename it. (e.g, 'questionary2.html')
 + You can also open it with a text editor to modify the textual content of the page.
2. Open ``/webapp/scripts/controllers`` and create a file called ``ThenameyouchoseCtrl.js`` (e.g 'Questionary2Ctrl.js').
 + The file must follow this template:

```javascript
// In the following line, 'Questionary2Ctrl' is the name I chose for the controller. It will be important later.
angular.module('tutor').controller("Questionary2Ctrl", function($scope, $location, User) {
	$scope.questions = ["How much do you like apples?", "And pineapples?", "...even on pizza?"] // Array of questions. See the guide above
	$scope.answers = [];

	$scope.processAnswers = function() {
		if ($scope.answers.length < $scope.questions.length) {
			$scope.msg = "Please answer all questions!";
		} else {
			var ans = $scope.answers;

			// Invert positive answers
			// ans[0] = 5 - ans[0]; 	// uncomment to invert the first answer
			// ans[1] = 5 - ans[1]; 	// uncomment to invert the second answer
			// ans[5] = 5 - ans[5]; 	// uncomment to invert the sixth answer

			var sum = ans.reduce(add, 0);

			function add(a, b) {
				return parseInt(a) + parseInt(b);
			}

			var resp = User.getResponse();

			// Keep these if the questionary is part of the pre-test
			User.setPre(resp.pre.concat(ans)); // Save the answers
			User.setPretestPoints(resp.pretestPoints + sum); // Save the points

			// Keep these if the questionary is part of the post-test
			User.setPost(resp.post.concat(ans)); // Save the answers
			User.setPosttestPoints(resp.posttestPoints + sum); // Save the points
			// User.save(); // Submit participant's response to server; Used at the very end of the survey

			$location.path("/home"); // Change it to the page you want the user to be redirected to
		}
	};
});
```

3. Open ``webapp/index.html`` with a text editor and add this inside the ``<body>`` tag:
```html
<script src="scripts/controllers/Questionary2Ctrl.js"></script>
```
+ Remember to change 'Questionary2Ctrl' to the name of the file you created in the previous step.

4. Open ``webapp/scripts/app.js`` with a text editor, search for ``routeProvider.when`` and add this in the line immediately above it:
```javascript
$routeProvider.
    when("/questionary2", { // Path
        templateUrl: "views/questionary2.html", // Path to the file you created in step 1
        controller: "Questionary2Ctrl" // Name of the controller you created in step 2
	});
```

5. Find the controller of the page you want to precede the page you just created at ``/webapp/scripts/controllers`` and change its ``$location.path`` to the path you chose in the previous step.

### Frameworks
This project was made using the following frameworks:

* AngularJS
	* [Documentation](https://material.angularjs.org/latest/)
* Express.js
	* [Documentation](https://expressjs.com/en/4x/api.html)

## License

This project is licensed under the terms of the MIT License and an additional Sublicense.

- **[LICENSE](./license.txt)**: Original MIT License.
- **[SUBLICENSE](./sublicense.md)**: Additional terms by Janne Rotter, including a restriction on commercial use.
