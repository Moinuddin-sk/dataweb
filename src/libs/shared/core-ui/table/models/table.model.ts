export interface CustomeRowComponentProps<T, K> {
  data: T;
  accessLabel: K;
}

export interface HeaderProps<T, K> {
  field: K;
  label: string;
  align?: "left" | "center" | "right";
  restrictColumn?: boolean;
  hideColumn?: boolean;
  hideSort?: boolean;
  copyText?: boolean;
  formatter?: string;
  cssClass?: string;
  Component?: ({
    data,
    accessLabel,
  }: CustomeRowComponentProps<T, K>) => JSX.Element;
  selector?: (data: T) => string | number;
  fixed?: "left" | "right";
  headerInfo?: string;
  groupLabel?: string;
}

export interface RowRenderComponentProps<T, K> {
  field: K;
  copyText?: boolean;
  data: T;
  value: string;
  formatter?: string;
  Component?: ({
    data,
    accessLabel,
  }: CustomeRowComponentProps<T, K>) => JSX.Element;
  selector?: (data: T) => string | number;
}

export interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onPagination?: (page: number) => void;
  onRowsPerPage?: (page: number) => void;
  removeBorder?: boolean;
}
export interface TableSortProps<K> {
  field?: keyof K;
  order: 1 | -1;
}

export interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onPagination?: (page: number) => void;
  onRowsPerPage?: (page: number) => void;
}

export interface TableChildProps<T> {
  data: T;
}
export interface TableProps<T, K extends keyof T> {
  headers: Array<HeaderProps<T, K>>;
  data: Array<T>;
  noDataTitle?: string;
  uniqueKey: keyof T;
  pagination?: PaginationProps;
  loader?: boolean;
  onSelect?: (data: T | T[]) => void;
  selected?: Array<T>;
  childrenKey?: keyof T;
  TableChild?: ({ data }: TableChildProps<T>) => JSX.Element;
  title?: string;
  intentValue?: string[];
  loading?: boolean;
  onIntentSelect?: (value: string[]) => void;
}
