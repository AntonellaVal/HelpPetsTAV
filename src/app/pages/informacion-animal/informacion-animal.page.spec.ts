import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionAnimalPage } from './informacion-animal.page';

describe('InformacionAnimalPage', () => {
  let component: InformacionAnimalPage;
  let fixture: ComponentFixture<InformacionAnimalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
