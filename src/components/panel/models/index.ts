export interface IPagePanelData {
    id: number
    slug: string
    title: string
}
export interface ICourseData {
    id: number
    title: string
    name: string
    type: "online" | "offline"
}
export interface Course {
    name: string
    title: string
    description: string
    type: "online" | "offline"
    price: string
}
