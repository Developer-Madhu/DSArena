
import sys

def check_balance(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    stack = []
    
    i = 0
    line = 1
    col = 1
    
    while i < len(content):
        char = content[i]
        
        # Track line/col
        if char == '\n':
            line += 1
            col = 0
        
        # Handle comments
        if char == '/' and i + 1 < len(content):
            if content[i+1] == '/':
                # Single line
                while i < len(content) and content[i] != '\n':
                    i += 1
                line += 1
                col = 0
                i += 1
                continue
            elif content[i+1] == '*':
                # Multi line
                i += 2
                col += 2
                while i + 1 < len(content) and not (content[i] == '*' and content[i+1] == '/'):
                    if content[i] == '\n':
                        line += 1
                        col = 0
                    else:
                        col += 1
                    i += 1
                i += 2
                col += 2
                continue
        
        if char in '{[(':
            stack.append((char, line, col))
        elif char in '}])':
            if not stack:
                print(f"Error: Unexpected closing {char} at line {line} col {col}")
                return
            
            last, last_line, last_col = stack.pop()
            expected = '{' if char == '}' else '[' if char == ']' else '('
            if last != expected:
                print(f"Error: Mismatched closing {char} at line {line} col {col}. Expected closing matching {last} from line {last_line} col {last_col}")
                return
        
        i += 1
        col += 1

    if stack:
        print("Error: Unclosed brackets:")
        for char, l, c in stack:
            print(f"  {char} from line {l} col {c}")
    else:
        print("Brackets are balanced.")

if __name__ == '__main__':
    check_balance(sys.argv[1])
