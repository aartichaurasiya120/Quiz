const questions = [
  { type: "mcq", question: "5 + 7 = ?", options: ["10","11","12","13"], answer: ["12"] },
  { type: "mcq", question: "18 ÷ 3 = ?", options: ["5","6","7","8"], answer: ["6"] },
  { type: "fill", question: "Square root of 64 = ?", answer: ["8"] },
  { type: "msq", question: "Select Even Numbers", options: ["2","5","8","11"], answer: ["2","8"] },

  { type: "mcq", question: "Find the odd one out", options: ["Apple","Mango","Carrot","Banana"], answer: ["Carrot"] },
  { type: "mcq", question: "If CAT = 24, DOG = ?", options: ["26","30","29","28"], answer: ["26"] },
  { type: "fill", question: "2,4,8,16, ?", answer: ["32"] },
  { type: "msq", question: "Prime Numbers", options: ["3","6","7","9"], answer: ["3","7"] }
];

// shuffle
function shuffle(array){
  for(let i=array.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [array[i],array[j]]=[array[j],array[i]];
  }
}

shuffle(questions);

window.onload = function () {

  const container = document.getElementById("quizContainer");

  questions.forEach((q, index) => {
    let div = document.createElement("div");
    div.classList.add("question");

    let html = `<p><b>Q${index+1}. ${q.question}</b></p>`;

    if(q.type==="mcq"){
      q.options.forEach(opt=>{
        html += `<label>
          <input type="radio" name="q${index}" value="${opt}"> ${opt}
        </label><br>`;
      });
    }

    else if(q.type==="msq"){
      q.options.forEach(opt=>{
        html += `<label>
          <input type="checkbox" name="q${index}" value="${opt}"> ${opt}
        </label><br>`;
      });
    }

    else{
      html += `<input type="text" name="q${index}">`;
    }

    div.innerHTML = html;
    container.appendChild(div);
  });

};

function submitQuiz(){
  let score = 0;

  questions.forEach((q,index)=>{
    if(q.type==="mcq"){
      let selected = document.querySelector(`input[name="q${index}"]:checked`);
      if(selected && q.answer.includes(selected.value)) score++;
    }

    else if(q.type==="msq"){
      let selected = document.querySelectorAll(`input[name="q${index}"]:checked`);
      let values = Array.from(selected).map(el=>el.value);

      if(values.length===q.answer.length && values.every(v=>q.answer.includes(v))){
        score++;
      }
    }

    else{
      let input = document.querySelector(`input[name="q${index}"]`);
      if(input.value.trim()===q.answer[0]) score++;
    }
  });

  document.getElementById("result").innerHTML =
    `Your Score: ${score} / ${questions.length}`;
}
