import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class CalculadoraComponent {
  display = '';

  press(value: string) {
    if (value === 'C') {
      this.clear();
      return;
    }
    if (value === 'DEL') {
      this.display = this.display.slice(0, -1);
      return;
    }
    if (value === '=') {
      this.calculate();
      return;
    }
    this.display += value;
  }

  clear() {
    this.display = '';
  }

  calculate() {
    try {
      const safeExpr = this.display.replace(/[^0-9+\-*/(). ]/g, '');
      const result = this.evaluateExpression(safeExpr);
      this.display = String(result ?? '');
    } catch (e) {
      this.display = 'Error';
    }
  }

  private evaluateExpression(expr: string): number {
    const tokens = this.tokenize(expr);
    const rpn = this.shuntingYard(tokens);
    return this.evalRPN(rpn);
  }

  private tokenize(expr: string): string[] {
    const tokens: string[] = [];
    let i = 0;
    let prevType: 'number' | 'operator' | 'paren' | null = null;
    while (i < expr.length) {
      const ch = expr[i];
      if (ch === ' ') { i++; continue; }
      if (ch === '(' || ch === ')') {
        tokens.push(ch);
        prevType = 'paren';
        i++;
        continue;
      }
      if (/[+\-*/]/.test(ch)) {
        // handle unary minus
        if (ch === '-' && (prevType === null || prevType === 'operator' || (tokens.length > 0 && tokens[tokens.length-1] === '('))) {
          // unary minus: if next is number parse signed number, if next is '(', treat as 0 - (...)
          const next = expr[i+1];
          if (next === '(') {
            tokens.push('0');
            tokens.push('-');
            prevType = 'operator';
            i++;
            continue;
          }
          // parse signed number
          let j = i + 1;
          let num = '-';
          while (j < expr.length && /[0-9.]/.test(expr[j])) { num += expr[j]; j++; }
          tokens.push(num);
          prevType = 'number';
          i = j;
          continue;
        }
        tokens.push(ch);
        prevType = 'operator';
        i++;
        continue;
      }
      // number
      if (/[0-9.]/.test(ch)) {
        let j = i;
        let num = '';
        while (j < expr.length && /[0-9.]/.test(expr[j])) { num += expr[j]; j++; }
        tokens.push(num);
        prevType = 'number';
        i = j;
        continue;
      }
      // unknown char -> skip
      i++;
    }
    return tokens;
  }

  private shuntingYard(tokens: string[]): string[] {
    const output: string[] = [];
    const ops: string[] = [];
    const precedence: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2 };
    for (const token of tokens) {
      if (/^[0-9.\-]+$/.test(token) && !/^[-+*/]$/.test(token)) {
        output.push(token);
      } else if (token in precedence) {
        while (ops.length > 0) {
          const top = ops[ops.length - 1];
          if (top in precedence && precedence[top] >= precedence[token]) {
            output.push(ops.pop()!);
          } else break;
        }
        ops.push(token);
      } else if (token === '(') {
        ops.push(token);
      } else if (token === ')') {
        while (ops.length > 0 && ops[ops.length - 1] !== '(') {
          output.push(ops.pop()!);
        }
        if (ops.length === 0) throw new Error('Mismatched parentheses');
        ops.pop();
      } else {
        throw new Error('Invalid token: ' + token);
      }
    }
    while (ops.length > 0) {
      const op = ops.pop()!;
      if (op === '(' || op === ')') throw new Error('Mismatched parentheses');
      output.push(op);
    }
    return output;
  }

  private evalRPN(rpn: string[]): number {
    const stack: number[] = [];
    for (const token of rpn) {
      if (/^[+\-*/]$/.test(token)) {
        if (stack.length < 2) throw new Error('Invalid expression');
        const b = stack.pop()!;
        const a = stack.pop()!;
        let res = 0;
        switch (token) {
          case '+': res = a + b; break;
          case '-': res = a - b; break;
          case '*': res = a * b; break;
          case '/': res = a / b; break;
        }
        stack.push(res);
      } else {
        const n = Number(token);
        if (!Number.isFinite(n)) throw new Error('Invalid number ' + token);
        stack.push(n);
      }
    }
    if (stack.length !== 1) throw new Error('Invalid expression');
    return stack[0];
  }
}
