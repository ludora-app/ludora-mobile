import { list } from 'radash';
import { Fragment } from 'react';
import { cn } from '@chillui/ui';

import { BoxRow } from '../box';
import { ProgressStepperProps } from '../../types/progress-stepper.types';
import { ProgressStepperCircle } from './progress-stepper-circle.component';
import { ProgressStepperConnector } from './progress-stepper-connector.component';

const DEFAULT_NUMBER_OF_STEPS = 5;

export const ProgressStepper = (props: ProgressStepperProps) => {
  const { activeStep, className, numberOfSteps = DEFAULT_NUMBER_OF_STEPS } = props;

  return (
    <BoxRow className={cn('items-center justify-center', className)}>
      {list(1, numberOfSteps).map(step => (
        <Fragment key={step}>
          <ProgressStepperCircle step={step} activeStep={activeStep} />
          {step < numberOfSteps && <ProgressStepperConnector step={step} activeStep={activeStep} />}
        </Fragment>
      ))}
    </BoxRow>
  );
};
