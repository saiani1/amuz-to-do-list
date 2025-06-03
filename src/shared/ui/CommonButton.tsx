type CommonButtonType = React.ComponentProps<'button'> & {
  children: React.ReactNode | string;
};

export const CommonButton = ({ children, ...rest }: CommonButtonType) => {
  return (
    <button type={rest.type ?? 'button'} {...rest}>
      {children}
    </button>
  );
};
