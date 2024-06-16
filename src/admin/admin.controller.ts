import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginDto } from './dto/login.dto';
import { GetCurrentAdminId } from './decorators/get-current-user-id.decorator';
import { AccessTokenGuard } from './guard/access_token_guard.guard';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { Tokens } from './types/tokens';
import { Admin } from './entities/admin.entity';
import { RefreshTokenGuard } from './guard/refresh_token_guard.guard';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateAdminDto })
  @ApiCreatedResponse({
    type: Admin,
    description: 'Admin Created Successfully',
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    type: () => Tokens,
    description: 'Admin Created Successfully',
  })
  login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentAdminId() id: string): Promise<boolean> {
    return this.adminService.logout(id);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    description: 'Refresh Token is required for this route',
  })
  @ApiBearerAuth('Refresh Access token')
  refreshTokens(
    @GetCurrentAdminId() id: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.adminService.refreshTokens(id, refreshToken);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get('details')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @ApiResponse({ type: Admin })
  findOne(@GetCurrentAdminId() id: string) {
    return this.adminService.findOne(id);
  }

  @Patch('update')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  update(@GetCurrentAdminId() id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete('delete')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  remove(@GetCurrentAdminId() id: string) {
    return this.adminService.remove(id);
  }
}
