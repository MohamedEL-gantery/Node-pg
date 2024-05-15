const request = require("supertest");
const buildApp = require("../../app");
const User = require("../../repos/user");
const Context = require("../context");

let context;
beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context.reset();
});

afterAll(() => {
  return context.close();
});

it("Create a user", async () => {
  const startingCount = await User.count();

  await request(buildApp())
    .post("/users")
    .send({ username: "test user", bio: "test bio" })
    .expect(201);

  const FinishCount = await User.count();
  expect(FinishCount - startingCount).toEqual(1);
});
