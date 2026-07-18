'use strict';

/* =========================================================
   DADOS DAS PERGUNTAS
========================================================= */

const questions = [
    {
        question: 'Qual é o tipo de comida que eu mais gosto?',
        options: ['Pizza', 'Lanche', 'Comida japonesa', 'Churrasco'],
        correctAnswer: 1,
    },
    {
        question: 'Qual é o meu passeio favorito?',
        options: [
            'Sair sozinho para comprar coisas',
            'Ficar em casa jogando',
            'Sair com você',
            'Ir a festas',
        ],
        correctAnswer: 2,
    },
    {
        question: 'Qual tipo de carro mais chama minha atenção?',
        options: [
            'Carros antigos',
            'Caminhonetes',
            'Carros populares',
            'Carros esportivos',
        ],
        correctAnswer: 3,
    },
    {
        question: 'Qual destes passeios simples eu gosto de fazer?',
        options: [
            'Sair para comer frutas na rua',
            'Ir a uma biblioteca',
            'Fazer trilha',
            'Ir ao cinema sozinho',
        ],
        correctAnswer: 0,
    },
    {
        question: 'Qual é a minha estação favorita do ano?',
        options: ['Verão', 'Outono', 'Primavera', 'Inverno'],
        correctAnswer: 2,
    },
    {
        question: 'Se eu pudesse ter um animal diferente, qual escolheria?',
        options: ['Cobra', 'Furão', 'Iguana', 'Coruja'],
        correctAnswer: 1,
    },
    {
        question: 'Qual considero ser o meu maior defeito?',
        options: [
            'Ser muito ciumento',
            'Ser muito teimoso',
            'Procrastinar demais',
            'Falar demais',
        ],
        correctAnswer: 2,
    },
    {
        question: 'Qual cidade eu gostaria muito de conhecer?',
        options: ['Paris', 'Nova York', 'Londres', 'Tóquio'],
        correctAnswer: 3,
    },
    {
        question: 'O que eu faria se ficasse milionário?',
        options: [
            'Compraria apenas carros',
            'Viajaria muito',
            'Guardaria todo o dinheiro',
            'Abriria um restaurante',
        ],
        correctAnswer: 1,
    },
    {
        question: 'Qual foi o meu jogo favorito durante muito tempo?',
        options: ['Minecraft', 'Free Fire', 'Fortnite', 'GTA'],
        correctAnswer: 2,
    },
    {
        question: 'Qual clima eu prefiro?',
        options: ['Muito sol', 'Chuva', 'Muito frio', 'Tempo seco'],
        correctAnswer: 1,
    },
    {
        question: 'Qual era a minha “matéria favorita” na escola?',
        options: ['Matemática', 'História', 'Educação Física', 'Ir embora'],
        correctAnswer: 3,
    },
    {
        question: 'O que eu mais gosto em você?',
        options: [
            'Seu cabelo',
            'Seu jeito de se vestir',
            'Seu caráter',
            'Seu gosto musical',
        ],
        correctAnswer: 2,
    },
    {
        question: 'Qual marca de carro eu considero uma bomba?',
        options: ['Honda', 'Toyota', 'Peugeot', 'Acura'],
        correctAnswer: 2,
    },
    {
        question: 'Qual rede social eu mais odeio?',
        options: ['Instagram', 'TikTok', 'X', 'Facebook'],
        correctAnswer: 3,
    },
    {
        question: 'Qual matéria eu realmente odeio?',
        options: ['Português', 'Física', 'Biologia', 'Geografia'],
        correctAnswer: 1,
    },
    {
        question: 'Qual comida eu não comeria de jeito nenhum?',
        options: ['Feijão', 'Salada', 'Sopa', 'Figado'],
        correctAnswer: 0,
    },
    {
        question: 'Quais insetos eu mais odeio?',
        options: [
            'Borboleta e joaninha',
            'Abelha e besouro',
            'Pernilongo e formiga',
            'Grilo e cigarra',
        ],
        correctAnswer: 2,
    },
];

