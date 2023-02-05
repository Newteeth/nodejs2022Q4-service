export class CreateTrackDto {
    public name?: string;
    public duration?: number;
    public albumId?: string;
    public artistId?: string | null;
}
