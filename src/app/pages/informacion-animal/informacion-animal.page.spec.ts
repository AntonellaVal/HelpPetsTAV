import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionAnimalPage } from './informacion-animal.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('InformacionAnimalPage', () => {
  let component: InformacionAnimalPage;
  let fixture: ComponentFixture<InformacionAnimalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionAnimalPage],
      imports: [IonicModule.forRoot()],
      providers:[SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(InformacionAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
