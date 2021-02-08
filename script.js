class Quest {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
}




let q1 = new Quest("1453'de İstanbul'u kim almıştır. ?", ["I.Selim", "Cem Sultan", "Voyvoda", "II.Mehmet"], "II.Mehmet");
let q2 = new Quest("II.Dünya savaşını kim başlatmıştır", ["Hitler", "Stalin", "Churcill", "Roosvelt"], "Hitler");
let q3 = new Quest("Sevr antlaşmasını geçersiz sayarak misakımilliyi tanıyan ilk devlet hangisidir?", ["İngiltere", "Fransa", "Yunanistan", "S.Rusya"], "Fransa");
let q4 = new Quest("Koyunhisar (Bafeon) savaşı hangi hükümdar döneminde bizans ile yapılmıştır?", ["Orhan Bey", "I.Murat", "Osman Bey", "I.Bayezid"], "I.Bayezid");
let questions = [q1, q2, q3, q4];
let totalScore = 1;
let nowQuest = 0;
let btnList = [];
let finishText;

const questionText = document.querySelector(".question-text");
const statisticText = document.querySelector(".statistics-text");
const btnBody = document.querySelector(".btn-body");
const mainScreen = document.querySelector(".main-screen");



firstStart();

function answerTheQuestion(event) {

    if (nowQuest < questions.length - 1) {
        if (event.target.value === questions[nowQuest].answer) {
            totalScore++;
            showAlert(event,"green");
        }else{
            showAlert(event,"red");
        }
        nowQuest++;

        setTimeout(() => {
            footerScore(nowQuest + 1, questions.length);
            refreshQuestion(questions[nowQuest]);
        }, 1000);
    }
    else {
        if (event.target.value === questions[nowQuest].answer) {
            showAlert(event,"green");
        }else{
            showAlert(event,"red");
        }
        setTimeout(() => {
            questionText.style = "display : none;";
            btnBody.style = "display : none;"
            finishText = document.createElement("h4");
            finishText.textContent = "Quiz bitti " + totalScore + " soru bildiniz.";
            mainScreen.appendChild(finishText);
        }, 1000);
    }
}

function firstStart() {
    refreshQuestion(questions[nowQuest]);
    footerScore(nowQuest + 1, questions.length);
}

function refreshQuestion(nextQuest) {
    questionText.textContent = nextQuest.text;
    // for (let index = 0; index < choicesButtons.length; index++) {
    //     choicesButtons[index].textContent = nextQuest.choices[index];
    //     choicesButtons[index].value = nextQuest.choices[index];
    // }
    for (let index = 0; index < nextQuest.choices.length; index++) {
        console.log(nextQuest.choices.length);
        let btn = document.createElement("button");
        btnList.push(btn);
        btnList[index].className = "btn btn-primary choices-button";
        btnList[index].textContent = nextQuest.choices[index];
        btnList[index].value = nextQuest.choices[index];
        btnList[index].style.margin = "0 5px";
        btnBody.appendChild(btnList[index]);
    }
    btnList.forEach(function(item){
        item.addEventListener("click",answerTheQuestion);
    })
}

function showAlert(event,color){
    event.target.style = `background-color :  ${color} ; transition : 0.5s`;
    setTimeout(() => {
        event.target.style = ``;
    }, 700);
}

function footerScore(nowQuestion, totalQuestion) {
    statisticText.textContent = "Question " + nowQuestion + " in " + totalQuestion;
}


