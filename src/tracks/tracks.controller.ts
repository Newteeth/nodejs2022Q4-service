import { Controller, Get, Post, Body, Param, Delete, Res, HttpException, Req, Put, HttpCode } from '@nestjs/common';
import { Request, Response } from 'express';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';

@Controller('/track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto, @Res() res: Response) {
    
    const track = this.tracksService.create(createTrackDto);
    if (track === null) {
      throw new HttpException(`Body does not contain required fields`, StatusCodes.BAD_REQUEST);
    }
    res.send(track);
    return track;
  }

  @Get()
  @HttpCode(200)
  findAll(@Res() res: Response) {

    const tracks = this.tracksService.findAll();
    res.send(tracks);
    return tracks;
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string, @Res() res: Response) {

    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    const track = this.tracksService.findOne(id);
    if (!track) {
      throw new HttpException(`Track not found`, StatusCodes.NOT_FOUND);
    }
    res.send(track);
    return track;
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto,  @Res() res: Response) {

    if (typeof id !== 'string') {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    const track = this.tracksService.update(id, updateTrackDto);
    if (!track) {
      throw new HttpException(`Track not found`, StatusCodes.NOT_FOUND);
    }
    res.send(track);
    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {

    if (typeof id !== 'string') {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    const track = this.tracksService.remove(id);
    if (!track) {
      throw new HttpException(`User not found`, StatusCodes.NOT_FOUND);
    }
    return;
  }
}
