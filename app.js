const questions =[
    {
        question:"Which type of javascript language is...",
        answers:[
            {text: "Object-Oriented",correct:false},
            {text: "Assembly-language",correct:false},
            {text: "Object based",correct:true},
            {text: "High-level",correct:false},
        ]
    },
    {
        question:"Which one of the following also known as Conditional Expression:",
        answers:[
            {text: "Alternative to if-else",correct:false},
            {text: "Switch statement",correct:false},
            {text: "If-then-else statement",correct:false},
            {text: "immediate if",correct:true},
        ]
    },
    {
        question:"The 'function' and 'var' are known as:",
        answers:[
            {text: "Declaration statements",correct:true},
            {text: "Data types",correct:false},
            {text: "Prototypes",correct:false},
            {text: "Keywords",correct:false},
        ]
    },
    {
        question:"In Javascript the x===y statement implies that:",
        answers:[
            {text: "Both x and y are equal in value, type and reference addresses",correct:false},
            {text: "Both are x and y are equal in value only",correct:false},
            {text: "Both are equal in the value and data type",correct:true},
            {text: "Both are not same at all",correct:false},
        ]
    },
];

const questionElement = document.getElementById("question");   
const  answerbuttons= document.getElementById("answer-buttons");   
const  nextbutton= document.getElementById("next-btn");   

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerbuttons.appendChild(button);
            if(answer.correct){
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextbutton.style.display = "none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button => {
            if(button.dataset.correct==="true"){
                button.classList.add("correct");
            }
            button.disabled = true;
    });
    nextbutton.style.display = "block";
}  

function showScore(){
    resetState(); 
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

function  handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
     

nextbutton.addEventListener("click", () =>{
     if(currentQuestionIndex < questions.length){
            handleNextButton();
     }
     else{
        startQuiz();
     }
});

startQuiz();