const bonusQuestions = [
    'Qual mania minha você acha mais engraçada?',
    'Qual foi o nosso momento mais especial até hoje?',
    'O que você acha que eu mais gosto de fazer quando estou com você?',
    'Escreva uma coisa sobre mim que poucas pessoas sabem:',
    'Hoje tem?',
];

const todayBonusKey = 'Hoje tem?';
const todayBonusOptions = [
    { value: 'sim', label: 'Sim 💗' },
    { value: 'não', label: 'Não 😭' },
];

/* =========================================================
   ESTADO DO QUIZ
========================================================= */

const quizState = {
    playerName: '',
    currentQuestionIndex: 0,
    answers: new Array(questions.length).fill(null),
    bonusAnswers: new Array(bonusQuestions.length).fill(''),
    score: 0,
    resultCalculated: false,
};

/* =========================================================
   REFERÊNCIAS DOS ELEMENTOS
========================================================= */

const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-screen'),
    bonus: document.getElementById('bonus-screen'),
    result: document.getElementById('result-screen'),
    review: document.getElementById('review-screen'),
};

const startForm = document.getElementById('start-form');
const playerNameInput = document.getElementById('player-name');
const nameError = document.getElementById('name-error');

const quizCard = document.getElementById('quiz-card');
const questionArea = document.getElementById('question-area');
const questionCounter = document.getElementById('question-counter');
const questionNumberBadge = document.getElementById('question-number-badge');
const quizQuestion = document.getElementById('quiz-question');
const answerOptions = document.getElementById('answer-options');
const quizAlert = document.getElementById('quiz-alert');
const progressTrack = document.querySelector('.progress-track');
const progressBar = document.getElementById('progress-bar');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');

const bonusForm = document.getElementById('bonus-form');
const bonusQuestionsContainer = document.getElementById('bonus-questions');
const bonusBackButton = document.getElementById('bonus-back-button');
const bonusAlert = document.getElementById('bonus-alert');

const resultCard = document.getElementById('result-card');
const resultCelebrationIcon = document.getElementById(
    'result-celebration-icon',
);
const resultName = document.getElementById('result-name');
const scoreRing = document.getElementById('score-ring');
const scorePercentage = document.getElementById('score-percentage');
const scoreSummary = document.getElementById('score-summary');
const resultMessage = document.getElementById('result-message');
const correctCount = document.getElementById('correct-count');
const wrongCount = document.getElementById('wrong-count');
const reviewButton = document.getElementById('review-button');
const restartButton = document.getElementById('restart-button');

const reviewList = document.getElementById('review-list');
const bonusReviewList = document.getElementById('bonus-review-list');
const backToResultButton = document.getElementById('back-to-result-button');
const reviewRestartButton = document.getElementById('review-restart-button');

const floatingHeartsContainer = document.getElementById('floating-hearts');
const celebrationContainer = document.getElementById('celebration-container');

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    renderBonusQuestions();
    attachEventListeners();
    playerNameInput.focus();
});

/* =========================================================
   EVENTOS
========================================================= */

function attachEventListeners() {
    startForm.addEventListener('submit', handleStartQuiz);
    playerNameInput.addEventListener('input', clearNameError);

    backButton.addEventListener('click', goToPreviousQuestion);
    nextButton.addEventListener('click', goToNextQuestion);

    bonusBackButton.addEventListener('click', returnToLastQuestion);
    bonusForm.addEventListener('submit', finishQuiz);

    reviewButton.addEventListener('click', showReview);
    restartButton.addEventListener('click', restartQuiz);
    reviewRestartButton.addEventListener('click', restartQuiz);

    backToResultButton.addEventListener('click', () => {
        showScreen('result');
    });

    /*
     * Atalhos de teclado:
     * - Teclas 1, 2, 3 e 4 selecionam as alternativas.
     * - Setas para cima/baixo navegam pelas alternativas.
     * - Enter avança para a próxima pergunta quando o foco não está em um botão.
     */
    document.addEventListener('keydown', handleGlobalKeyboardNavigation);
}

/* =========================================================
   CONTROLE DAS TELAS
========================================================= */

/**
 * Exibe uma tela e oculta as demais.
 * @param {"start"|"quiz"|"bonus"|"result"|"review"} screenName
 */
