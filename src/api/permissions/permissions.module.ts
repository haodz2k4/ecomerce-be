import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionRepository } from './permissions.repository';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionRepository],
})
export class PermissionsModule {}
