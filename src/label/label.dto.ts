import { IsString, IsInt, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class LabelDTO {

  @IsString()
  @IsNotEmpty({ message: 'Barcode cannot be empty' })
  BAR_CODE: string;

  @IsInt()
  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  ORDER_QUANTITY: string;

  @IsString()
  BATCH_LOT_NO: string;

  @IsString()
  COLOR_CODE: string;

  @IsString()
  ARTICLE_NO: string;

  @IsDate()
  DATE: Date;

  @IsString()
  CARTON_INSIDE_QUANTITY: string;

  @IsString()
  TEX_NO: string;

  @IsString()
  LENGTH: string;

  @IsString()
  CONE_ROUND_TEX: string;

  @IsString()
  NO_OF_STICKER_WITH_FULL_BOX: string;

  @IsString()
  NO_OF_LOOSE_QUANTITY_IN_LAST_STICKER: string;

  @IsString()
  PRINT_QUANTITY_FOR_LOOSE_STICKER: string;

  @IsString()
  PRINT_QUANTITY_FOR_CONE_ROUND_STICKER: string;

  @IsString()
  AMANN_COLOR_CODE: string;

  @IsString()
  COMPETETOR_COLOR_CODE: string;

  UPDATED_AT: Date;

  CREATED_AT: Date;
}


export class UpdateLabelDto {
  @IsOptional()
  @IsString()
  BAR_CODE?: string;

  @IsOptional()
  @IsString()
  ORDER_QUANTITY?: string;

  @IsOptional()
  @IsString()
  BATCH_LOT_NO?: string;

  @IsOptional()
  @IsString()
  COLOR_CODE?: string;

  @IsOptional()
  @IsString()
  ARTICLE_NO?: string;

  @IsOptional()
  @IsDate()
  DATE?: Date;

  @IsOptional()
  @IsString()
  CARTON_INSIDE_QUANTITY?: string;

  @IsOptional()
  @IsString()
  TEX_NO?: string;

  @IsOptional()
  @IsString()
  LENGTH?: string;

  @IsOptional()
  @IsString()
  CONE_ROUND_TEX?: string;

  @IsOptional()
  @IsString()
  NO_OF_STICKER_WITH_FULL_BOX?: string;

  @IsOptional()
  @IsString()
  NO_OF_LOOSE_QUANTITY_IN_LAST_STICKER?: string;

  @IsOptional()
  @IsString()
  PRINT_QUANTITY_FOR_LOOSE_STICKER?: string;

  @IsOptional()
  @IsString()
  PRINT_QUANTITY_FOR_CONE_ROUND_STICKER?: string;

  @IsOptional()
  @IsString()
  AMANN_COLOR_CODE?: string;

  @IsOptional()
  @IsString()
  COMPETETOR_COLOR_CODE?: string;

  @IsOptional()
  @IsDate()
  UPDATED_AT?: Date;

  @IsOptional()
  @IsDate()
  CREATED_AT?: Date;
}
