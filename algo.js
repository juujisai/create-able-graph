
// import data from file

let dataFromFile;
const openFile = function (event) {
  let input = event.target
  const reader = new FileReader()
  reader.onload = function () {
    let text = reader.result
    // console.log(text)
    // dataFromFile = text
    tableFunction(text)
    // document.querySelector('.inputValueContainer').textContent = text
    return text
  }
  reader.readAsText(input.files[0]);

}



// let url = 'ddd2.csv'

// const fetchDataIntoVariable = (url) => {
//   let abc;

//   const xhr = new XMLHttpRequest()

//   xhr.open('GET', url, false)
//   xhr.onload = function () {
//     abc = xhr.response
//   }
//   xhr.send()
//   return abc
// }


// let a = fetchDataIntoVariable(url)


const tableFunction = function (text) {




  const makeObjectsFromFetchedData = (text) => {
    // split text after enter in csv
    let removeEnters = text.replace(/\s+/g, 'newRow')

    let array = []
    // split data in rows
    removeEnters.split('newRow').forEach(split => {
      array.push(split.split(';'))
    })

    return array.slice(0, -1)

  }


  let d = makeObjectsFromFetchedData(text)



  const csvContainer = document.getElementById('csv')

  csvContainer.style.display = 'block'

  const createTable = (d) => {

    const newTable = document.createElement('table')
    csvContainer.appendChild(newTable)

    const rows = d.length
    const cols = d[0].length
    // console.log(rows, cols)


    const htmlTable = document.querySelector('table')
    htmlTable.innerHTML = ''


    // creating rows
    d.map(row => {

      const createTr = document.createElement('tr')

      const tr = htmlTable.appendChild(createTr)


      // creating cells for rows
      for (let i = 0; i < row.length; i++) {
        const createTd = document.createElement('td')

        if (row === d[0]) {
          tr.appendChild(createTd).innerHTML = row[i]

        } else {

          let a = (row[i])
          // a.replace('ã', 'ń')
          // check if string
          if ((a.toLowerCase()).includes('a') || (a.toLowerCase()).includes('ą') || (a.toLowerCase()).includes('o') || (a.toLowerCase()).includes('e') || (a.toLowerCase()).includes('ę') || (a.toLowerCase()).includes('u') || (a.toLowerCase()).includes('y') || (a.toLowerCase()).includes('i')) {
            tr.appendChild(createTd).innerHTML = row[i]
          } else {
            tr.appendChild(createTd).innerHTML = Number(a.replace(',', '.')).toFixed(1)

          }
        }


      }

    })

    const allTrs = [...document.querySelectorAll('tr')]
    // console.log(allTrs)

  }

  createTable(d)
  chart()
}



