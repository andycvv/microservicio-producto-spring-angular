import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCategoriasComponent } from './listar-categorias.component';

describe('ListarCategoriasComponent', () => {
  let component: ListarCategoriasComponent;
  let fixture: ComponentFixture<ListarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
