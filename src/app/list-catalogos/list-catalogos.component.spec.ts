import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatalogosComponent } from './list-catalogos.component';

describe('ListCatalogosComponent', () => {
  let component: ListCatalogosComponent;
  let fixture: ComponentFixture<ListCatalogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCatalogosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
