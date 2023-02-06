import { forwardRef, Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBalbums } from 'src/DBalbum';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService) {}

  create(createAlbumDto: CreateAlbumDto) {
    
    try{
      const album: Album = {
        id: uuidv4(),
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: createAlbumDto.artistId
      };
      
      const objLengthAlbum = Object.keys(album).length;
      if (objLengthAlbum <= 4) {
        DBalbums.push(album);
        return album;
      } else {
        return null;
      }
    }
    catch{
      throw new Error;
    }
  }

  findAll() {
    return DBalbums;
  }

  findOne(id: string) {
    const albumId = id;
    const album: Album = DBalbums.find(({ id }) => id === albumId);
    if (!album) {
      return null;
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album: Album = this.findOne(id);
    if (!album) {
      return null;
    }
    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  remove(id: string) {
    const album: Album = this.findOne(id);
    const trackById = this.tracksService.findAll()
    const albumIdFoundTrack = trackById.find(elem => elem.albumId === id);
    if (albumIdFoundTrack) {      
      albumIdFoundTrack.albumId = null;
      DBalbums.splice(DBalbums.indexOf(album), 1);
      return album;
    } else {
      DBalbums.splice(DBalbums.indexOf(album), 1);
      return album;
    }    
  }
}
