export interface PageResponse <T>{
content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; 
  last: boolean;
  first: boolean;
  empty: boolean;
  numberOfElements: number;
}
