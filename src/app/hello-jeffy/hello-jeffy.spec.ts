import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HelloJeffy } from './hello-jeffy';

describe('HelloJeffy', () => {
  let component: HelloJeffy;
  let fixture: ComponentFixture<HelloJeffy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloJeffy],
      providers: [
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HelloJeffy);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle coolname signal from Earl to Jeffy and back', () => {
    expect(component.coolname()).toBe('Earl');
    component.changeName();
    expect(component.coolname()).toBe('Jeffy');
    component.changeName();
    expect(component.coolname()).toBe('Earl');
  });

  it('should toggle details visibility and compute correct button text', () => {
    expect(component.showDetails()).toBe(false);
    expect(component.detailsBtnText()).toBe('Show Details');

    component.toggleDetails();
    expect(component.showDetails()).toBe(true);
    expect(component.detailsBtnText()).toBe('Hide Details');
  });
});
