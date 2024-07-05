import { factory, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const hookFacotory = factory({
  hook: {
    id: primaryKey(faker.number.int),
    name: () => faker.lorem.slug({ min: 1, max: 3 }),
    description: () => faker.lorem.sentence({ min: 3, max: 6 }),
    source: () => faker.internet.url(),
    createdAt: () => faker.date.recent(),
    updatedAt: () => faker.date.recent()
  }
});
