const questions = [
  // Maths
  {
    type: "mcq",
    question: "5 + 7 = ?",
    options: ["10", "11", "12", "13"],
    answer: ["12"],
  },
  {
    type: "mcq",
    question: "18 ÷ 3 = ?",
    options: ["5", "6", "7", "8"],
    answer: ["6"],
  },
  { type: "fill", question: "Square root of 64 = ?", answer: ["8"] },
  {
    type: "msq",
    question: "Select Even Numbers",
    options: ["2", "5", "8", "11"],
    answer: ["2", "8"],
  },

  // Reasoning
  {
    type: "mcq",
    question: "Find the odd one out: Apple, Mango, Carrot, Banana",
    options: ["Apple", "Mango", "Carrot", "Banana"],
    answer: ["Carrot"],
  },
  {
    type: "mcq",
    question: "If CAT = 24, DOG = ?",
    options: ["26", "30", "29", "28"],
    answer: ["26"],
  },
  {
    type: "fill",
    question: "Next number in series: 2, 4, 8, 16, ?",
    answer: ["32"],
  },
  {
    type: "msq",
    question: "Which are Prime Numbers?",
    options: ["3", "6", "7", "9"],
    answer: ["3", "7"],
  },

  // Mixed
  {
    type: "mcq",
    question: "15 × 2 = ?",
    options: ["25", "30", "35", "40"],
    answer: ["30"],
  },
  {
    type: "mcq",
    question: "Clock shows 3:00. What is angle between hands?",
    options: ["0°", "45°", "90°", "180°"],
    answer: ["90°"],
  },
];

// Shuffle only questions
function shuffle(array)
{
  for(let i = array.length - 1; i > 0; i--)
  {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(questions);




const container = document.getElementById("quizContainer");

questions.forEach((q, index) => {
  let div = document.createElement("div");
  div.classList.add("question");

  let html = `<p><strong>Q${index + 1}. ${q.question}</strong></p>`;

  if (q.type === "mcq") {
    html += `<div class="options">`;
    q.options.forEach((opt) => {
      html += `
                <label>
                    <input type="radio" name="q${index}" value="${opt}"> ${opt}
                </label>
            `;
    });
    html += `</div>`;
  } else if (q.type === "msq") {
    html += `<div class="options">`;
    q.options.forEach((opt) => {
      html += `
                <label>
                    <input type="checkbox" name="q${index}" value="${opt}"> ${opt}
                </label>
            `;
    });
    html += `</div>`;
  } else if (q.type === "fill") {
    html += `<input type="text" name="q${index}" placeholder="Enter answer">`;
  }

  div.innerHTML = html;
  container.appendChild(div);
});

function submit() {
  let score = 0;

  questions.forEach((q, index) => {
    let questionDiv = document.querySelectorAll(".question")[index];

    if (q.type === "mcq") {
      let selected = document.querySelector(`input[name="q${index}"]:checked`);
      let options = document.querySelectorAll(`input[name="q${index}"]`);

      options.forEach((opt) => {
        // Correct answer
        if (q.answer.includes(opt.value)) {
          opt.parentElement.style.color = "green";
          opt.style.accentColor = "green"; // 👈 circle green
        }

        // Wrong selected answer
        if (
          selected &&
          opt.value === selected.value &&
          !q.answer.includes(opt.value)
        ) {
          opt.parentElement.style.color = "red";
          opt.style.accentColor = "red"; // 👈 circle red
        }
      });

      if (selected && q.answer.includes(selected.value)) score++;
    } else if (q.type === "msq") {
      let selected = document.querySelectorAll(
        `input[name="q${index}"]:checked`,
      );
      let options = document.querySelectorAll(`input[name="q${index}"]`);
      let values = Array.from(selected).map((el) => el.value);

      options.forEach((opt) => {
        if (q.answer.includes(opt.value)) {
          opt.parentElement.style.color = "green";
          opt.style.accentColor = "green"; // 👈 green circle
        }

        if (values.includes(opt.value) && !q.answer.includes(opt.value)) {
          opt.parentElement.style.color = "red";
          opt.style.accentColor = "red"; // 👈 red circle
        }
      });

      if (
        values.length === q.answer.length &&
        values.every((val) => q.answer.includes(val))
      ) {
        score++;
      }
    } else if (q.type === "fill") {
      let input = document.querySelector(`input[name="q${index}"]`);
      let value = input.value.trim();

      if (q.answer.includes(value)) {
        input.style.border = "2px solid green";
        score++;
      } else {
        input.style.border = "2px solid red";

        let correct = document.createElement("div");
        correct.style.color = "green";
        correct.innerHTML = `Correct Answer: ${q.answer.join(", ")}`;
        questionDiv.appendChild(correct);
      }
    }
  });

  document.getElementById("result").innerHTML =
    `Your Score: ${score} / ${questions.length}`;
}
