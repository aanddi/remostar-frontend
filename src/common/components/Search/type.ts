interface ISearchProps {
  title: string;
  totalCountFilter?: number;
  onOpenFilter?: () => void;
}

interface ISearch {
  searchField: string;
}

export type { ISearchProps, ISearch };
