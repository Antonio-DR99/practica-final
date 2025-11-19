import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Shape = 'circle' | 'rectangle' | 'square' | 'triangle';

@Component({
  selector: 'app-calculadora-geometrica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculadora-geometrica.html',
  styleUrls: ['./calculadora-geometrica.css'],
})
export class CalculadoraGeometricaComponent {
  selected: Shape = 'circle';

  radius = '';
  width = '';
  height = '';
  side = '';
  a = '';
  b = '';
  c = '';

  resultArea: string | null = null;

  setShape(s: string) {
    this.selected = s as Shape;
    this.clearResults();
  }

  clearResults() {
    this.resultArea = null;
  }

  parse(v: string) {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : NaN;
  }

  calculate() {
    this.clearResults();
    switch (this.selected) {
      case 'circle': {
        const r = this.parse(this.radius);
        if (isNaN(r) || r < 0) {
          this.resultArea = 'Entrada inválida';
          return;
        }
        const area = Math.PI * r * r;
        this.resultArea = area.toFixed(4);
        return;
      }
      case 'rectangle': {
        const w = this.parse(this.width);
        const h = this.parse(this.height);
        if (isNaN(w) || isNaN(h) || w < 0 || h < 0) {
          this.resultArea = 'Entrada inválida';
          return;
        }
        const area = w * h;
        this.resultArea = area.toFixed(4);
        return;
      }
      case 'square': {
        const s = this.parse(this.side);
        if (isNaN(s) || s < 0) {
          this.resultArea = 'Entrada inválida';
          return;
        }
        this.resultArea = (s * s).toFixed(4);
        return;
      }
      case 'triangle': {
        const base = this.parse(this.width);
        const height = this.parse(this.height);
        if (!isNaN(base) && !isNaN(height) && base >= 0 && height >= 0) {
          const area = 0.5 * base * height;
          this.resultArea = area.toFixed(4);
        } else {
          this.resultArea = 'Proporcione base y altura válidas';
        }
        return;
      }
    }
  }

  resetInputs() {
    this.radius = '';
    this.width = '';
    this.height = '';
    this.side = '';
    this.a = '';
    this.b = '';
    this.c = '';
    this.clearResults();
  }
}
