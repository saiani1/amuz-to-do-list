export type CustomAlertType = {
  heading: string | JSX.Element;
  desc?: string;
  confirm?: () => void;
};
