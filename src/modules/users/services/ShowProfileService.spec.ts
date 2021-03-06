import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        showProfile = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '123456',
        });

       const profile = await showProfile.execute({ user_id: user.id});

        expect(profile.name).toBe('Jhon Doe');
        expect(profile.email).toBe('jhondoe@example.com');
    });

    it('should not be able show the profile from non-existing user', async () => {
        await expect(
            showProfile.execute({
                user_id: 'no-existing-user-id'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});