export default class Item {
  name: string
  description?: string
  images: { url: string, width: number, height: number }[]
  type?: string
  artists?: { name: string }[]

  constructor (name: string, description: string, type: string, images: { url: string, width: number, height: number }[], artists?: { name: string }[]) {
    this.name = name
    this.description = description
    this.type = type
    this.images = images
    this.artists = artists
  }
}