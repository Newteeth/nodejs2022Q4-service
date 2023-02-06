import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Res, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';

@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  @HttpCode(201)
  createTrack(@Body() createFavoriteDto: CreateFavoriteDto, @Param('id') id: string, @Res() res: Response, url = 'track') {
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    const trackId = this.favoritesService.create(createFavoriteDto, id, url);
    if (trackId === null) {
      throw new HttpException(`Id ${id} not found in the tracks`, StatusCodes.UNPROCESSABLE_ENTITY);
    }
    res.send(trackId);
    return trackId;
  }

  @Post('album/:id')
  @HttpCode(201)
  createAlbum(@Body() createFavoriteDto: CreateFavoriteDto, @Param('id') id: string, @Res() res: Response, url = 'album') {
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    const albumId = this.favoritesService.create(createFavoriteDto, id, url);
    if (albumId === null) {
      throw new HttpException(`Id ${id} not found in the albums`, StatusCodes.UNPROCESSABLE_ENTITY);
    }
    res.send(albumId);
    return albumId;
  }

  @Post('artist/:id')
  @HttpCode(201)
  createartist(@Body() createFavoriteDto: CreateFavoriteDto, @Param('id') id: string, @Res() res: Response, url = 'artist') {
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    const artistId = this.favoritesService.create(createFavoriteDto, id, url);
    if (artistId === null) {
      throw new HttpException(`Id ${id} not found in the artists`, StatusCodes.UNPROCESSABLE_ENTITY);
    }
    res.send(artistId);
    return artistId;
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
