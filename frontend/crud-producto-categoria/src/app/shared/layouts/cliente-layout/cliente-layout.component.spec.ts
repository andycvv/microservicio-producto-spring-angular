import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteLayoutComponent } from './cliente-layout.component';

describe('ClienteLayoutComponent', () => {
  let component: ClienteLayoutComponent;
  let fixture: ComponentFixture<ClienteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
