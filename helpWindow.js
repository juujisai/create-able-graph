

const helpMessages = [
  {
    question: 'Jak dodać nowy plik?',
    answer: 'Nowy plik można dodać za pomocą przycisku "Plik" w menu aplikacji'
  },
  {
    question: 'W jakim celu została stworzona ta aplikacja?',
    answer: 'Aplikacja powstała w skutek rozszerzania mini projektu, który miał na celu sprawdzenie w jaki sposób przekazywać i wyświetlać dane z bazy danych - w tym przypadku pliku csv. Moim celem nie było używanie gotowych rozwiązań. Chciałem sprawdzić czy mój sposób myślenia jest odpowiedni do tworzenia takich rzeczy - swojego typu wyzwanie.'
  },
  {
    question: 'Czy da się edytować tabelę lub wykres?',
    answer: 'Tak, podstawowe narzędzia edycji zawarte są w menu "Edycja"'
  },
  {
    question: 'Dlaczego nie widzę polskich znaków?',
    answer: 'Problem ten ma swoją przyczynę w formacie csv. Mimo ustawienia kodowania na UTF-8, polskie znaki nie wyświetlają się w DOM'
  },
  {
    question: 'Dlaczego wykres zachowuje się dziwnie przy wartościach ujemnych?',
    answer: 'Wykresy zostały sporządzone w ten sposób, żeby ukazywać tylko dane o wartościach dodatnich. Jest to problem, który w przyszłości może zostać rozwiązany jeśli zaistnieje taka potrzeba'
  },
  {
    question: 'Czy projekt będzie jeszcze rozwijany?',
    answer: 'Projekt będzie rozwijany jeśli powstaną nowe pomysły, które urozmaicą aplikację lub jeśli przyjdzie mi do głowy coś co chciałbym jeszcze sprawdzić i spróbować swoich sił w tworzeniu własnych rozwiązań'
  },
]


const initHelp = function () {

  const questionContainer = document.querySelector('.questionContainer')
  const answerContainer = document.querySelector('.answer')


  const createQuestionList = () => {

    for (let i = 0; i < helpMessages.length; ++i) {
      let newLi = document.createElement('li')
      let newA = document.createElement('a')

      newA.textContent = helpMessages[i].question
      newA.classList.add('helpQuestion')
      newLi.appendChild(newA)

      questionContainer.appendChild(newLi)
    }
  }

  createQuestionList()

  const allQuestions = [...document.querySelectorAll('.helpQuestion')]

  const showAnswerToQuestion = function () {
    let indexOfClickedQuestion = allQuestions.findIndex(one => one === this)

    allQuestions.forEach(one => one.style.backgroundColor = 'transparent')
    this.style.backgroundColor = '#ddd'


    answerContainer.textContent = ''
    answerContainer.textContent = helpMessages[indexOfClickedQuestion].answer

  }

  allQuestions.forEach(one => one.addEventListener('click', showAnswerToQuestion))
}

initHelp()