export class NgEvent {
  post_title: string;
  post_excerpt: string;
  url: string;
  time: string;
  timestamp: number;
  id: number;
  end_time: string;
  date: string;
  location: string;
  color: string;
  tracks: NgTrack[];
  speakers: any[];
  thumbnail: boolean;
}

export class NgTrack {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  color: string;
}
