import IDB from "data/Idb/Idb"

export const initStore = async (storeName: string) => {
    if (!IDB.storeExists(storeName)) {
        await IDB.createStore(storeName)
    }
}

export const getStoreData = async (storeName: string, recordId?: string) =>
    await IDB.get(storeName, recordId)
