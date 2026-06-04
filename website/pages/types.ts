export type username = {
      id: number,
   username: string,
}

export type book = {
     id: number,
  title: string,
  imageUrl: string,
  description: string,
  author: Author,
} 

export type Author = {
  id: number,
  name: string,
}