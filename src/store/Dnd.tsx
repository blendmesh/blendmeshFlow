import {create } from 'zustand'

type Dnd = {
    nodeType: string;
    setNodeType: (type: string) => void;
}

export const useDndStore = create<Dnd>((set) => ({
    nodeType: "",
    setNodeType: (type) => set(() => ({
        nodeType: type
    })),
}))