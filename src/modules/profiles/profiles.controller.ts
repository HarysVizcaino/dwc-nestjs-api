import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './models/dto/create-profile.dto';
import { Profile } from './models/profile.entity';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) { }
    // add a profile
    @Post()
    @ApiCreatedResponse({
        description: 'Profile has been created successfully.',
        type: Profile,
      })
    async addProfile(@Res() res, @Body() createProfileDTO: CreateProfileDto) {
        const profile = await this.profilesService.create(createProfileDTO);
        return res.status(HttpStatus.OK).json({
            message: "Profile has been created successfully",
            profile
        })
    }

    // Retrieve profiles list
    @Get()
    async getAllCustomer(@Res() res) {
        const profiles = await this.profilesService.findAll();
        return res.status(HttpStatus.OK).json(profiles);
    }
}
