export interface Size {
  width: number
  height: number
}

export const calculateViewSize = (targetSize: Size, viewportSize: Size): Size => {
  const w =
    viewportSize.width > viewportSize.height
      ? (viewportSize.width * targetSize.height) / viewportSize.height
      : (viewportSize.width * targetSize.width) / viewportSize.height

  const h =
    viewportSize.width > viewportSize.height
      ? (viewportSize.height * targetSize.width) / viewportSize.width
      : (viewportSize.height * targetSize.height) / viewportSize.width

  const scale = Math.max(w / viewportSize.width, h / viewportSize.height)

  return {
    width: Math.ceil(viewportSize.width * scale),
    height: Math.ceil(viewportSize.height * scale),
  }
}

export const randomItem = <T>(array: Array<T>): T => {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}
