import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelDTO, UpdateLabelDto } from './label.dto';
import { LabelEntity } from './label.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('labels')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  // Health check endpoint
  @Get('/index')
  getIndex(): string {
    return this.labelService.getIndex();
  }

  // Create a new label
  @Post('/add')
  async create(@Body() labelDto: LabelDTO): Promise<LabelEntity> {
    return this.labelService.create(labelDto);
  }

  // Get all labels
  @Get()
  async findAll(): Promise<LabelEntity[]> {
    return this.labelService.findAll();
  }

  // Get a label by ID
  @Get(':id')
  async getLabelById(@Param('id') id: number): Promise<LabelEntity> {
    return this.labelService.getLabelById(id);
  }

  // Update label by ID
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateLabel(
    @Param('id') id: number, 
    @Body() updateLabelDto: UpdateLabelDto
  ): Promise<LabelEntity> {
    return this.labelService.updateLabel(id, updateLabelDto);
  }

  // Delete label by ID
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteLabel(@Param('id') id: number): Promise<void> {
    return this.labelService.deleteLabel(id);
  }
}
