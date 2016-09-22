
export interface Track {
  height: number;
  width: number;
}

export interface Item {
  _id: string;
  title: string;
  mimetype: string;
  modified: Date | string;
  complete_name: string;
  thumbs?: {
    small: string,
    large: string
  },
  tracks?: Track[];
  tags?: string[];
  created?: Date | string;
  file_modified?: Date | string;
  cover_data?: string;
  sha256?: string;
  format?: string;
  codec?: string;
  duration?: number;
  frame_rate?: number;
  file_size?: number;
}

