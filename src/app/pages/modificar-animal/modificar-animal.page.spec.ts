import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarAnimalPage } from './modificar-animal.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';

describe('ModificarAnimalPage', () => {
  let component: ModificarAnimalPage;
  let fixture: ComponentFixture<ModificarAnimalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarAnimalPage],
      imports: [IonicModule.forRoot()],
      providers: [SQLite,ActivatedRoute]
    }).compileComponents();
    fixture = TestBed.createComponent(ModificarAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
