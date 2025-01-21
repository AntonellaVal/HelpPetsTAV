import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalesAdoptadosApiPage } from './animales-adoptados-api.page';

describe('AnimalesAdoptadosApiPage', () => {
  let component: AnimalesAdoptadosApiPage;
  let fixture: ComponentFixture<AnimalesAdoptadosApiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalesAdoptadosApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
