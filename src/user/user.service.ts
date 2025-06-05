import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name, { timestamp: true });
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userEntity.create(createUserDto);

    this.logger.log('Create new user');

    return plainToInstance(UserEntity, await this.userEntity.save(user));
  }

  async findAll() {
    const users = await this.userEntity.find();

    this.logger.log('Find all users');

    return plainToInstance(UserEntity, users);
  }

  async findOne(id: string) {
    const findUser = await this.findById(id);

    this.logger.log('Find one users');

    return plainToInstance(UserEntity, findUser);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const findUser = await this.findById(id);

    if (findUser.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(` oldPassword is wrong`, HttpStatus.FORBIDDEN);
    }
    const user = Object.assign(findUser, {
      password: updatePasswordDto.newPassword,
    });

    this.logger.log('update user password');

    return plainToInstance(UserEntity, await this.userEntity.save(user));
  }

  async remove(id: string) {
    const user = await this.findById(id);
    await this.userEntity.remove(user);

    this.logger.log('remove user');

    return;
  }

  private async findById(id: string) {
    const findId = await this.userEntity.findOne({ where: { id: id } });
    if (!findId)
      throw new HttpException(
        `User with id: ${id} doest exist`,
        HttpStatus.NOT_FOUND,
      );
    return findId;
  }
}
