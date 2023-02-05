import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBartists } from 'src/DBartist';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto) {
    try {
      let artist: Artist;
      artist.id = uuidv4();
      const objLength = Object.keys(artist).length;
      if (objLength === 3) {
        DBartists.push(artist);
        return artist;
      } else {
        return null;
      }       
    } catch {
      throw new Error;
    }
  }

  findAll() {
    return DBartists;
  }

  findOne(id: string) {
    const artistId = id;
    const artist: Artist = DBartists.find(({ id }) => id === artistId);
    if (!artist) {
      return null;
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistkUpdate = updateArtistDto;
    let artist: Artist = this.findOne(id);
    if (!artist) {
      return null;
    }
    artist.grammy = updateArtistDto.grammy;
    artist.name = updateArtistDto.name;
    return artist;
  }

  remove(id: string) {
    const artist: Artist = this.findOne(id);
    DBartists.splice(DBartists.indexOf(artist), 1);
    return artist;
  }
}
