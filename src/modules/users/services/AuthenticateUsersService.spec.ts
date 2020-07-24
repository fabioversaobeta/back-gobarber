import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );        
    });
    
    it('should be able to Authenticate', async () => {
        const user = await createUser.execute({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'jhondoe@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to Authenticate with non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'jhondoe@example.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to Authenticate with non existing user', async () => {
        await createUser.execute({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'jhondoe@example.com',
                password: '123',
            })
        ).rejects.toBeInstanceOf(AppError);
        
    });
});