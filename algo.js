


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

    let removeEnters = text.replace(/\s+/g, 'newRow')

    let array = []
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
    d.map(row => {

      const createTr = document.createElement('tr')

      const tr = htmlTable.appendChild(createTr)



      for (let i = 0; i < row.length; i++) {
        const createTd = document.createElement('td')

        if (row === d[0]) {
          tr.appendChild(createTd).innerHTML = row[i]

        } else {

          let a = (row[i])
          // a.replace('ã', 'ń')

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
    chartArea.classList.toggle('active')

    const type = document.getElementById('type').value
    const select1 = document.getElementById('option1').value
    const select2 = document.getElementById('option2').value

    const indexOfSelect1 = naglowkiTxt.findIndex(naglowek => naglowek === select1)
    const indexOfSelect2 = naglowkiTxt.findIndex(naglowek => naglowek === select2)

    const tdForSelect1 = [...document.querySelectorAll(`table tr td:nth-of-type(${indexOfSelect1 + 1})`)]
    const valuesForSelect1 = []
    tdForSelect1.forEach(td => td = valuesForSelect1.push(td.innerHTML * 1))
    valuesForSelect1.splice(0, 1)

    const tdForSelect2 = [...document.querySelectorAll(`table tr td:nth-of-type(${indexOfSelect2 + 1})`)]
    const valuesForSelect2 = []
    tdForSelect2.forEach(td => td = valuesForSelect2.push(td.innerHTML * 1))
    valuesForSelect2.splice(0, 1)






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

    for (let i = 0; i < newDivHeight.length; i++) {
      let div = document.createElement('div')
      div.classList.add('chartDotted')
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
          console.log('d')
          pathString += `${x} ${y}L  `
        } else {
          console.log('dd')
          pathString += `${x} ${y}`
        }


      }

    }



    console.log(pathString)



    // pathString += `Z`

    const svg = document.createElement('div')
    svg.classList.add('svg')
    svg.innerHTML = `<svg width="${areaData.width}" height="${areaData.height}" viewBox="0 0 ${areaData.width} ${areaData.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="${pathString}" stroke="green"/>
    </svg>`
    area.appendChild(svg)

  }


  buttonStartDrawing.addEventListener('click', drawChart)



}






