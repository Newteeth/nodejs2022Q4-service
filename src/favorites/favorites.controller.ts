import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';

@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  createTrack(@Body() createFavoriteDto: CreateFavoriteDto, @Param() id: string) {
    
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    return this.favoritesService.create(createFavoriteDto, id);
  }

  @Post('album/:id')
  createAlbum(@Body() createFavoriteDto: CreateFavoriteDto, @Param() id: string) {
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    return this.favoritesService.create(createFavoriteDto, id);
  }

  @Post('artist/:id')
  createartist(@Body() createFavoriteDto: CreateFavoriteDto, @Param() id: string) {
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    return this.favoritesService.create(createFavoriteDto, id);
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
