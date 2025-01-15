import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarContraPage } from './modificar-contra.page';

describe('ModificarContraPage', () => {
  let component: ModificarContraPage;
  let fixture: ComponentFixture<ModificarContraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