function showScreen(screenName) {
    Object.entries(screens).forEach(([name, screen]) => {
        if (name === screenName) {
            screen.hidden = false;
            screen.classList.remove('screen--leaving');
            screen.classList.add('screen--active');
        } else {
            screen.hidden = true;
            screen.classList.remove('screen--active', 'screen--leaving');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* =========================================================
   TELA INICIAL
========================================================= */

function handleStartQuiz(event) {
    event.preventDefault();

    const enteredName = playerNameInput.value.trim();

    if (!enteredName) {
        nameError.textContent = 'Digite seu nome para começar! 💗';
        playerNameInput.setAttribute('aria-invalid', 'true');
        playerNameInput.focus();
        shakeElement(startForm);
        return;
    }

    quizState.playerName = enteredName;
    playerNameInput.setAttribute('aria-invalid', 'false');
    clearNameError();

    showScreen('quiz');
    renderQuestion({ animate: false });
}

function clearNameError() {
    nameError.textContent = '';
    playerNameInput.removeAttribute('aria-invalid');
}

/* =========================================================
   RENDERIZAÇÃO DAS PERGUNTAS PRINCIPAIS
========================================================= */

/**
 * Atualiza toda a interface da pergunta atual.
 * @param {{ animate?: boolean }} options
 */
function renderQuestion({ animate = true } = {}) {
    const currentQuestion = questions[quizState.currentQuestionIndex];
    const selectedAnswer = quizState.answers[quizState.currentQuestionIndex];
    const currentNumber = quizState.currentQuestionIndex + 1;
    const progress = (currentNumber / questions.length) * 100;

    const updateContent = () => {
        questionCounter.textContent = `Pergunta ${currentNumber} de ${questions.length}`;
        questionNumberBadge.textContent = String(currentNumber).padStart(
            2,
            '0',
        );
        quizQuestion.textContent = currentQuestion.question;

        progressBar.style.width = `${progress}%`;
        progressTrack.setAttribute(
            'aria-valuenow',
            String(Math.round(progress)),
        );

        backButton.disabled = quizState.currentQuestionIndex === 0;
        backButton.setAttribute(
            'aria-hidden',
            String(quizState.currentQuestionIndex === 0),
        );

        nextButton.innerHTML =
            quizState.currentQuestionIndex === questions.length - 1
                ? "<span>Ir para as perguntas bônus</span><span aria-hidden='true'>💕</span>"
                : "<span>Próxima pergunta</span><span aria-hidden='true'>→</span>";

        quizAlert.textContent = '';
        answerOptions.innerHTML = '';

        currentQuestion.options.forEach((option, optionIndex) => {
            const optionButton = createAnswerOption(
                option,
                optionIndex,
                selectedAnswer,
            );

            answerOptions.appendChild(optionButton);
        });

        const focusTarget =
            answerOptions.querySelector('[aria-checked="true"]') ||
            answerOptions.querySelector('.answer-option');

        if (focusTarget) {
            focusTarget.focus({ preventScroll: true });
        }
    };

    if (!animate) {
        updateContent();
        return;
    }

    questionArea.classList.add('question-area--changing');

    window.setTimeout(() => {
        updateContent();
        questionArea.classList.remove('question-area--changing');

        /*
         * Reinicia a animação de entrada removendo e recolocando o elemento
         * no fluxo de animação do navegador.
         */
        void questionArea.offsetWidth;
        questionArea.style.animation = 'none';
        void questionArea.offsetWidth;
        questionArea.style.animation = '';
    }, 170);
}

/**
 * Cria um botão acessível para uma alternativa.
 * @param {string} optionText
 * @param {number} optionIndex
 * @param {number|null} selectedAnswer
 * @returns {HTMLButtonElement}
 */
function createAnswerOption(optionText, optionIndex, selectedAnswer) {
    const optionButton = document.createElement('button');
    const optionLetter = String.fromCharCode(65 + optionIndex);
    const isSelected = selectedAnswer === optionIndex;

    optionButton.type = 'button';
    optionButton.className = 'answer-option';
    optionButton.setAttribute('role', 'radio');
    optionButton.setAttribute('aria-checked', String(isSelected));
    optionButton.setAttribute(
        'aria-label',
        `Alternativa ${optionLetter}: ${optionText}`,
    );
    optionButton.dataset.optionIndex = String(optionIndex);

    optionButton.innerHTML = `
    <span class="answer-option__letter" aria-hidden="true">${optionLetter}</span>
    <span class="answer-option__text">${escapeHTML(optionText)}</span>
    <span class="answer-option__check" aria-hidden="true">✓</span>
  `;

    optionButton.addEventListener('click', () => {
        selectAnswer(optionIndex);
    });

    optionButton.addEventListener('keydown', handleOptionKeyboardNavigation);

    return optionButton;
}

/**
 * Salva a resposta selecionada e atualiza o destaque visual.
 * @param {number} optionIndex
 */
function selectAnswer(optionIndex) {
    quizState.answers[quizState.currentQuestionIndex] = optionIndex;
    quizAlert.textContent = '';

    const optionButtons = answerOptions.querySelectorAll('.answer-option');

    optionButtons.forEach((button) => {
        const isSelected = Number(button.dataset.optionIndex) === optionIndex;
        button.setAttribute('aria-checked', String(isSelected));
    });

    const selectedButton = answerOptions.querySelector(
        `[data-option-index="${optionIndex}"]`,
    );

    if (selectedButton) {
        selectedButton.focus();
    }
}

function goToNextQuestion() {
    const selectedAnswer = quizState.answers[quizState.currentQuestionIndex];

    if (selectedAnswer === null) {
        quizAlert.textContent = 'Escolha uma resposta antes de continuar! 💗';
        shakeElement(quizCard);

        const firstOption = answerOptions.querySelector('.answer-option');

        if (firstOption) {
            firstOption.focus();
        }

        return;
    }

    if (quizState.currentQuestionIndex < questions.length - 1) {
        quizState.currentQuestionIndex += 1;
        renderQuestion();
        return;
    }

    saveBonusAnswersFromFields();
    showScreen('bonus');

    const firstBonusField = bonusQuestionsContainer.querySelector('textarea');

    if (firstBonusField) {
        firstBonusField.focus({ preventScroll: true });
    }
}

function goToPreviousQuestion() {
    if (quizState.currentQuestionIndex === 0) {
        return;
    }

    quizState.currentQuestionIndex -= 1;
    renderQuestion();
}

/* =========================================================
   NAVEGAÇÃO PELO TECLADO
========================================================= */

function handleOptionKeyboardNavigation(event) {
    const options = Array.from(
        answerOptions.querySelectorAll('.answer-option'),
    );

    const currentIndex = options.indexOf(event.currentTarget);

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();

        const nextIndex = (currentIndex + 1) % options.length;
        options[nextIndex].focus();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();

        const previousIndex =
            (currentIndex - 1 + options.length) % options.length;

        options[previousIndex].focus();
    }

    if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        selectAnswer(Number(event.currentTarget.dataset.optionIndex));
    }
}

function handleGlobalKeyboardNavigation(event) {
    if (screens.quiz.hidden) {
        return;
    }

    const activeElementTag = document.activeElement?.tagName;
    const isTyping =
        activeElementTag === 'INPUT' || activeElementTag === 'TEXTAREA';

    if (isTyping) {
        return;
    }

    if (['1', '2', '3', '4'].includes(event.key)) {
        const optionIndex = Number(event.key) - 1;

        if (questions[quizState.currentQuestionIndex].options[optionIndex]) {
            event.preventDefault();
            selectAnswer(optionIndex);
        }
    }

    if (
        event.key === 'Enter' &&
        !document.activeElement?.classList.contains('answer-option') &&
        document.activeElement !== backButton &&
        document.activeElement !== nextButton
    ) {
        event.preventDefault();
        goToNextQuestion();
    }
}

/* =========================================================
   PERGUNTAS BÔNUS
========================================================= */

function renderBonusQuestions() {
    bonusQuestionsContainer.innerHTML = '';

    bonusQuestions.forEach((questionText, index) => {
        const wrapper = document.createElement('div');

        wrapper.className = 'bonus-question';

        if (questionText === todayBonusKey) {
            const selectedValue = quizState.bonusAnswers[index] || '';

            wrapper.innerHTML = `
        <fieldset class="bonus-yesno" aria-describedby="bonus-alert">
          <legend>
            <span class="bonus-question__number" aria-hidden="true">${index + 1}</span>
            ${escapeHTML(questionText)}
          </legend>

          <div class="bonus-yesno__options" role="radiogroup" aria-label="${escapeHTML(
              questionText,
          )}">
            ${todayBonusOptions
                .map(
                    (opt) => `
              <label class="bonus-yesno-option">
                <input
                  type="radio"
                  name="bonusAnswer${index}"
                  value="${opt.value}"
                  ${selectedValue === opt.value ? 'checked' : ''}
                />
                <span class="bonus-yesno-option__label">${escapeHTML(
                    opt.label,
                )}</span>
              </label>
            `,
                )
                .join('')}
          </div>
        </fieldset>
      `;

            const radioButtons = wrapper.querySelectorAll(
                'input[type="radio"]',
            );

            radioButtons.forEach((radio) => {
                radio.addEventListener('change', (event) => {
                    quizState.bonusAnswers[index] = event.target.value;
                    bonusAlert.textContent = '';
                });
            });
        } else {
            wrapper.innerHTML = `
          <label for="bonus-answer-${index}">
            <span class="bonus-question__number" aria-hidden="true">${index + 1}</span>
            ${escapeHTML(questionText)}
          </label>

          <textarea
            id="bonus-answer-${index}"
            name="bonusAnswer${index}"
            maxlength="800"
            placeholder="Escreva sua resposta aqui..."
            aria-label="${escapeHTML(questionText)}"
          ></textarea>
        `;

            const textarea = wrapper.querySelector('textarea');

            textarea.value = quizState.bonusAnswers[index];

            textarea.addEventListener('input', (event) => {
                quizState.bonusAnswers[index] = event.target.value;
                bonusAlert.textContent = '';
            });
        }

        bonusQuestionsContainer.appendChild(wrapper);
    });
}

function saveBonusAnswersFromFields() {
    bonusQuestions.forEach((questionText, index) => {
        if (questionText === todayBonusKey) {
            const checked = bonusQuestionsContainer.querySelector(
                `input[name="bonusAnswer${index}"]:checked`,
            );

            quizState.bonusAnswers[index] = checked ? checked.value : '';
            return;
        }

        const textarea = bonusQuestionsContainer.querySelector(
            `textarea#bonus-answer-${index}`,
        );

        quizState.bonusAnswers[index] = textarea ? textarea.value : '';
    });
}

function returnToLastQuestion() {
    saveBonusAnswersFromFields();
    quizState.currentQuestionIndex = questions.length - 1;

    showScreen('quiz');
    renderQuestion({ animate: false });
}

/* =========================================================
   CÁLCULO E EXIBIÇÃO DO RESULTADO
========================================================= */

function finishQuiz(event) {
    event.preventDefault();

    saveBonusAnswersFromFields();

    /*
     * Este bloqueio impede que cliques repetidos calculem o resultado
     * várias vezes ou disparem animações duplicadas.
     */
    if (!quizState.resultCalculated) {
        quizState.score = calculateScore();
        quizState.resultCalculated = true;
    }

    renderResult();
    showScreen('result');
    launchCelebration(quizState.score);
}

function calculateScore() {
    return quizState.answers.reduce((total, selectedAnswer, questionIndex) => {
        const isCorrect =
            selectedAnswer === questions[questionIndex].correctAnswer;

        return isCorrect ? total + 1 : total;
    }, 0);
}

function renderResult() {
    const percentage = Math.round((quizState.score / questions.length) * 100);

    const wrongAnswers = questions.length - quizState.score;
    const scoreAngle = (percentage / 100) * 360;

    resultName.textContent = quizState.playerName;
    scorePercentage.textContent = `${percentage}%`;
    scoreSummary.textContent = `Você acertou ${quizState.score} de ${questions.length} perguntas!`;
    resultMessage.textContent = getResultMessage(quizState.score);
    correctCount.textContent = String(quizState.score);
    wrongCount.textContent = String(wrongAnswers);

    scoreRing.style.setProperty('--score-angle', `${scoreAngle}deg`);
    scoreRing.setAttribute(
        'aria-label',
        `${quizState.score} acertos de ${questions.length}, equivalente a ${percentage}%`,
    );

    const isPerfectScore = quizState.score === questions.length;

    resultCard.classList.toggle('result-card--perfect', isPerfectScore);
    resultCelebrationIcon.textContent = isPerfectScore ? '💍' : '💖';
}

function getResultMessage(score) {
    if (score <= 5) {
        return 'Precisamos conversar mais, hein? 😂 Mas ainda dá tempo de aprender tudo sobre mim! 💕';
    }

    if (score <= 10) {
        return 'Você está indo bem, mas ainda existem alguns segredos para descobrir! 😏💗';
    }

    if (score <= 14) {
        return 'Você me conhece muito bem! Fiquei impressionado com você! 🥰';
    }

    if (score <= 17) {
        return 'Quase perfeito! Você realmente presta atenção em mim! 💖';
    }

    return 'PERFEITO! Você me conhece melhor do que ninguém! Acho que encontrei o amor da minha vida! 💍❤️';
}

/* =========================================================
   REVISÃO DAS RESPOSTAS
========================================================= */

function showReview() {
    renderReview();
    showScreen('review');
}

function renderReview() {
    reviewList.innerHTML = '';
    bonusReviewList.innerHTML = '';

    questions.forEach((questionData, questionIndex) => {
        const selectedIndex = quizState.answers[questionIndex];
        const correctIndex = questionData.correctAnswer;
        const isCorrect = selectedIndex === correctIndex;

        const selectedLetter =
            selectedIndex !== null
                ? String.fromCharCode(65 + selectedIndex)
                : '—';

        const correctLetter = String.fromCharCode(65 + correctIndex);

        const selectedText =
            selectedIndex !== null
                ? questionData.options[selectedIndex]
                : 'Nenhuma resposta selecionada';

        const correctText = questionData.options[correctIndex];

        const item = document.createElement('article');

        item.className = `review-item ${
            isCorrect ? 'review-item--correct' : 'review-item--wrong'
        }`;

        const selectedAnswerClass = isCorrect
            ? 'review-answer-line--selected-correct'
            : 'review-answer-line--selected-wrong';

        item.innerHTML = `
      <div class="review-item__header">
        <div class="review-item__title-group">
          <span class="review-status-icon" aria-hidden="true">
            ${isCorrect ? '✅' : '❌'}
          </span>

          <div>
            <p class="review-item__question-number">
              Pergunta ${questionIndex + 1}
            </p>

            <h3>${escapeHTML(questionData.question)}</h3>
          </div>
        </div>

        <span class="review-item__badge">
          ${isCorrect ? 'Você acertou' : 'Você errou'}
        </span>
      </div>

      <div class="review-answers">
        <p class="review-answer-line ${selectedAnswerClass}">
          <strong>Sua resposta</strong>
          ${escapeHTML(`${selectedLetter}) ${selectedText}`)}
        </p>

        ${
            isCorrect
                ? ''
                : `
              <p class="review-answer-line review-answer-line--correct-answer">
                <strong>Resposta correta</strong>
                ${escapeHTML(`${correctLetter}) ${correctText}`)}
              </p>
            `
        }
      </div>
    `;

        reviewList.appendChild(item);
    });

    bonusQuestions.forEach((questionText, index) => {
        const bonusItem = document.createElement('article');
        const rawAnswer = quizState.bonusAnswers[index] || '';

        const answer =
            questionText === todayBonusKey
                ? rawAnswer === 'sim'
                    ? 'Sim 💗'
                    : rawAnswer === 'não'
                      ? 'Não 💔'
                      : ''
                : rawAnswer.trim();

        bonusItem.className = 'bonus-review-item';
        bonusItem.innerHTML = `
      <h4>${index + 1}. ${escapeHTML(questionText)}</h4>
      <p>${escapeHTML(answer || 'Nenhuma resposta foi escrita.')}</p>
    `;

        bonusReviewList.appendChild(bonusItem);
    });
}

/* =========================================================
   REINÍCIO DO QUIZ
========================================================= */

function restartQuiz() {
    quizState.playerName = '';
    quizState.currentQuestionIndex = 0;
    quizState.answers = new Array(questions.length).fill(null);
    quizState.bonusAnswers = new Array(bonusQuestions.length).fill('');
    quizState.score = 0;
    quizState.resultCalculated = false;

    playerNameInput.value = '';
    nameError.textContent = '';
    quizAlert.textContent = '';
    bonusAlert.textContent = '';

    resultCard.classList.remove('result-card--perfect');
    celebrationContainer.innerHTML = '';

    renderBonusQuestions();
    showScreen('start');

    window.setTimeout(() => {
        playerNameInput.focus();
    }, 100);
}

/* =========================================================
   CORAÇÕES DO FUNDO
========================================================= */

function createFloatingHearts() {
    const heartSymbols = ['♡', '♥', '💗', '💕'];
    const heartCount = window.innerWidth < 600 ? 13 : 22;

    floatingHeartsContainer.innerHTML = '';

    for (let index = 0; index < heartCount; index += 1) {
        const heart = document.createElement('span');

        heart.className = 'floating-heart';
        heart.textContent =
            heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${12 + Math.random() * 18}px`;
        heart.style.animationDuration = `${10 + Math.random() * 12}s`;
        heart.style.animationDelay = `${Math.random() * -18}s`;

        floatingHeartsContainer.appendChild(heart);
    }
}

/* =========================================================
   CONFETES E CELEBRAÇÃO
========================================================= */

function launchCelebration(score) {
    celebrationContainer.innerHTML = '';

    if (score < 11) {
        return;
    }

    const isPerfect = score === questions.length;
    const amount = isPerfect ? 92 : score >= 15 ? 62 : 38;
    const symbols = isPerfect
        ? ['💖', '💗', '💕', '❤️', '✨', '💍']
        : ['💖', '💕', '✨', '🌸'];

    for (let index = 0; index < amount; index += 1) {
        const piece = document.createElement('span');

        piece.className = 'celebration-piece';
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = `${Math.random() * 100}%`;
        piece.style.fontSize = `${13 + Math.random() * 19}px`;
        piece.style.animationDuration = `${2.6 + Math.random() * 2.6}s`;
        piece.style.animationDelay = `${Math.random() * 1.1}s`;
        piece.style.setProperty(
            '--drift',
            `${Math.round(-120 + Math.random() * 240)}px`,
        );
        piece.style.setProperty(
            '--rotation',
            `${Math.round(-420 + Math.random() * 840)}deg`,
        );

        celebrationContainer.appendChild(piece);
    }

    if (isPerfect) {
        createPerfectBurst();
    }

    window.setTimeout(() => {
        celebrationContainer.innerHTML = '';
    }, 6500);
}

function createPerfectBurst() {
    const burst = document.createElement('div');

    burst.className = 'perfect-burst';

    for (let index = 0; index < 22; index += 1) {
        const burstHeart = document.createElement('span');
        const angle = (360 / 22) * index;

        burstHeart.textContent = index % 4 === 0 ? '✨' : '💖';
        burstHeart.style.setProperty('--angle', `${angle}deg`);
        burstHeart.style.setProperty(
            '--distance',
            `${110 + Math.random() * 150}px`,
        );
        burstHeart.style.animationDelay = `${Math.random() * 0.2}s`;

        burst.appendChild(burstHeart);
    }

    celebrationContainer.appendChild(burst);
}

/* =========================================================
   FUNÇÕES UTILITÁRIAS
========================================================= */

function shakeElement(element) {
    element.classList.remove('shake');

    /*
     * Força o navegador a reconhecer a remoção da classe antes
     * de adicioná-la novamente, permitindo repetir a animação.
     */
    void element.offsetWidth;

    element.classList.add('shake');

    window.setTimeout(() => {
        element.classList.remove('shake');
    }, 450);
}

/**
 * Evita que textos inseridos dinamicamente sejam interpretados como HTML.
 * @param {string} value
 * @returns {string}
 */
function escapeHTML(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}
