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
    const copy = JSON.parse(JSON.stringify(create));
    const copyUser = Object.assign(copy, {});
    delete copyUser.password;
    return copyUser;
  }

  findAll() {
    const noPassReturn = [];
    Users.forEach((data) => {
      const copy = JSON.parse(JSON.stringify(data));
      const copyUser = Object.assign(copy, {});
      delete copyUser.password;
      noPassReturn.push(copyUser);
    });
    console.log(`Return all users`);
    return noPassReturn;
  }

  findOne(id: string) {
    const findUser = this.findById(id);
    console.log(`Find user with id: ${findUser.id}`);
    const copy = JSON.parse(JSON.stringify(findUser));
    const copyUser = Object.assign(copy, {});
    delete copyUser.password;
    return copyUser;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const findUser = this.findById(id);

    if (findUser.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(` oldPassword is wrong`, HttpStatus.FORBIDDEN);
    }
    const user = Object.assign(findUser, {
      password: updatePasswordDto.newPassword,
      updatedAt: Date.now(),
      version: findUser.version + 1,
    });

    const copy = JSON.parse(JSON.stringify(user));
    const copyUser = Object.assign(copy, {});

    console.log(`Password user id: ${findUser.id} was updated`);
    delete copyUser.password;
    return copyUser;
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
