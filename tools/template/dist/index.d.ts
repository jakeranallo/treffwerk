interface ToolProps {
    settings: Record<string, any>;
    onSettingsChange: (settings: Record<string, any>) => void;
}
export declare function mount(element: HTMLElement, props: ToolProps): void;
export declare function unmount(element: HTMLElement): void;
export {};
