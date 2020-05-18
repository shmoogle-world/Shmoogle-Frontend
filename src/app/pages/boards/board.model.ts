export interface Board {
  id: number;
  title: string;
  description?: string;
  view_count: number;
  public: boolean;
  created_at: number | Date;
  
  // Relation not always loaded.
  items?: BoardItem[]; 
}

export interface BoardItem {
  id: number;
  title: string;
  url: string;
  snippet?: string;
  preview_image?: string;
  dateLastCrawled?: number | Date;

}