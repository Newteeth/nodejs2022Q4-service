import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, HttpCode, Put } from '@nestjs/common';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate } from 'uuid';

@Controller('/artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto, @Res() res: Response) {
    const artist = this.artistsService.create(createArtistDto);
    if (artist === null) {
      throw new HttpException(`Body does not contain required fields`, StatusCodes.BAD_REQUEST);
    }  
    res.send(artist);
    return artist;  
  }

  @Get()
  @HttpCode(200)
  findAll(@Res() res: Response) {
    const artist = this.artistsService.findAll();
    res.send(artist);
    return artist;
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (typeof id !== "string") {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    const artist = this.artistsService.findOne(id); 
    if (!artist) {
      throw new HttpException(`Artist on id ${id} not found`, StatusCodes.NOT_FOUND);
    }
    res.send(artist);
    return artist;
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto, @Res() res: Response) {
    if (typeof id !== 'string') {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    const artist = this.artistsService.update(id, updateArtistDto);
    if (artist === null) {
      throw new HttpException(`Artist not found`, StatusCodes.NOT_FOUND);
    }
    res.send(artist);
    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (typeof id !== 'string') {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate`, 400);
    }
    const artist = this.artistsService.remove(id);
    if (!artist) {
      throw new HttpException(`User not found`, StatusCodes.NOT_FOUND);
    }
    return;
  }
}
