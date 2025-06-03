type CommonInputType = React.ComponentProps<'input'> & {
  className?: string;
};

export const CommonInput = ({ className, ...rest }: CommonInputType) => {
  return (
    <input
      {...rest}
      type={rest.type ?? 'text'}
      className={`${className ?? ''} focus:outline-none`}
    />
  );
};
