const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = 
{
    name: "Mike",
    email: "mike@example.com",
    password: "56what!!"
}

beforeEach(async () =>
{
    await User.deleteMany();
    await new User(userOne).save();
});

afterAll(() =>
{
    mongoose.connection.close();
})

test("Should signup a new user", async () =>
{
    await request(app).post("/users").send(
        {
            name: "Dice",
            email: "Dice@example.com",
            password: "MyPass777!"
        }
    ).expect(201);
});

test("Should login existing user", async () =>
{
    await request(app).post("/users/login").send(
        {
            email: userOne.email,
            password: userOne.password
        }
    ).expect(200);
});

/*
    Goal: Test login fail

    1. Create "Should not login nonexistent user"
    2. Send off the request with bad credentials
    3. Expect the correct status response
    4. Test your work!
*/
test("Should not login nonexistent user", async () =>
{
    await request(app).post("/users/login").send(
        {
            email: "helloworld@example.com",
            password: "1234567890"
        }
    ).expect(400);
});