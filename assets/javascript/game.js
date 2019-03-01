//global variables
var countDown = 10;
var correctAnswer = 0;
var wrongAnswer = 0;
var unAnswered = 0;
var answers = 0;
var currentQuestion = 0;
var currentAnswer;
var timeHandler;

//click start button to start the game
function startGame() {
  clearTimeout(timeHandler);
  $("#start").on("click", function () {
    $("#start").hide();
    $(".lead").hide();
    $("#answers, .quiz, .time-left").show();
    startQuiz();
  });
}

//start countdown 
function timer() {
  countDown--;
  $(".time-left").html(countDown);
  if (countDown == 0) {
    $(".question").hide();
    $('.time-left').html("Time's up!");
    unAnswered++
    showResults();
    clearTimeout(timeHandler);
  }
}

function startQuiz() {
  timeHandler = setInterval(timer, 1000);
  $(".time-left").html(
    "<h2> TIME REMAINING: <span id='countDown'>30</span> Seconds</h2>"
  );
  pickQuestion();
}

function pickQuestion() {


  var question = questions[currentQuestion];
  currentAnswer = question.correctAnswer;
  unAnswered = questions.length - (correctAnswer + wrongAnswer);

  $(".question").html("<h2>" + question.question + "<h2>");
  $(".option-one")
    .html("<p>" + "A. " + question.answers[0] + "</p>")
    .attr("data-answer", question.answers[0]);
  $(".option-two")
    .html("<p>" + "B. " + question.answers[1] + "</p>")
    .attr("data-answer", question.answers[1]);
  $(".option-three")
    .html("<p>" + "C. " + question.answers[2] + "</p>")
    .attr("data-answer", question.answers[2]);
  $(".option-four")
    .html("<p>" + "D. " + question.answers[3] + "</p>")
    .attr("data-answer", question.answers[3]);

  currentQuestion++;
  if (currentQuestion === questions.length) {

    showResults();
  };
}

$("#answers > p").on("click", function () {
  var isCorrect = $(this).attr("data-answer") === currentAnswer;
  if (isCorrect) {
    correctAnswer++;
  } else {
    wrongAnswer++;
  }
  pickQuestion();
});

// final screen shows players results and a button to restart
function showResults() {
  clearTimeout(timeHandler);
  $("#restart").show()
  $("#answers").hide();
  $(".question").hide();
  $(".score").html("Game Over! Your scores: ");
  $(".correct").html("<h3>" + 'You got' + ' ' + correctAnswer + ' ' + 'correct.' + "</h3>");

  $(".incorrect").html("<h3>" + 'You got' + ' ' + wrongAnswer + ' ' + 'wrong.' + "</h3>");

  $(".unanswered").html("<h3>" + 'You didnt answer' + ' ' + unAnswered + ' ' + 'questions.' + "</h3>");
  reset();
}

function reset() {
  $("#restart").show()
  $("#restart").on("click", function () {
    $("#answers, .quiz").show();
    $("#results").hide()
    countDown = 10;
    correctAnswer = 0;
    wrongAnswer = 0;
    unAnswered = 0;
    answers = 0;
    results;
    currentQuestion = 0;
    currentAnswer;
    timer();
    startGame();
  })
};
//trivia questions
questions = [{
    question: "Who is the main character in hunter x hunter?",
    answers: ["Goku", "Ichiglo", "Gon", "Ash"],
    correctAnswer: "Gon"
  },
  {
    question: "How many dragon balls do you need to summon the shenron?",
    answers: ["Seven", "Six", "Five", "Twelve"],
    correctAnswer: "Seven"
  },
  {
    question: "What gave light yagami the power over a person life?",
    answers: ["Bankia", "The death note", "Geass", "The ring"],
    correctAnswer: "The death note"
  },
  {
    question: "Who is the most powerful of the seven deadly sins?",
    answers: [
      "Merlin- Boar's sin of gluttony",
      "Diane- Serpent's sin of envy",
      "Gowther- Goat's sin of lust",
      "Escanor- The lion's sin of pride"
    ],
    correctAnswer: "Escanor- The lion's sin of pride"
  },
  {
    question: "Who seeks to be the hokage?",
    answers: ["Naruto", "Aang", "Minoru Mineta", "Lelouch Lamperouge"],
    correctAnswer: "Naruto"
  },
  {
    question: "What fruit did monkey d.luffy eat in one piece?",
    answers: [
      "ope ope fruit",
      "bara bara fruit",
      "yomi yomi fruit",
      "gum gum fruit"
    ],
    correctAnswer: "gum gum fruit"
  }
];

startGame();

//fix the timer for the reset button