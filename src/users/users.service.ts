import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBusers } from 'src/DBuser';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password === 'password'){
        return null;
      }
      const user: User = {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        id: uuidv4()
      };      
      DBusers.push(user);
      return user; 
    } catch {
      throw new Error;
    }  
  }

  findAll() {
    return DBusers;
  }

  findOne(id: string) {
    const userId = id;
    const user: User = DBusers.find(({ id }) => id === userId);
    if (!user) {
      return null;
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userUpdate = updateUserDto;
    let user: User  = this.findOne(id);
    if (!user) {
      return null;
    }
    if (user.password !== userUpdate.oldPassword) {
      return `password not correct`;
    }
    if (updateUserDto.newPassword) {
      user.password = updateUserDto.newPassword;
      user.version = user.version + 1;
      user.updatedAt = Date.now();
    }
    return user;
  }

  remove(id: string) {
    const user: User = this.findOne(id);
    DBusers.splice(DBusers.indexOf(user), 1);
    return user;
  }
}
