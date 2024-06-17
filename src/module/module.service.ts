import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module as ModuleSchema } from './entities/module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(ModuleSchema)
    private moduleRepository: Repository<ModuleSchema>,
  ) {}

  async create(createdBy: string, createModuleDto: CreateModuleDto) {
    if (createModuleDto.main_module) {
      const existingModule = await this.moduleRepository.findOne({
        where: { id: createModuleDto.main_module },
      });
      if (!existingModule) {
        throw new HttpException('Main module with this ID does not exist', HttpStatus.NOT_FOUND);
      }
    }

    const newModule = this.moduleRepository.create({
      ...createModuleDto,
      is_main: !createModuleDto.main_module,
      created_by: createdBy,
      main_module: createModuleDto.main_module
        ? { id: createModuleDto.main_module } // Linking main_module by ID
        : null,
    });

    return this.moduleRepository.save(newModule);
  }

  findAll() {
    return this.moduleRepository.find({
      where: {
        is_deleted: false,
      },
      relations: ['main_module'],
    });
  }

  findOne(id: string) {
    return this.moduleRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(moduleId: string, updatedBy: string, updateModuleDto: UpdateModuleDto) {
    const { mainModule, ...info } = updateModuleDto;

    if (mainModule) {
      return this.moduleRepository.update(
        { id: moduleId },
        {
          ...info,
          updated_by: updatedBy,
          main_module: {
            id: mainModule,
          },
        },
      );
    }

    return this.moduleRepository.update(
      { id: moduleId },
      {
        ...info,
        updated_by: updatedBy,
      },
    );
  }

  remove(id: string) {
    return this.moduleRepository.update(
      { id },
      {
        is_deleted: true,
      },
    );
  }
}
