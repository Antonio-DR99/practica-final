import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraGeometrica } from './calculadora-geometrica';

describe('CalculadoraGeometrica', () => {
  let component: CalculadoraGeometrica;
  let fixture: ComponentFixture<CalculadoraGeometrica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraGeometrica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadoraGeometrica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
