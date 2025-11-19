import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalculadoraComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('practica-2-despliegue');
}
