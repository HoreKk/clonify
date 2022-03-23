export default class Item {
  name: string
  type: string
  images: { url: string }[]

  constructor (name: string, type: string, images: { url: string }[]) {
    this.name = name
    this.type = type
    this.images = images
  }
}