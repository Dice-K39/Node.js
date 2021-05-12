const request = require("supertest");
const mongoose = require("mongoose");

const Task = require("../src/models/task");
const { 
    userOneId, 
    userOne, 
    userTwoId, 
    userTwo, 
    taskOne, 
    taskTwo, 
    taskThree, 
    setupDatabase 
} = require("./fixtures/db");
const app = require("../src/app");

beforeEach(setupDatabase);

afterAll(() =>
{
    mongoose.connection.close();
})

test("Should create task for user", async () =>
{
    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send(
            {
                description: "From my test"
            }
        )
        .expect(201);

        const task = await Task.findById(response.body._id);

        expect(task).not.toBeNull();
        expect(task.completed).toEqual(false);
});

test("Should GET all tasks for user one", async () =>
{
    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(2);
});

test("Should not be able to delete task of another user", async () =>
{
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    
    const task = await Task.findById(taskOne._id);

    expect(task).not.toBeNull();
});

//
// Task Test Ideas
//

test("Should not create task with invalid description", async () =>
{
    await request(app)
        .post("/tasks")
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send(
            {
                description: ""
            }
        )
        .expect(400);
});

test("Should not create task with invalid completed", async () =>
{
    await request(app)
        .post("/tasks")
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send(
            {
                description: "Do this",
                completed: "completed"
            }
        )
        .expect(400);
});

test("Should not update task with invalid description", async () =>
{
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send(
            {
                description: ""
            }
        )
        .expect(400);
});

test("Should not update task with invalid completed", async () =>
{
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send(
            {
                completed: 12345
            }
        )
        .expect(400);
});

test("Should delete user task", async () =>
{
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should not delete task if unauthenticated", async () =>
{
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .send()
        .expect(401);
});

test("Should not update other users task", async () =>
{
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set("Authorization", `${userTwo.tokens[0].token}`)
        .send(
            {
                description: "Try changing this!"
            }
        )
        .expect(404);
});

test("Should fetch user task by id", async () =>
{
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should not fetch user task by id if unauthenticated", async () =>
{
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .send()
        .expect(401);
});

test("Should not fetch other users task by id", async () =>
{
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set("Authorization", `${userTwo.tokens[0].token}`)
        .send()
        .expect(404);
});

test("Should fetch only completed tasks", async () =>
{
    const response = await request(app)
        .get("/tasks?completed=true")
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(1);
});

test("Should fetch only incomplete tasks", async () =>
{
    const response = await request(app)
        .get("/tasks?completed=false")
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(1);
});

test("Should sort tasks by description", async () =>
{
    const response = await request(app)
        .get("/tasks?sortBy=description:desc")
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body[0].description).toEqual("Second task");
});

test("Should sort tasks by completed", async () =>
{
    const response = await request(app)
        .get("/tasks?sortBy=completed:desc")
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body[0].description).toEqual("Second task");
});

test("Should sort tasks by createdAt", async () =>
{
    const response = await request(app)
        .get("/tasks?sortBy=createdAt:desc")
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body[0].description).toEqual("Second task");
});

test("Should sort tasks by updatedAt", async () =>
{
    const response = await request(app)
        .get("/tasks?sortBy=updatedAt:desc")
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body[0].description).toEqual("Second task");
});

test("Should fetch page of tasks", async () =>
{
    const response = await request(app)
        .get("/tasks?limit=1")
        .set("Authorization", `${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(1);
});
