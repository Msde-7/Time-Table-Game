let answer = "20";
let equation = "5 x 4";
let multiplier = Math.floor(Math.random() * 13);
let answer_1 = 20;
let answer_2 = 72;
let answer_3 = 19;
let answer_4 = 72;
let y = 4;
let allSelected = true;
let score = 0;
let time = 30;
const restart = $(".restart");
const timeBox = $(".time");
const finalScore = $(".final_score");
const restartBox = $(".restart_box");
const toBlur = $(".to_blur");
const scoreSelect = $(".score");
const equationH = $(".equation");

const reset = () => {
  time = 30;
  score = 0;
  restartBox.css("display", "none");
  toBlur.css("filter", "none");
  scoreSelect.text("Score: 0");
};

restart.on("click", function () {
  time = 30;
  score = 0;
  restartBox.css("display", "none");
  toBlur.css("filter", "none");
  scoreSelect.text("Score: 0");
});

$(".answer").on("click", function () {
  if (time != 0) {
    if ($(this).text() == answer) {
      $(this).addClass("correct_animation");
      score++;
      randomizer();
      scoreSelect.text("Score: " + score);
      setTimeout(() => {
        $(this).removeClass("correct_animation");
      }, 250);
    } else if (score != 0) {
      score--;
      $(this).addClass("incorrect_animation");
      scoreSelect.text("Score: " + score);
      setTimeout(() => {
        $(this).removeClass("incorrect_animation");
      }, 250);
    } else {
      $(this).addClass("incorrect_animation");
      scoreSelect.text("Score: " + score);
      setTimeout(() => {
        $(this).removeClass("incorrect_animation");
      }, 250);
    }
  }
});

const randomizeAnswer = () => {
  let possibleAnswer = Math.floor(Math.random() * 145);
  if (possibleAnswer != answer) {
    return possibleAnswer;
  } else {
    randomizeAnswer();
  }
};

const randomizer = () => {
  if (allSelected) {
    y = Math.floor(Math.random() * 12 + 1);
  }
  let x = Math.floor(Math.random() * 13);
  answer = x * y;
  answerText = x + " x " + y;
  equationH.text(answerText);
  let index = Math.floor(Math.random() * 4) + 1;
  let correctAnswer = $(".answer_" + index);
  correctAnswer.text(answer);
  for (i = 1; i < 5; i++) {
    if (index != i) {
      let currentAnswer = $(".answer_" + i);
      currentAnswer.text(randomizeAnswer);
    }
  }
};

//Holy shit conditionals
$(".multiplier").on("click", function () {
  let multiplierSelected = $(this).text();
  selectUnselect($(this));
  if (multiplierSelected[0] == "A") {
    allSelected = true;
  } else {
    allSelected = false;
  }
  if (
    multiplierSelected[1] == 1 ||
    multiplierSelected[1] == 0 ||
    multiplierSelected[1] == 2
  ) {
    y = multiplierSelected[0] + multiplierSelected[1];
  } else {
    y = multiplierSelected[0];
  }
  $(".time_tables").removeClass("add_slide");
  randomizer();
  reset();
});

function selectUnselect(selected) {
  $(".multiplier").removeClass("selected_multiplier");
  selected.addClass("selected_multiplier");
}

const decreaser = () => {
  if (time != 0) {
    time--;
    timeBox.text("Time: " + time);
  } else {
    toBlur.css("filter", "blur(4px)");
    finalScore.text("Score: " + score);
    restartBox.css("display", "block");
  }
};

$(".drop_down").on("click", function () {
  $(".time_tables").addClass("add_slide");
});
setInterval(decreaser, 1000);