import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBalbums } from 'src/DBalbum';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  create(createAlbumDto: CreateAlbumDto) {
    try{
      let album: Album;
      album.id = uuidv4();
      const objLengthAlbum = Object.keys(album).length;
      if (objLengthAlbum === 4) {
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
    DBalbums.splice(DBalbums.indexOf(album), 1)
    return album;
  }
}
