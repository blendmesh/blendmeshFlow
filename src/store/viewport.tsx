import {create } from 'zustand'
import { Position } from '../components/forms/Select';

type GeneralView = {
    panelPosition: string;
    snapToGrid: boolean;
    themeColor: string;
    snapGridSize: number;
    updatePanelPosition: (position: string) => void;
    updateSnapToGrid: (enable: boolean) => void;
    updateThemeColor: (theme: string) => void;
    updateSnapGridSize: (size: number) => void;
}

type Background = {
    variant: string;
    gridColor: string;
    gridSize: number;
    gridGap: number;
    lineWidth: number;
    enabled: boolean;
    updateVariant: (text: string) => void;
    updateGridColor: (color: string) => void;
    updateGridSize: (size: number) => void;
    updateGridGap: (number: number) => void;
    updateLineWidth: (width: number) => void;
    updateEnabled: (enable: boolean) => void;
}

type Minimap = {
    position: string;
    // nodeColor: string;
    nodeStrokeWidth: number;
    pannable: boolean;
    zoomable: boolean;
    updatePosition: (text: string) => void;
    // updateColor: (color: string) => void;
    updateStrokeWidth: (width: number) => void;
    updatePannable: (enable: boolean) => void;
    updateZoomable: (enable: boolean) => void;
}

type Control = {
    position: string;
    orientation: string;
    showZoom: boolean;
    showFitView: boolean;
    showInteractive: boolean;
    updatePosition: (text: string) => void;
    updateOrientation: (text: string) => void;
    updateShowZoom: (enable: boolean) => void;
    updateShowFitView: (enable: boolean) => void;
    updateShowInteractive: (enable: boolean) => void;
}

type Viewport = {
    background1: Background;
    background2: Background;
    minimap: Minimap;
    control: Control;
    generalView: GeneralView;
}

export const useViewportStore = create<Viewport>((set) => ({
    background1: {
        variant: "lines",
        gridColor: "#D0D0D0",
        gridGap: 48,
        gridSize: 2,
        lineWidth: 1,
        enabled: true,
        updateVariant: (text) => set((state) => ({
            background1: {
                ...state.background1,
                variant: text
            }
        })),
        updateGridColor: (color) => set((state) => ({
            background1: {
                ...state.background1,
                gridColor: color
            }
        })),
        updateGridSize: (size) => set((state) => ({
            background1: {
                ...state.background1,
                gridGap: size
            }
        })),
        updateGridGap: (number) => set((state) => ({
            background1: {
                ...state.background1,
                gridSize: number
            }
        })),
        updateLineWidth: (width) => set((state) => ({
            background1: {
                ...state.background1,
                lineWidth: width
            }
        })),
        updateEnabled: (enable) => set((state) => ({
            background1: {
                ...state.background1,
                enabled: enable
            }
        })),
    },
    background2: {
        variant: "lines",
        gridColor: "#F0F0F0",
        gridGap: 12,
        gridSize: 1,
        lineWidth: 1,
        enabled: false,
        updateVariant: (text) => set((state) => ({
            background2: {
                ...state.background2,
                variant: text
            }
        })),
        updateGridColor: (color) => set((state) => ({
            background2: {
                ...state.background2,
                gridColor: color
            }
        })),
        updateGridSize: (size) => set((state) => ({
            background2: {
                ...state.background2,
                gridGap: size
            }
        })),
        updateGridGap: (number) => set((state) => ({
            background2: {
                ...state.background2,
                gridSize: number
            }
        })),
        updateLineWidth: (width) => set((state) => ({
            background2: {
                ...state.background2,
                lineWidth: width
            }
        })),
        updateEnabled: (enable) => set((state) => ({
            background2: {
                ...state.background2,
                enabled: enable
            }
        })),
    },
    minimap: {
        position: "bottom-right",
        // nodeColor: "",
        nodeStrokeWidth: 1,
        pannable: false,
        zoomable: false,
        updatePosition: (text) => set((state) => ({
            minimap: {
                ...state.minimap,
                position: text
            }
        })),
        // updateColor: (color) => set((state) => ({
        //     minimap: {
        //         ...state.minimap,
        //         nodeColor: color
        //     }
        // })),
        updateStrokeWidth: (width) => set((state) => ({
            minimap: {
                ...state.minimap,
                nodeStrokeWidth: width
           } 
        })),
        updatePannable: (enable) => set((state) => ({
            minimap: {
                ...state.minimap,
                pannable: enable
            }
        })),
        updateZoomable: (enable) => set((state) => ({
            minimap: {
                ...state.minimap,
                zoomable: enable
            }
        })),
    },
    control:{
        position: "bottom-left",
        orientation: "vertical",
        showZoom: true,
        showFitView: true,
        showInteractive: true,
        updatePosition: (text) => set((state) => ({
            control: {
                ...state.control,
                position: text
            }
        })),
        updateOrientation: (text) => set((state) => ({
            control: {
                ...state.control,
                orientation: text
            }
        })),
        updateShowZoom: (enable) => set((state) => ({
            control: {
                ...state.control,
                showZoom: enable
            }
        })),
        updateShowFitView: (enable) => set((state) => ({
            control: {
                ...state.control,
                showFitView: enable
            }
        })),
        updateShowInteractive: (enable) => set((state) => ({
            control: {
                ...state.control,
                showInteractive: enable
            }
        })),
    },
    generalView:{
        panelPosition: "top-right",
        snapToGrid: false,
        themeColor: "light",
        snapGridSize: 12,
        updatePanelPosition: (position) => set((state) => ({
            generalView:{
                ...state.generalView,
                panelPosition: position
            }
        })),
        updateSnapToGrid: (enable) => set((state) => ({
            generalView: {
                ...state.generalView,
                snapToGrid: enable
            }
        })),
        updateThemeColor: (theme) => set((state) => ({
            generalView:{
                ...state.generalView,
                themeColor: theme
            }
        })),
        updateSnapGridSize: (size) => set((state) => ({
            generalView:{
                ...state.generalView,
                snapGridSize: size
            }
        })),
    }
    
}))