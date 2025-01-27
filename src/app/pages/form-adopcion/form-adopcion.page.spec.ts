import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAdopcionPage } from './form-adopcion.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('FormAdopcionPage', () => {
  let component: FormAdopcionPage;
  let fixture: ComponentFixture<FormAdopcionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAdopcionPage],
      imports: [IonicModule.forRoot()],
      providers:[SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(FormAdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Debería devolver errorTelefono como false si el teléfono tiene el formato incorrecto', () => {
    component.telefono = '+56 912345678';  
    component.validarCampos();  
    expect(component.errorTelefono).toBeFalse();  
  });
});
