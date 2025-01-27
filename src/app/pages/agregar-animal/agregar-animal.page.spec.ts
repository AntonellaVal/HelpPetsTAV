import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAnimalPage } from './agregar-animal.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarAnimalPage', () => {
  let component: AgregarAnimalPage;
  let fixture: ComponentFixture<AgregarAnimalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarAnimalPage],
      imports: [IonicModule.forRoot()],
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(AgregarAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
