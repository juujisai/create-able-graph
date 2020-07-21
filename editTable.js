const editTableInit = function () {

  let editTableWindow = document.querySelector('.editTableWindow')
  let table = document.querySelector('table')

  let nagl = document.querySelector('tr:nth-of-type(1)')
  let cells = [...document.querySelectorAll('tr:not(:first-of-type) td')]

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




  // border for table

  const widthOptionForTable = document.getElementById('borderWidth')
  const widthOptionForCell = document.getElementById('cellBorderWidth')

  const borderStyleForTable = document.getElementById('typeOfLineTable')
  const borderStyleForCell = document.getElementById('typeOfLineTableCell')

  const borderColorForTable = [...document.querySelectorAll('.colorPicker.tableColor span')]
  const borderColorForTableInput = document.querySelector('.colorPicker.tableColor input')

  const borderColorForCell = [...document.querySelectorAll('.colorPicker.cellTColor span')]
  const borderColorForCellInput = document.querySelector('.colorPicker.cellTColor input')


  const borderColor = [...borderColorForTable, ...borderColorForCell]

  const widthRangeInput = [widthOptionForTable, widthOptionForCell, borderStyleForTable, borderStyleForCell, borderColorForTableInput, borderColorForCellInput]

  const changeBorder = function () {
    let type = this.dataset.type

    if (type === 'width') {
      if (this.classList.contains('table')) {
        table.style.borderWidth = `${widthOptionForTable.value}px`
      }
      if (this.classList.contains('cellT')) {
        cells.forEach(one => one.style.borderWidth = `${widthOptionForCell.value}px`)
      }
    }
    if (type === 'style') {
      if (this.classList.contains('table')) {
        table.style.borderStyle = `${borderStyleForTable.value}`
      }
      if (this.classList.contains('cellT')) {
        cells.forEach(one => one.style.borderStyle = `${borderStyleForCell.value}`)
      }
    }
    if (type === 'color') {
      let color;

      if (this.tagName.toLowerCase() === 'span') {
        color = this.dataset.color
      } else {
        color = this.value
      }

      if (this.classList.contains('table')) {
        table.style.borderColor = `${color}`
      }
      if (this.classList.contains('cellT')) {
        cells.forEach(one => one.style.borderColor = `${color}`)
      }
    }
  }

  widthRangeInput.forEach(one => one.addEventListener('change', changeBorder))
  borderColor.forEach(one => one.addEventListener('click', changeBorder))
}






