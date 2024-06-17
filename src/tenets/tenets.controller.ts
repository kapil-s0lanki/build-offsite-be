import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/admin/guard/access_token_guard.guard';
import { GetCurrentAdminId } from 'src/admin/decorators/get-current-user-id.decorator';
import { TenetsService } from './tenets.service';
import { CreateTenetDto } from './dto/create-tenet.dto';
import { UpdateTenetDto } from './dto/update-tenet.dto';
import { LoginTenetDto } from './dto/login-tenet-dto';
import { TenetClientGuard } from './guard/tenet_client_guard.guard';
import { GetCurrentTenetId } from './decorators/get-tenet-user-id.decorator';

@Controller('tenets')
@ApiTags('Tenets')
export class TenetsController {
  constructor(private readonly tenetsService: TenetsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @ApiBody({ type: CreateTenetDto })
  @ApiCreatedResponse({ type: CreateTenetDto })
  create(@GetCurrentAdminId() id: string, @Body() createTenetDto: CreateTenetDto) {
    return this.tenetsService.create(id, createTenetDto);
  }

  @Get()
  @ApiResponse({ type: [CreateTenetDto] })
  findAll() {
    return this.tenetsService.findAll();
  }

  @ApiResponse({ type: CreateTenetDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenetsService.findOne(id);
  }

  @ApiResponse({ type: CreateTenetDto })
  @Post('login')
  async loginTenet(@Body() loginTenet: LoginTenetDto) {
    return this.tenetsService.Login(loginTenet);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(TenetClientGuard)
  async logoutTenet(@GetCurrentTenetId() id: string) {
    return this.tenetsService.logout(id);
  }

  @Patch()
  @UseGuards(TenetClientGuard)
  update(@GetCurrentTenetId() id: string, @Body() updateTenetDto: UpdateTenetDto) {
    return this.tenetsService.update(id, updateTenetDto);
  }

  @Delete()
  @UseGuards(TenetClientGuard)
  remove(@GetCurrentTenetId() id: string) {
    return this.tenetsService.remove(id);
  }
}
