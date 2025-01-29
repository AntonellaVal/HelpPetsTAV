import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarContraPage } from './modificar-contra.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModificarContraPage', () => {
  let component: ModificarContraPage;
  let fixture: ComponentFixture<ModificarContraPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarContraPage],
      imports: [IonicModule.forRoot()],
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(ModificarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
