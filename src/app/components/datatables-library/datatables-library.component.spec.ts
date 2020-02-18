import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesLibraryComponent } from './datatables-library.component';

describe('DatatablesLibraryComponent', () => {
  let component: DatatablesLibraryComponent;
  let fixture: ComponentFixture<DatatablesLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatablesLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
