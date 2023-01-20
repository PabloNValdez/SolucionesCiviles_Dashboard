export interface Trabajo{
    id: number,
    name: string,
    description: string,
    images: File[],
    deletedImages: ImageDto [],
    isDeleted: boolean
}

export interface ImageDto{
    id: number,
    filename: string, 
    path: string
}