import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccessTokenGuard } from 'src/admin/guard/access_token_guard.guard';
import { GetCurrentAdminId } from 'src/admin/decorators/get-current-user-id.decorator';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './role.service';
import { Role } from './entities/role.entity';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RolesService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth()
  @ApiBody({ type: CreateRoleDto })
  @ApiCreatedResponse({ type: Role })
  create(@GetCurrentAdminId() id: string, @Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(id, createRoleDto);
  }

  @Get()
  @ApiResponse({ type: [Role] })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Role })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ type: Role })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
