import { useState } from "react"
import Tabs from "../Tabs/Tabs"
import { TabConf, TabsSizing } from "../Tabs/TabsTypes"

export type BasicTabsProps = {
    items: TabConf[]
    index?: number
    initialIndex?: number
    sizing?: TabsSizing
    onTabChange?: (index: number) => void
}

// These tabs could be used anywhere where recovering correct tab index inside of previously focused editor isn't necessary. Could be used both inside of edit. panel and outside of it. That basically means any place with exception of top main panel of editor - for that use EditorTabs component.
function BasicTabs({
    items,
    initialIndex = 0,
    index,
    sizing = TabsSizing.Container,
    onTabChange,
}: BasicTabsProps) {
    const [activeItemIndex, setActiveItemIndex] = useState(initialIndex)

    index ??= activeItemIndex

    const itemsElements = items.map((tab, i) => (
        <div
            key={i}
            className={`tabs__tab${index === i ? " tabs__tab--active" : ""}`}
            onClick={() => {
                if (i !== index) {
                    setActiveItemIndex(i)
                    onTabChange?.(i)
                }
            }}
        >
            {tab.title}
        </div>
    ))

    return (
        <Tabs
            itemsConfs={items}
            itemsElements={itemsElements}
            activeItemIndex={activeItemIndex}
            sizing={sizing}
        />
    )
}

export default BasicTabs
