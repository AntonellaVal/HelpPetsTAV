import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAnimalPage } from './agregar-animal.page';

describe('AgregarAnimalPage', () => {
  let component: AgregarAnimalPage;
  let fixture: ComponentFixture<AgregarAnimalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
