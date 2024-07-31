export type Column = {
  title: string;
  field?: string;
  formatter?: (data: any) => string;
};
export type Action = {
  title: string;
  icon?: string;
  color?: string;
  type: string;
  permission?: string[];
};
