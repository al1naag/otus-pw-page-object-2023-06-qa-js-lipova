import { faker } from '@faker-js/faker';

const config = {
   username :'John Doe',
   password :'ThisIsNotAPassword',
   fakePassword: faker.internet.password(),
   fakeUsername: faker.internet.userName(),
   comment: faker.music.songName()
}
export default config