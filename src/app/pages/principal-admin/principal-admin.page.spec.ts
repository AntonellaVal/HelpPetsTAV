import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrincipalAdminPage } from './principal-admin.page';

describe('PrincipalAdminPage', () => {
  let component: PrincipalAdminPage;
  let fixture: ComponentFixture<PrincipalAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
