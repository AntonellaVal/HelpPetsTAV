import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalesEnAdopcionPage } from './animales-en-adopcion.page';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AnimalesEnAdopcionPage', () => {
  let component: AnimalesEnAdopcionPage;
  let fixture: ComponentFixture<AnimalesEnAdopcionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalesEnAdopcionPage],
      imports: [IonicModule.forRoot()],
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(AnimalesEnAdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
