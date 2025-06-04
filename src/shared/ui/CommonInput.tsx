import { forwardRef } from 'react';

type CommonInputType = React.ComponentProps<'input'> & {
  className?: string;
};

export const CommonInput = forwardRef<HTMLInputElement, CommonInputType>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        type={rest.type ?? 'text'}
        className={`${className ?? ''} focus:outline-none`}
      />
    );
  }
);
CommonInput.displayName = 'CommonInput';
