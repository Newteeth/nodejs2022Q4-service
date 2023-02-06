import { Controller, Get, Post, Body, Param, Delete, HttpCode, Put, Res, HttpException } from '@nestjs/common';
import { isValidationOptions } from 'class-validator';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('/album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto, @Res() res: Response) {
    const album = this.albumsService.create(createAlbumDto);
    if (album === null) {
      throw new HttpException(`Body does not contain required fields`, StatusCodes.BAD_REQUEST);
    }
    res.send(album);
    return album;
  }

  @Get()
  @HttpCode(200)
  findAll(@Res() res: Response) {
    const albums = this.albumsService.findAll();
    res.send(albums);
    return albums;
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string, @Res() res: Response) {
    // if (typeof id !== "string") {
    //   throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    // }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    const album = this.albumsService.findOne(id);
    if (!album) {
      throw new HttpException(`Album not found`, StatusCodes.NOT_FOUND);
    }
    res.send(album);
    return album
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto, @Res() res: Response) {
    if (typeof id !== "string") {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    // if (!updateAlbumDto) {
    //   throw new HttpException(`Not validate type of data`, StatusCodes.BAD_REQUEST);
    // }
    const album = this.albumsService.update(id, updateAlbumDto);
    if (!album) {
      throw new HttpException(`Album not found`, StatusCodes.NOT_FOUND);
    }
    res.send(album);
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    let album = this.albumsService.remove(id);
    if (!album) {
      throw new HttpException(`Album not found`, StatusCodes.NOT_FOUND);
    }
    res.send(StatusCodes.NO_CONTENT);
    return;
  }
}

