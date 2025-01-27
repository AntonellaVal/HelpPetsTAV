import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalesAdoptadosApiPage } from './animales-adoptados-api.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AnimalesAdoptadosApiPage', () => {
  let component: AnimalesAdoptadosApiPage;
  let fixture: ComponentFixture<AnimalesAdoptadosApiPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[HttpClient]
    });
    fixture = TestBed.createComponent(AnimalesAdoptadosApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
