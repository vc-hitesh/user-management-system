import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BeforeAuthGuard } from './before-auth.guard';

describe('BeforeAuthGuard', () => {
  let guard: BeforeAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(BeforeAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
