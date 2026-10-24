import { TabsProps, TabsSizing } from "./TabsTypes"
import "./Tabs.scss"

function Tabs({
    itemsConfs,
    itemsElements,
    activeItemIndex,
    sizing = TabsSizing.Container,
}: TabsProps) {
    const activeItem = itemsConfs[activeItemIndex]

    return (
        <div className={`tabs${sizing === TabsSizing.Content ? " tabs--content-sizing" : ""}`}>
            <div className="tabs__panel">{itemsElements}</div>
            <div className="tabs__content">{activeItem?.render()}</div>
        </div>
    )
}

export default Tabs
