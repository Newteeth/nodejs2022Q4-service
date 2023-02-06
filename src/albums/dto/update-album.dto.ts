import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {

    @IsString()
    readonly name?: string;

    @IsInt()
    readonly year?: number;

    @IsString()
    @IsOptional()
    readonly artistId?: string | null;
}
