import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadTenet } from './types/jwt_payload_tenet';
import { LoginTenetDto } from './dto/login-tenet-dto';
import { Tenet } from './entities/tenet.entity';
import { UpdateTenetDto } from './dto/update-tenet.dto';
import { CreateTenetDto } from './dto/create-tenet.dto';
import datasource from 'src/database/datasource';
import { TenetSchema } from './schema/tenetSchema';
import { comparePassword, hashedPassword } from 'src/common/utils';

@Injectable()
export class TenetsService {
  constructor(
    // private readonly dataSource: DataSource,
    @InjectRepository(Tenet) private tenetRepository: Repository<Tenet>,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async create(adminId: string, createTenetDto: CreateTenetDto) {
    const { password } = createTenetDto;
    if (createTenetDto.email) {
      const ExistingUser = await this.tenetRepository.findOne({
        where: { email: createTenetDto.email },
      });
      if (ExistingUser) {
        throw new HttpException('User with this email already exist', HttpStatus.FOUND);
      }
    }
    const hashPassword = await hashedPassword(password);

    const newTenets = this.tenetRepository.create({
      ...createTenetDto,
      created_by: adminId,
      password: hashPassword,
    });

    return await this.tenetRepository.save(newTenets);
  }
  async findAll() {
    // const queryRunner = this.dataSource.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   await queryRunner;
    //   //to do from here
    // } catch (error) {
    //   console.log(error);
    // }

    const tenets = await this.tenetRepository.find({ where: { is_deleted: false } });

    return tenets.map((tenet) => {
      const { client_secret: ClinetSecret, password, ...info } = tenet;

      if (ClinetSecret === password) return 'Hitesh';
      return info;
    });
  }
  findOne(id: string) {
    // return this.tenetRepository.findOne({ where: { id } });
    const tenetRepo = datasource.getRepository(TenetSchema);
    return tenetRepo.findOneBy({ id });
  }

  update(id: string, updateTenetDto: UpdateTenetDto) {
    return this.tenetRepository.update({ id }, updateTenetDto);
  }

  remove(id: string) {
    return this.tenetRepository.update({ id }, { is_deleted: true });
  }

  async Login(loginTenetDto: LoginTenetDto) {
    const { email, password } = loginTenetDto;
    const tenet = await this.tenetRepository.findOne({
      where: {
        email,
      },
    });
    if (!tenet) {
      throw new HttpException('No User found', HttpStatus.NOT_FOUND);
    }
    const isPassword = await comparePassword(password, tenet.password);
    if (!isPassword) {
      throw new HttpException('Invalid Credentitals', HttpStatus.NOT_FOUND);
    }
    const jwtPayloadtenet: JwtPayloadTenet = {
      email,
      tenetId: tenet.id,
    };
    const token = await this.jwtService.signAsync(jwtPayloadtenet, {
      secret: this.config.get<string>('app.jwt.access_token_tenet'),
      expiresIn: '1d',
    });

    await this.tenetRepository.update(
      { id: tenet.id },
      {
        client_secret: token,
      },
    );

    return {
      ...tenet,
      client_secret: token,
    };
  }

  async logout(id: string) {
    await this.tenetRepository.update(
      {
        id,
      },
      {
        client_secret: null,
      },
    );
    return 'logout succesfully';
  }
}
