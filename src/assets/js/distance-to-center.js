export function distanceToCenter(elem){
  const viewHeight = window.innerHeight
  const viewWidth = window.innerWidth
  const viewMidY = viewHeight / 2
  const viewMidX = viewWidth / 2

  const elemRect = elem.getBoundingClientRect()
  const elemMidY = elemRect.top + elemRect.height / 2
  const elemMidX = elemRect.left + elemRect.width / 2

  const dtc = {
    top: elemMidY - viewMidY,
    left: elemMidX - viewMidX,
    elemWidth: elemRect.width,
    elemHeight: elemRect.height,
  }

  dtc.fractionY = 2 * dtc.top / dtc.elemHeight
  dtc.fractionX = 2 * dtc.left / dtc.elemWidth

  return dtc
}