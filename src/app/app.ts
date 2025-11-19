import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora';
import { CalculadoraGeometricaComponent } from './calculadora-geometrica/calculadora-geometrica';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CalculadoraComponent, CalculadoraGeometricaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Calculadoras: Aritmética y Geométrica');
}
