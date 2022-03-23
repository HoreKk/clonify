export default class Item {
  name: string
  description?: string
  images: { url: string }[]
  type?: string

  constructor (name: string, description: string, type: string, images: { url: string }[]) {
    this.name = name
    this.description = description
    this.type = type
    this.images = images
  }
}