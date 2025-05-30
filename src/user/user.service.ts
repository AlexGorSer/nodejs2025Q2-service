import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { Users } from 'src/data-base';
import { User } from './type/user';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const date = Date.now();

    const create: User = Object.assign(
      {
        id: crypto.randomUUID(),
        version: 1,
        createdAt: date,
        updatedAt: date,
      },
      createUserDto,
    );

    Users.push(create);
    console.log(`User with id: ${create.id} was created`);
    return create;
  }

  findAll() {
    console.log(`Return all users`);
    return Users;
  }

  findOne(id: string) {
    const findUser = this.findById(id);
    console.log(`Find user with id: ${findUser.id}`);
    return findUser;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const findUser = this.findById(id);

    if (findUser.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(` oldPassword is wrong`, HttpStatus.FORBIDDEN);
    }

    findUser.password = updatePasswordDto.newPassword;
    findUser.updatedAt = Date.now();
    findUser.version = findUser.version + 1;

    console.log(`Password user id: ${findUser.id} was updated`);

    return findUser;
  }

  remove(id: string) {
    const findUser = this.findById(id);
    const index = Users.findIndex((user) => user.id === findUser.id);

    Users.splice(index, 1);

    console.log(`User with id: ${id} deleted`);

    return;
  }

  private findById(id: string) {
    const findId = Users.find((user) => user.id === id);
    if (!findId)
      throw new HttpException(
        `User with id: ${id} doest exist`,
        HttpStatus.NOT_FOUND,
      );
    return findId;
  }
}
