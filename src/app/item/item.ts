export interface Item {
  id: string;
  thumbs: {
    small: {$binary: string},
    large: {$binary: string}
  },
  complete_name: string;
  title: string;
  tracks: any[];
  mimetype: string;
  tags: string[];
  created: Date;
  modified: Date;
  file_modified: Date;
}
