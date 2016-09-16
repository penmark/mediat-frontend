
export interface IndexItem {
  title: string;
  mimetype: string;
  modified: Date | string;
}


export interface Track {
  height: number;
  width: number;
}

export interface Item extends IndexItem {
  thumbs?: {
    small: string,
    large: string
  },
  complete_name: string;
  tracks: Track[];
  tags: string[];
  created: Date | string;
  file_modified: Date | string;
  cover_data?: string;
  sha256: string;
  format: string;
  codec?: string;
  duration?: number;
  frame_rate?: number;
  file_size: number;
}

