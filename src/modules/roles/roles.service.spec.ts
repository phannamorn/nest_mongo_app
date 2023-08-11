import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { User } from '../users/entities/user.entity';

describe('RolesService', () => {
  let service: RolesService;

  const mockRoleRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
        {
            provide: getRepositoryToken(User),
            useValue: mockUserRepository
        }
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new role and return its data', async () => {
    const createRoleDto = {
        name: 'Admin'
    } as CreateRoleDto;

    const role = {
        id: Date.now(),
        name: 'Admin'
    } as Role;

    jest.spyOn(mockRoleRepository, 'save').mockReturnValue(role);

    const result = await service.create(createRoleDto);

    expect(mockRoleRepository.save).toBeCalled();
    expect(mockRoleRepository.save).toBeCalledWith(createRoleDto);

    expect(result).toEqual(role);
  });

  it('findAll => should return an array of role', async () => {
    //arrange
    const role = {
      id: Date.now(),
      name: 'Admin'
    };
    const roles = [role];
    jest.spyOn(mockRoleRepository, 'find').mockReturnValue(roles);

    //act
    const result = await service.findAll();

    // assert
    expect(result).toEqual(roles);
    expect(mockRoleRepository.find).toBeCalled();
  });

  it('findOne => should find a role by a given id and return its data', async () => {
    //arrange
    const id = 1;
    const role = {
      id: 1,
      name: 'Admin'
    };

    jest.spyOn(mockRoleRepository, 'findOne').mockReturnValue(role);

    //act
    const result = await service.findOne(id);
    expect(result).toEqual(role);
    expect(mockRoleRepository.findOne).toBeCalled();
    expect(mockRoleRepository.findOne).toBeCalledWith({ where: { id } });
  });

  it('remove => should find a role by a given id, remove and then return Number of affected rows', async () => {
    const id = 1;
    const role = {
      id: 1,
      name: 'Admin'
    };

    jest.spyOn(mockRoleRepository, 'delete').mockReturnValue(role);

    //act
    const result = await service.remove(id);

    expect(result).toEqual(role);
    expect(mockRoleRepository.delete).toBeCalled();
    expect(mockRoleRepository.delete).toBeCalledWith({id});
  });
});