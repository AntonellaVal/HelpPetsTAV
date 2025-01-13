import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAdopcionPage } from './form-adopcion.page';

describe('FormAdopcionPage', () => {
  let component: FormAdopcionPage;
  let fixture: ComponentFixture<FormAdopcionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
