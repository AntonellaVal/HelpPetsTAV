import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalesEnAdopcionPage } from './animales-en-adopcion.page';

describe('AnimalesEnAdopcionPage', () => {
  let component: AnimalesEnAdopcionPage;
  let fixture: ComponentFixture<AnimalesEnAdopcionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalesEnAdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
