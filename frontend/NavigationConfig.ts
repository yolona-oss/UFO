export interface NavigationItem {
        href: string
        path: string[]
        linkName: string
        children?: NavigationItem
}

const Navigation: NavigationItem[] = [
        {
                href: "#recording",
                path: [ "recording" ],
                linkName: "Запись"
        },
        {
                href: "#studio",
                path: [ "studio" ],
                linkName: "Студия"
        },
        {
                href: "#bits",
                path: [ "bits" ],
                linkName: "Биты"
        },
        {
                href: "#blog",
                path: [ "blog" ],
                linkName: "Блог"
        },
]

export default Navigation
