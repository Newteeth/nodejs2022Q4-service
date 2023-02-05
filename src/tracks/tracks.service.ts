import { Injectable, Req, Res } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBtracks } from 'src/DBtracks';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto): CreateTrackDto | null {
    try {

      const artistByID = new ArtistsService;
      const artist = artistByID;
      const track: Track = {
        artistId: createTrackDto.artistId,
        name: createTrackDto.name,
        albumId: createTrackDto.albumId,
        duration: createTrackDto.duration,
        id: uuidv4()
      };      
      const objLength = Object.keys(track).length;
      if (objLength === 5) {
        DBtracks.push(track);
        return track;
      } else {
        return null;
      }       
    } catch {
      throw new Error;
    }
  }

  findAll() {
    return DBtracks;
  }

  findOne(id: string) {
    const trackId = id;
    const track: Track = DBtracks.find(({ id }) => id === trackId);
    if (!track) {
      return null;
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackUpdate = updateTrackDto;
    let track: Track = this.findOne(id);
    if (!track) {
      return null;
    }
    track.albumId = updateTrackDto.albumId;
    track.artistId = updateTrackDto.artistId;
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    return track;
  }

  remove(id: string) {
    const track: Track = this.findOne(id);
    DBtracks.splice(DBtracks.indexOf(track), 1);
    return track;
  }
}
