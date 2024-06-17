import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/admin/guard/access_token_guard.guard';
import { GetCurrentAdminId } from 'src/admin/decorators/get-current-user-id.decorator';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module as ModuleSchema } from './entities/module.entity';

@ApiTags('module')
@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateModuleDto })
  @ApiCreatedResponse({ type: ModuleSchema })
  create(@GetCurrentAdminId() id: string, @Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(id, createModuleDto);
  }

  @Get()
  @ApiResponse({ type: [ModuleSchema] })
  findAll() {
    return this.moduleService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: [ModuleSchema] })
  findOne(@Param('id') id: string) {
    return this.moduleService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':moduleId')
  update(
    @GetCurrentAdminId() id: string,
    @Param('moduleId') moduleId: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return this.moduleService.update(moduleId, id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleService.remove(id);
  }
}
