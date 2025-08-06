export interface PageResponse <T>{
content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Page actuelle (0-indexed)
  last: boolean;
  first: boolean;
  empty: boolean;
  numberOfElements: number;
}
