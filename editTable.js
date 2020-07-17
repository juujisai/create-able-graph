const editTableInit = function () {

  let editTableWindow = document.querySelector('.editTableWindow')
  let table = document.querySelector('table')

  let nagl = document.querySelector('tr:nth-of-type(1)')
  let cells = [...document.querySelectorAll('tr:not(:first-of-type)')]

  // color options
  let editTableNaglColorOptions = [...document.querySelectorAll('.colorPicker.table span')]
  let editTableLagnColorOptionsInput = document.querySelector('.colorPicker.table input')


  const changeColor = function () {
    let color;
    if (this.tagName.toLowerCase() === 'span') {
      color = this.dataset.color
    } else {
      color = this.value
    }
    nagl.style.backgroundColor = `${color}`

  }

  editTableLagnColorOptionsInput.addEventListener('change', changeColor)

  editTableNaglColorOptions.forEach(one => {
    one.addEventListener('click', changeColor)
  })


  // nagl options
  let isNagFat = false
  let isCellFat = false
  let isNagCursive = false
  let isCellCursive = false

  let nagStyleOptions = [...document.querySelectorAll('.nagStyle span')]

  let cellStyleOptions = [...document.querySelectorAll('.cellStyle span')]

  const changeNagCell = function () {
    if (this.classList.contains('makeFat')) {
      if (this.classList.contains('nag')) {
        isNagFat ? nagl.style.fontWeight = '300' : nagl.style.fontWeight = '700'
        isNagFat ? this.style.filter = `none` : this.style.filter = `invert(20%)`
        isNagFat = !isNagFat
      }
      if (this.classList.contains('cell')) {
        isCellFat ? cells.forEach(one => one.style.fontWeight = '300') : cells.forEach(one => one.style.fontWeight = '700')
        isCellFat ? this.style.filter = `none` : this.style.filter = `invert(20%)`
        isCellFat = !isCellFat
      }
    }

    if (this.classList.contains('makeCursive')) {
      if (this.classList.contains('nag')) {
        isNagCursive ? nagl.style.fontStyle = 'normal' : nagl.style.fontStyle = 'italic'
        isNagCursive ? this.style.filter = `none` : this.style.filter = `invert(20%)`
        isNagCursive = !isNagCursive
      }
      if (this.classList.contains('cell')) {
        isCellCursive ? cells.forEach(one => one.style.fontStyle = 'normal') : cells.forEach(one => one.style.fontStyle = 'italic')
        isCellCursive ? this.style.filter = `none` : this.style.filter = `invert(20%)`
        isCellCursive = !isCellCursive
      }
    }

    if (this.classList.contains('fontSize')) {
      let value;
      if (this.classList.contains('nag')) {
        value = document.getElementById('fzN').value
        nagl.style.fontSize = `${value}px`
      }

      if (this.classList.contains('cell')) {
        value = document.getElementById('fzC').value
        cells.forEach(one => one.style.fontSize = `${value}px`)
      }
    }
  }

  nagStyleOptions.forEach(one => one.addEventListener('click', changeNagCell))
  cellStyleOptions.forEach(one => one.addEventListener('click', changeNagCell))

}






