import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { authentication, generateSalt, hashRefreshToken } from '../common/utils';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtPayload } from './types/jwt_payload';
import { Tokens } from './types/tokens';
import { LoginDto } from './dto/login.dto';
import { AdminSchema } from './schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminSchema) private adminRepository: Repository<AdminSchema>,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const existingEmail = await this.adminRepository.findOne({
      where: {
        email: createAdminDto.email,
      },
    });

    if (existingEmail) {
      throw new HttpException('Admin with this email already exist', 400);
    }

    const salt: string = await generateSalt();

    // Hash the password
    const hashedPassword = await authentication(salt, createAdminDto.password);

    const newAdmin = this.adminRepository.create({
      email: createAdminDto.email,
      password: hashedPassword,
      password_salt: salt,
    });

    return this.adminRepository.save(newAdmin);
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    const admin = await this.adminRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!admin) throw new ForbiddenException('Access Denied');

    const hashedPassword = await authentication(admin.password_salt, loginDto.password);

    if (hashedPassword !== admin.password) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(admin.id, admin.email);
    await this.update_refreshToken_hash(admin.id, tokens.refresh_token);

    return tokens;
  }

  findAll() {
    return this.adminRepository.find();
  }

  findOne(id: string) {
    return this.adminRepository.findOne({
      where: { id },
    });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update({ id }, updateAdminDto);
  }

  remove(id: string) {
    return this.adminRepository.update({ id }, { is_deleted: true });
  }

  async logout(id: string): Promise<boolean> {
    await this.adminRepository.update(
      {
        id,
      },
      {
        refresh_token_hash: null,
      },
    );
    return true;
  }

  async refreshTokens(id: string, refreshToken: string): Promise<Tokens> {
    const user = await this.adminRepository.findOne({
      where: {
        id,
      },
    });
    if (!user || !user.refresh_token_hash) throw new ForbiddenException('Access Denied');

    const hash = await hashRefreshToken(refreshToken);
    if (hash !== user.refresh_token_hash) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.update_refreshToken_hash(user.id, tokens.refresh_token);

    return tokens;
  }

  async update_refreshToken_hash(userId: string, refreshToken: string): Promise<void> {
    const hash = await hashRefreshToken(refreshToken);
    await this.adminRepository.update(
      {
        id: userId,
      },
      {
        refresh_token_hash: hash,
      },
    );
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('app.jwt.admin_access_token_secret'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('app.jwt.admin_refresh_token_secret'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
