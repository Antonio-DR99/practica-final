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
      // eslint-disable-next-line no-eval
      const result = eval(safeExpr);
      this.display = String(result ?? '');
    } catch (e) {
      this.display = 'Error';
    }
  }
}
