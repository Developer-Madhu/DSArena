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
  restrictedLanguage?: string | null; // If set, only show this language (for track problems)
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

export function LanguageSelector({ value, onChange, disabled = false, restrictedLanguage }: LanguageSelectorProps) {
  // If restricted to a specific language (track problems), only show that language
  const availableLanguages = restrictedLanguage 
    ? SUPPORTED_LANGUAGES.filter(l => l.value === restrictedLanguage)
    : SUPPORTED_LANGUAGES;
  
  const selectedLang = SUPPORTED_LANGUAGES.find(l => l.value === value);

  // If restricted, disable the selector
  const isDisabled = disabled || !!restrictedLanguage;

  return (
    <Select value={value} onValueChange={onChange} disabled={isDisabled}>
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
        {availableLanguages.map((lang) => (
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