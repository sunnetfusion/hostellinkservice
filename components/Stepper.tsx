import { Check } from 'lucide-react';

interface Step {
  id: string;
  name: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {stepIdx < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-blue-600" />
                </div>
                <a href="#" className="relative w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-900">
                  <Check className="w-5 h-5 text-white" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            ) : stepIdx === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a href="#" className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-blue-600 rounded-full" aria-current="step">
                  <span className="h-2.5 w-2.5 bg-blue-600 rounded-full" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <a href="#" className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400">
                  <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </a>
              </>
            )}
             <p className="absolute -bottom-6 text-xs text-center w-28 -left-10 sm:left-auto sm:w-auto sm:relative sm:pt-2 sm:text-sm sm:font-medium sm:text-gray-900 dark:sm:text-gray-200">{step.name}</p>
          </li>
        ))}
      </ol>
    </nav>
  );
}