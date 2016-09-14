export interface BinaryData {
  $type: string|number;
  $binary: string;
}

export interface Oid {
  $oid: string;
}

export interface MongoDate {
  $date: number;
}

export interface IndexItem {
  id: string;
  _id: Oid;
  title: string;
  mimetype: string;
  modified: Date | MongoDate;
}


export interface Track {
  height: number;
  width: number;
}

export interface Item extends IndexItem {
  thumbs?: {
    small: BinaryData,
    large: BinaryData
  },
  complete_name: string;
  tracks: Track[];
  tags: string[];
  created: Date | MongoDate;
  file_modified: Date | MongoDate;
  cover_data?: BinaryData;
  sha256: string;
  format: string;
  codec?: string;
  duration?: number;
  frame_rate?: number;
  file_size: number;
}

