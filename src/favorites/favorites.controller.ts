import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  createTrack(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Post('album/:id')
  createAlbum(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Post('artist/:id')
  createartist(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('/track:id')
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }

  @Delete('/album:id')
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
  
  @Delete('/artist:id')
  removeartist(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }

 
}
