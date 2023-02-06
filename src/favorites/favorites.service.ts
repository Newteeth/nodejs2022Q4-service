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
  create(createFavoriteDto: CreateFavoriteDto, id: string) {
    const reqectId = id;
    const track: Track = DBtracks.find(({ id }) => id === reqectId);
    const album: Album = DBalbums.find(({ id }) => id === reqectId);
    const artist: Artist = DBartists.find(({ id }) => id === reqectId);
    
    if (track) {
      const trackId = track.id;
      return DBfavorites.tracks.push(trackId);
    }
    if (album) {
      const albumId = track.id;
      return DBfavorites.tracks.push(albumId);
    }
    if (artist) {
      const artistId = track.id;
      return DBfavorites.tracks.push(artistId);
    }
    if (!track || !album ||artist) {
      return null;
    }
  }

  findAll() {
    return `This action returns all favorites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
