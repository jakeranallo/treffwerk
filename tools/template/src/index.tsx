import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { UI } from '@treffwerk/ui';

interface ToolProps {
  settings: Record<string, any>;
  onSettingsChange: (settings: Record<string, any>) => void;
}

const TemplateTool: React.FC<ToolProps> = ({ settings, onSettingsChange }) => {
  return (
    <UI>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Template Tool</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is a template tool. Replace this content with your tool's implementation.
        </p>
      </div>
    </UI>
  );
};

// Store the root instance
let rootInstance: Root | null = null;

// Mount function that will be called by the shell
export function mount(element: HTMLElement, props: ToolProps) {
  rootInstance = createRoot(element);
  rootInstance.render(<TemplateTool {...props} />);
}

// Unmount function for cleanup
export function unmount(element: HTMLElement) {
  if (rootInstance) {
    rootInstance.unmount();
    rootInstance = null;
  }
} 