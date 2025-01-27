import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarCuentaPage } from './modificar-cuenta.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModificarCuentaPage', () => {
  let component: ModificarCuentaPage;
  let fixture: ComponentFixture<ModificarCuentaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarCuentaPage],
      imports: [IonicModule.forRoot()],
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(ModificarCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
