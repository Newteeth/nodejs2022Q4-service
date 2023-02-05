import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
    public name?: string;
    public artistId?: string | null;
    public albumId?: string | null;
    public duration?: number;
}