const chart = function () {
  const chartDiv = document.querySelector('.chart')
  chartDiv.classList.add('active')


  const naglowki = [...document.querySelectorAll('tr:nth-of-type(1) td')]

  const naglowkiTxt = naglowki.map(one => one.innerHTML)


  const chartOption = [document.querySelector('.option1'), document.querySelector('.option2')]


  // add all values to option input
  chartOption.forEach(one => {

    for (let i = 0; i < naglowkiTxt.length; i++) {

      one.innerHTML += `<option value="${naglowkiTxt[i]}">${naglowkiTxt[i]}</option>`

    }



  })



  // console.log(naglowkiTxt)

  const buttonDrawChart = document.querySelector('.drawChart')
  buttonDrawChart.addEventListener('click', () => {
    const chartMenu = document.querySelector('.chartMenu')
    chartMenu.classList.toggle('active')
  })




  // rysowanie i pobranie wartości 

  const buttonStartDrawing = document.querySelector('.startDrawing')


  const drawChart = function () {

    const chartArea = document.querySelector('.chartDrawing')
    chartArea.classList.add('active')

    const type = document.getElementById('type').value.toLowerCase()
    const select1 = document.getElementById('option1').value
    const select2 = document.getElementById('option2').value

    // check the id of selected option
    const indexOfSelect1 = naglowkiTxt.findIndex(naglowek => naglowek === select1)
    const indexOfSelect2 = naglowkiTxt.findIndex(naglowek => naglowek === select2)

    // collect values in select1 column
    const tdForSelect1 = [...document.querySelectorAll(`table tr td:nth-of-type(${indexOfSelect1 + 1})`)]
    const valuesForSelect1 = []
    const clearValuesForSelect1 = []
    tdForSelect1.forEach(td => td = clearValuesForSelect1.push(td.innerHTML))
    tdForSelect1.forEach(td => td = valuesForSelect1.push(td.innerHTML * 1))
    // remove first cell - its a label
    valuesForSelect1.splice(0, 1)
    clearValuesForSelect1.splice(0, 1)

    // collect values in select2 column

    const tdForSelect2 = [...document.querySelectorAll(`table tr td:nth-of-type(${indexOfSelect2 + 1})`)]
    const valuesForSelect2 = []
    const clearValuesForSelect2 = []
    tdForSelect2.forEach(td => td = clearValuesForSelect2.push(td.innerHTML))
    tdForSelect2.forEach(td => td = valuesForSelect2.push(td.innerHTML * 1))
    // remove first cell - its a label
    valuesForSelect2.splice(0, 1)
    clearValuesForSelect2.splice(0, 1)


    let xmax = Math.max(...valuesForSelect1)
    let ymax = Math.max(...valuesForSelect2)


    const area = document.querySelector('.chartDrawing')

    const areaData = {
      width: area.clientWidth,
      height: area.clientHeight,
    }

    const areaJedn = {
      width: areaData.width / xmax,
      height: areaData.height / ymax,
    }

    const newDivWidth = []
    valuesForSelect1.forEach(div => newDivWidth.push(div * 100 / xmax))
    const newDivHeight = []
    valuesForSelect2.forEach(div => newDivHeight.push(div * 100 / ymax))
    let pathString = `M`

    if (type === 'kropkowy') {
      chartArea.classList.remove('slupkowy')

      if (Number.isNaN(valuesForSelect1[0]) || Number.isNaN(valuesForSelect2[0])) {
        chartArea.classList.remove('active')

        return alert('nie można wybrać wartości tekstowych do wykresu kropkowego')
      }


      for (let i = 0; i < newDivHeight.length; i++) {
        // create labels

        let span1 = document.createElement('span')
        let span2 = document.createElement('span')

        span1.classList.add('labelX')
        span2.classList.add('labelY')

        span1.textContent = `${valuesForSelect1[i]}`
        span2.textContent = `${valuesForSelect2[i]}`


        let div = document.createElement('div')
        div.classList.add('chartDotted')

        div.appendChild(span1)
        div.appendChild(span2)

        div.style.width = `${newDivWidth[i]}%`
        div.style.height = `${newDivHeight[i]}%`
        area.appendChild(div)

        let div2 = document.createElement('div')
        div2.classList.add('circle')
        div2.style.left = `${newDivWidth[i]}%`
        div2.style.bottom = `${newDivHeight[i]}%`
        area.appendChild(div2)

        if (i >= 0) {
          let x = (newDivWidth[i] * areaData.width / 100).toFixed(1)
          let y = (areaData.height - newDivHeight[i] * areaData.height / 100 + 5).toFixed(1)
          // 5 dodano na sztywno - można zmienić

          if (i < newDivHeight.length - 1) {
            pathString += `${x} ${y}L  `
          } else {
            pathString += `${x} ${y}`
          }
        }
      }
      const svg = document.createElement('div')
      svg.classList.add('svg')
      svg.innerHTML = `<svg width="${areaData.width}" height="${areaData.height}" viewBox="0 0 ${areaData.width} ${areaData.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="${pathString}" stroke="green"/>
    </svg>`
      area.appendChild(svg)
      // end of 'kropkowy'
    }
    if (type === 'slupkowy') {
      // chartArea = ''
      chartArea.classList.add('slupkowy')
      let test1 = (clearValuesForSelect1[0] * 1)
      let test2 = (clearValuesForSelect2[0] * 1)

      let typeOfFirstOption = Number.isNaN(test1) ? 'string' : 'number'

      let typeOfSecondOption = Number.isNaN(test2) ? 'string' : 'number'


      let graphLabel = typeOfFirstOption === 'string' ? clearValuesForSelect1 : clearValuesForSelect2
      let graphValue = typeOfFirstOption === 'number' ? clearValuesForSelect1 : clearValuesForSelect2

      if (typeOfFirstOption === 'number' && typeOfSecondOption === 'number') {
        graphLabel = clearValuesForSelect1
        graphValue = clearValuesForSelect2
      }

      if (typeOfFirstOption === 'string' && typeOfSecondOption === 'string') {
        return alert('nie można wybrać dwóch wartości tekstowych do utworzenia wykresu słupkowego')
      }


      let graphValueNumbers = []
      graphValue.forEach(value => graphValueNumbers.push(value * 1))


      console.log(graphLabel, graphValueNumbers)
      let maxValue = Math.max(...graphValueNumbers)
      let sectionHeight = maxValue / graphLabel.length

      console.log(graphValueNumbers, maxValue)


      for (let i = 0; i < graphLabel.length; ++i) {

        const div = document.createElement('div')

        div.classList.add('graphBars')

        div.style.width = `${areaData.width / graphLabel.length}px`
        div.style.height = `${graphValueNumbers[i] / maxValue * areaData.height}px`
        // console.log(graphValueNumbers[i] / maxValue * areaData.height, maxValue)
        // div.textContent = graphLabel[i]


        const div2 = document.createElement('div')
        div2.classList.add('graph')
        div2.style.width = `${20}%`
        div2.style.height = `${100}%`


        let span1 = document.createElement('span')
        let span2 = document.createElement('span')

        span1.classList.add('labelX')
        span2.classList.add('labelY')

        span1.textContent = `${graphLabel[i]}`
        span2.textContent = `${graphValueNumbers[i]}`

        div2.appendChild(span1)
        div2.appendChild(span2)

        div.appendChild(div2)
        chartArea.appendChild(div)



      }







    }


  }

  buttonStartDrawing.addEventListener('click', drawChart)

  const eraseDrawing = document.querySelector('.eraseDrawing')
  eraseDrawing.addEventListener('click', function () {
    document.querySelector('.chartDrawing').innerHTML = ''
  })





}






