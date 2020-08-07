export interface Board {
  id: number;
  title: string;
  description?: string;
  view_count: number;
  public: boolean;
  created_at: number | Date;
  user_id: number;
  // Relation not always loaded.
  items?: BoardItem[];
  item_count?: number;
}

export interface BoardItem {
  id: number;
  title: string;
  url: string;
  snippet?: string;
  preview_image?: string;
  list_index: number;
  dateLastCrawled?: number | Date;
  created_at: number | Date;
  marked_for_delete?: boolean; // This param will never be sent from the backend and is purely for the single board edit. 
}