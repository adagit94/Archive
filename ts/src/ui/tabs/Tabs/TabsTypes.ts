export enum TabsSizing {
    Container,
    Content,
}

export type TabConf = { title: string; render: () => React.ReactNode }

export type TabsProps = {
    itemsConfs: TabConf[]
    itemsElements: React.ReactNode[]
    activeItemIndex: number
    sizing?: TabsSizing
}
