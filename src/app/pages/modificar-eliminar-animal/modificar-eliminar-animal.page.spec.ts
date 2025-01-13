import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarEliminarAnimalPage } from './modificar-eliminar-animal.page';

describe('ModificarEliminarAnimalPage', () => {
  let component: ModificarEliminarAnimalPage;
  let fixture: ComponentFixture<ModificarEliminarAnimalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarEliminarAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
