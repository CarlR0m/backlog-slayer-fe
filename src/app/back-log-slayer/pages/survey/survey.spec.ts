import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Survey} from './survey';


describe('Survey', () => {
  let component: Survey;
  let fixture: ComponentFixture<Survey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Survey]
    }).compileComponents();

    fixture = TestBed.createComponent(Survey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start at step 0', () => {
    expect(component.step).toBe(0);
  });

  it('should navigate to next and previous steps', () => {
    component.nextStep();
    expect(component.step).toBe(1);
    component.prevStep();
    expect(component.step).toBe(0);
  });

  it('should select an option', () => {
    component.selectOption('tiempo', { label: '1 hora', value: '60min' });
    expect(component.form.get('tiempo')?.value).toBe('1 hora');
  });

  it('should output final selections', () => {
    component.selectOption('tiempo', { label: '1 hora', value: '60min' });
    component.step = component.steps.length - 1;
    component.confirm();
    expect(window.alert).toHaveBeenCalledWith(JSON.stringify(component.form.value, null, 2));
  });
});