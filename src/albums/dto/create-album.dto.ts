import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
    
    @IsString()
    readonly name?: string;

    @IsInt()
    readonly year?: number;

    @IsString()
    @IsOptional()
    readonly artistId?: string | null;
}
