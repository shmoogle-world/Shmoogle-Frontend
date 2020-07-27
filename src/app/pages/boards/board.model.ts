export interface Board {
  id?: number;
  title: string;
  description?: string;
  view_count?: number;
  public: boolean;
  created_at?: number | Date;
  user_id?: number;
  // Relation not always loaded.
  items?: BoardItem[];
  item?: BoardItem;
  item_count?: number;
}

export interface BoardItem {
  id?: number;
  title: string;
  url: string;
  snippet?: string;
  preview_image?: string;
  list_index?: number;
  last_crawled?: number | Date;
  created_at?: number | Date;
}