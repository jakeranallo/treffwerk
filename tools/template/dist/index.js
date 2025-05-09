import { createRoot } from 'react-dom/client';
import { Tool } from '@treffwerk/ui';
const TemplateTool = ({ settings, onSettingsChange }) => {
    return className = "p-4" >
        className;
    "text-2xl font-bold mb-4" > Template;
    Tool < /h1>
        < p;
    className = "text-gray-600 dark:text-gray-400" >
        This;
    is;
    a;
    template;
    tool.Replace;
    this;
    content;
    with (your)
        tool;
    's implementation.
        < /p>
        < /div>
        < /Tool>;
};
// Mount function that will be called by the shell
export function mount(element, props) {
    const root = createRoot(element);
    root.render({ ...props } /  > );
}
// Unmount function for cleanup
export function unmount(element) {
    const root = element._reactRootContainer;
    if (root) {
        root.unmount();
    }
}
