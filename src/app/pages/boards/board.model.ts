export interface Board {
  id: number;
  title: string;
  description?: string;
  views: number;
  public: boolean;
  saves: number;
  created_at: number | Date;
  updated_at: number | Date;

  items?: BoardItem[]; 
}

export interface BoardItem {
  id: number;
  title: string;
  preview_image: string;
  ranking: number;
  created_at: number | Date;
  updated_at: number | Date;

}