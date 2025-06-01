import { Album } from 'src/album/type/album';
import { Artist } from 'src/artist/type/artist';
import { Track } from 'src/track/type/track';

export interface FavoritesResponse {
  artists: Artist[] | [];
  albums: Album[] | [];
  tracks: Track[] | [];
}
