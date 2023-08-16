export interface FilterOptions {
  limit?: number;
  offset?: number;
  search?: string;
}

export type QueryOption = {
  $text: {
    $search: string
  }
};
