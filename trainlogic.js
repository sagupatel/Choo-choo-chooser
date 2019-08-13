
  var firebaseConfig = {
    apiKey: "AIzaSyC2JDzv5Qh3tIdzO9q4oT2K8-2_H0OMtzQ",
    authDomain: "train-scheduler-a3e52.firebaseapp.com",
    databaseURL: "https://train-scheduler-a3e52.firebaseio.com",
    projectId: "train-scheduler-a3e52",
    storageBucket: "",
    messagingSenderId: "89897054064",
    appId: "1:89897054064:web:028c403e80a859bf"
  };
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();
$("#train-btn").on("click", function(event) {
  event.preventDefault();
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destinationPlace = $("#destination-input")
    .val()
    .trim();
  var startTime = moment(
    $("#start-input")
      .val()
      .trim(),
    "HHmm"
  ).format("X");
  var frequencySet = $("#frequency-input")
    .val()
    .trim();
  var newTrain = {
    name: trainName,
    destination: destinationPlace,
    start: startTime,
    frequency: frequencySet
  };
  database.ref().push(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.startTime);
  console.log(newTrain.frequency);

  alert("New Train Added!");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destinationPlace = childSnapshot.val().destination;
  var startTime = childSnapshot.val().start;
  var frequencySet = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destinationPlace);
  console.log(startTime);
  console.log(frequencySet);

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destinationPlace),
    $("<td>").text(startTime),
    $("<td>").text(frequencySet),
    $("<td>").text(minsAway)
  );
  $("#schedule-table > tbody").append(newRow);
});
var firstTrain = moment(childSnapshot.val().firstTrain, "hhmm").subtract(
  1,
  "minutes"
);
console.log(firstTrain);
var diffTime = moment().diff(moment(firstTrain), "minutes");

var remainder = diffTime % frequency;
console.log(diffTime);
console.log(remainder);

var minsAway = frequency - remainder;
console.log(minsAway);

var nextTrain = moment().add(minsAway, "minutes");
nextTrain = moment(nextTrain).format("hh:mm");
console.log(nextTrain);

var currentTime = moment().format("HHmm");
console.log(currentTime);
