import { Controller, Get, Post, Body, Param, Delete, HttpCode, Res, HttpException, Put } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = this.usersService.create(createUserDto);
    console.log(user);
    if (!user) { 
      res.send({message: `Body does not contain required fields`})
    }
    res.send(user);
    return user;
  }
  @Get()
  @HttpCode(200)
  findAll(@Res() res: Response) {
    const users = this.usersService.findAll();
    res.send(users);  
    return users;
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string, @Res() res: Response) {

    if (typeof id !== 'string') {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new HttpException(`User not found`, StatusCodes.NOT_FOUND);
    }
    res.send(user);
    return user;
}

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    if (typeof id !== 'string') {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    const user = this.usersService.update(id, updateUserDto);
    if (user === `password not correct`) {
      throw new HttpException(`Passwort not correct`, StatusCodes.FORBIDDEN);
    }
    if(user === null) {
      throw new HttpException(`User not found`, StatusCodes.NOT_FOUND);
    }
    res.send(user)
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    const user = this.usersService.remove(id);
    if (typeof id !== 'string') {
      throw new HttpException(`id ${id} not validate`, StatusCodes.BAD_REQUEST);
    }
    if (!validate(id)) {
      throw new HttpException(`id ${id} not validate UUID`, StatusCodes.BAD_REQUEST);
    }
    if (!user) {
      throw new HttpException(`User not found`, StatusCodes.NOT_FOUND);
    }
    return;
  }
}
