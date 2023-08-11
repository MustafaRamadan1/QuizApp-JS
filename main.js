let json = "";
let questions = [];
let question = document.getElementById("question");
let childrenArray = document.getElementById("answer-buttons").children;
let next_btn = document.getElementById("next-btn");
let scoreElement = document.getElementById("score");
let closebtn = document.getElementById("closeWindow");
let result = document.getElementById("result");
let questionNumber = 0;
let score = 0;
let isClicked = false;
console.log(childrenArray);


async function fetchJsonData() {
  json = await fetch("./questions.json").then((res) => res.json());
  console.log(json);

  questions = json.questions;

  question.innerText = questions[questionNumber].question;
  let correctAnswer = questions[questionNumber].correctAnswer;

  for (let i = 0; i < childrenArray.length; i++) {
    childrenArray[i].innerText = questions[questionNumber].options[i];

    childrenArray[i].addEventListener("click", function (e) {
      isClicked = true;
      if (e.target.innerText.trim() == correctAnswer.trim()) {
        // e.target.classList.add("correct");
        score ++;
        console.log("score" + score);
        e.target.className = `btn correct`;
      } else {
        for (let i = 0; i < childrenArray.length; i++) {
          if (childrenArray[i].innerText.trim() == correctAnswer.trim()) {
            childrenArray[i].classList.add("correct");
          }
        }
        e.target.classList.add("wrong");
      }
        next_btn.style.display = "block";
    });
  }
}

fetchJsonData();

next_btn.addEventListener("click", function () {
  console.log("QuestionNumber Before:" + questionNumber);
  questionNumber++;
  console.log("QuestionNumber Increment: "+ questionNumber);
  if (questionNumber < questions.length) {
    for (let i in childrenArray) {
      childrenArray[i].className = "btn";
    }
    fetchJsonData();
  } else {
    document.getElementById("answer-buttons").style.display = "none";
    question.innerText = "Your Result";
    result.innerText = `your score is ${score} of 10`; 
    scoreElement.style.display = "block";
    next_btn.style.display = "none";
    
  }
});


closebtn.addEventListener("click", function(){

    window.close();
});