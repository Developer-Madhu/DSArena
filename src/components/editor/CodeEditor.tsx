import { useRef, useState, useCallback, useEffect } from 'react';
import Editor, { OnMount, Monaco } from '@monaco-editor/react';
import { toast } from 'sonner';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = 'python',
  readOnly = false,
  height = '100%',
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const [lastLength, setLastLength] = useState(value.length);
  const [lastChangeTime, setLastChangeTime] = useState(Date.now());

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Disable paste functionality
    editor.onKeyDown((e: any) => {
      // Block Ctrl+V / Cmd+V
      if ((e.ctrlKey || e.metaKey) && e.keyCode === monaco.KeyCode.KeyV) {
        e.preventDefault();
        e.stopPropagation();
        toast.error('Pasting is disabled — please type your solution', {
          description: 'This helps ensure you understand and can write the code yourself.',
          duration: 3000,
        });
      }
    });

    // Configure editor settings
    editor.updateOptions({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      renderLineHighlight: 'line',
      automaticLayout: true,
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'on',
      bracketPairColorization: { enabled: true },
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
    });
  };

  const handleChange = useCallback(
    (newValue: string | undefined) => {
      if (newValue === undefined) return;

      const currentTime = Date.now();
      const timeDiff = currentTime - lastChangeTime;
      const lengthDiff = newValue.length - lastLength;

      // Detect suspicious paste-like behavior (>50 chars in <100ms)
      if (lengthDiff > 50 && timeDiff < 100) {
        toast.warning('Suspicious input detected', {
          description: 'Large blocks of text added quickly may be flagged.',
          duration: 3000,
        });
      }

      setLastLength(newValue.length);
      setLastChangeTime(currentTime);
      onChange(newValue);
    },
    [onChange, lastLength, lastChangeTime]
  );

  // Block paste events at DOM level
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.monaco-editor')) {
        e.preventDefault();
        toast.error('Pasting is disabled — please type your solution', {
          duration: 3000,
        });
      }
    };

    const handleDrop = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.monaco-editor')) {
        e.preventDefault();
        toast.error('Drag and drop is disabled', {
          duration: 3000,
        });
      }
    };

    document.addEventListener('paste', handlePaste, true);
    document.addEventListener('drop', handleDrop, true);

    return () => {
      document.removeEventListener('paste', handlePaste, true);
      document.removeEventListener('drop', handleDrop, true);
    };
  }, []);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-border bg-card">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
        }}
        loading={
          <div className="flex h-full items-center justify-center bg-card">
            <div className="text-muted-foreground">Loading editor...</div>
          </div>
        }
      />
    </div>
  );
}
