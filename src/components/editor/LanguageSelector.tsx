import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SUPPORTED_LANGUAGES = [
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚡' },
  { value: 'go', label: 'Go', icon: '🐹' },
  { value: 'rust', label: 'Rust', icon: '🦀' },
  { value: 'csharp', label: 'C#', icon: '💜' },
  { value: 'ruby', label: 'Ruby', icon: '💎' },
  { value: 'swift', label: 'Swift', icon: '🦅' },
  { value: 'kotlin', label: 'Kotlin', icon: '🎯' },
];

export function LanguageSelector({ value, onChange, disabled = false }: LanguageSelectorProps) {
  const selectedLang = SUPPORTED_LANGUAGES.find(l => l.value === value);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[160px] h-8 text-sm bg-muted border-border">
        <SelectValue>
          {selectedLang && (
            <span className="flex items-center gap-2">
              <span>{selectedLang.icon}</span>
              <span>{selectedLang.label}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <span className="flex items-center gap-2">
              <span>{lang.icon}</span>
              <span>{lang.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
