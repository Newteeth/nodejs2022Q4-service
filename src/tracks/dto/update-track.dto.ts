import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
    @IsString()
    readonly name: string;
    
    @IsInt()
    readonly duration: number;

    @IsString()
    @IsOptional()
    readonly albumId: string | null;

    @IsString()
    @IsOptional()
    readonly artistId: string | null;
}
