import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { DBalbums } from 'src/DBalbum';
import { DBartists } from 'src/DBartist';
import { DBfavorites } from 'src/DBfavorites';
import { DBtracks } from 'src/DBtracks';
import { Track } from 'src/tracks/entities/track.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  create(createFavoriteDto: CreateFavoriteDto, id: string, url: string) {
    const reqectId = id;
    if (url === 'track') {
      const track: Track = DBtracks.find(({ id }) => id === reqectId);
      if (!track) {
        return null;
      } else {
        const trackId = track.id;
        return DBfavorites.tracks.push(trackId);
      }
    }
    if(url === 'album') {
      const album: Album = DBalbums.find(({ id }) => id === reqectId);
      if (!album) {
        return null;
      } else {
        const albumId = album.id;
        return DBfavorites.tracks.push(albumId);
      }
    }
    if(url === 'artist') {
      const artist: Artist = DBartists.find(({ id }) => id === reqectId);
      if (!artist) {
        return null;
      } else {
        const artistId = artist.id;
        return DBfavorites.tracks.push(artistId);
      }
    }    
  }

  findAll() {
    return DBfavorites;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
