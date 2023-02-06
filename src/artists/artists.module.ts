import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TracksService } from 'src/tracks/tracks.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, TracksService]
})
export class ArtistsModule {}
