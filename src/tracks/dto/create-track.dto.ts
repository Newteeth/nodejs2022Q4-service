import { IsInt, IsOptional, IsString } from 'class-validator';
export class CreateTrackDto {

    @IsString()
    name: string;
    
    @IsInt()
    duration: number;

    @IsString()
    @IsOptional()
    albumId: string | null;

    @IsString()
    @IsOptional()
    artistId: string | null;
}
