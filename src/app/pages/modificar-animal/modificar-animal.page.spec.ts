import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarAnimalPage } from './modificar-animal.page';

describe('ModificarAnimalPage', () => {
  let component: ModificarAnimalPage;
  let fixture: ComponentFixture<ModificarAnimalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
