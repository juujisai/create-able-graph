const editGraphInit = function () {
  const labelY = [...document.querySelectorAll('.graph .labelY')]
  const labelPosition = document.getElementById('labelPosition')


  const changeLabelPos = function () {
    if (labelY.length > 0) {
      let pos = labelPosition.value
      let top;
      if (pos === 'top') {
        top = 00;
      } else if (pos === 'middle') {
        top = 50;
      } else if (pos === 'bottom') {
        top = 100
      }
      console.log(labelY, top)

      labelY.forEach(one => {
        one.style.top = `${top}%`
      })
    } else return
  }

  labelPosition.addEventListener('change', changeLabelPos)





  // color

  const colorSpans = [...document.querySelectorAll('.colorPicker span')]
  const colorInputs = [...document.querySelectorAll('.colorPicker input')]

  const slup2Color = [...document.querySelectorAll('.graphBars .graph')]
  const additionalLines2Color = [...document.querySelectorAll('.chartDotted')]
  const dot2Color = [...document.querySelectorAll('.circle')]

  const changeColorGraph = function () {
    let color;
    if (this.tagName.toLowerCase() === 'span') {
      color = this.dataset.color
    } else {
      color = this.value
    }

    let parent = this.parentNode.classList

    if (parent.contains('slup')) {
      console.log(slup2Color)
      slup2Color.forEach(one => one.style.backgroundColor = `${color}`)
    }
    if (parent.contains('additionalLines')) {
      console.log(additionalLines2Color)

      additionalLines2Color.forEach(one => one.style.borderColor = `${color}`)
    }
    if (parent.contains('dotPointsColor')) {
      console.log(dot2Color)

      dot2Color.forEach(one => {
        one.style.borderColor = `${color}`
        one.style.backgroundColor = `${color}`
      })
    }

  }

  colorSpans.forEach(one => one.addEventListener('click', changeColorGraph))
  colorInputs.forEach(one => one.addEventListener('change', changeColorGraph))

}






