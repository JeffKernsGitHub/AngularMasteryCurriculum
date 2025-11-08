import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloJeffy } from './hello-jeffy';

describe('HelloJeffy', () => {
  let component: HelloJeffy;
  let fixture: ComponentFixture<HelloJeffy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloJeffy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloJeffy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
