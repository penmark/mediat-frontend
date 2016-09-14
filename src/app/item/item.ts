export interface BinaryData {
  $type: string|number;
  $binary: string;
}

export interface Oid {
  $oid: string;
}

export interface Item {
  id: string;
  _id: Oid;
  thumbs?: {
    small: BinaryData,
    large: BinaryData
  },
  complete_name: string;
  title: string;
  tracks: any[];
  mimetype: string;
  tags: string[];
  created: Date;
  modified: Date;
  file_modified: Date;
  cover_data?: BinaryData;
  sha256: string;
  format: string;
  codec?: string;
  duration?: number;
  frame_rate?: number;
  file_size: number;
}
