import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarEliminarAnimalPage } from './modificar-eliminar-animal.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModificarEliminarAnimalPage', () => {
  let component: ModificarEliminarAnimalPage;
  let fixture: ComponentFixture<ModificarEliminarAnimalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarEliminarAnimalPage],
      imports: [IonicModule.forRoot()],
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(ModificarEliminarAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
