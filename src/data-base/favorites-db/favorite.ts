import { Tracks } from '../tracks-db/tracks-db';
import { Albums } from '../album-db/albums';
import { Artists } from '../artist-db/artists';

export const Favorites = {
  artists: [...Artists],
  albums: [...Albums],
  tracks: [...Tracks],
};
