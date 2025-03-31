import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { DivisionService } from '../../application/services/division.service';
import { CreateDivisionDto } from '../../application/dto/create-division.dto';
import { UpdateDivisionDto } from '../../application/dto/update-division.dto';
import { DivisionDto } from '../../application/dto/division.dto';

@Controller('divisions')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDivisionDto: CreateDivisionDto,
  ): Promise<DivisionDto> {
    try {
      return await this.divisionService.create(createDivisionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<DivisionDto[]> {
    return this.divisionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DivisionDto> {
    try {
      return await this.divisionService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id/subdivisions')
  async findSubdivisions(@Param('id') id: string): Promise<DivisionDto[]> {
    try {
      return await this.divisionService.findSubdivisions(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDivisionDto: UpdateDivisionDto,
  ): Promise<DivisionDto> {
    try {
      return await this.divisionService.update(+id, updateDivisionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.divisionService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
