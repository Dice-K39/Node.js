const users = [];

const addUser = ({ id, username, room }) => 
{
    // Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!username || !room)
    {
        return {
            error: "Username and room are required!"
        };
    }

    // Check for existing user
    const existingUser = users.find((user) =>
    {
        return user.room === room && user.username ===username
    });

    // Validate username
    if (existingUser)
    {
        return {
            error: "Username is in use!"
        };
    }

    // Store user
    const user = { id, username, room };

    users.push(user);

    return { user };
}

const removeUser = (id) =>
{
    const index = users.findIndex((user) =>user.id === id);
    
    if (index !== -1)
    {
        return users.splice(index, 1)[0];
    }
}

addUser(
    {
        id: 22,
        username: "Dice",
        room: "Atlanta"
    }
)

addUser(
    {
        id: 42,
        username: "Jen",
        room: "Atlanta"
    }
)

addUser(
    {
        id: 12,
        username: "Drew   ",
        room: "Marietta"
    }
)

/*
    Goal: Create two new functions for users

    1. Create getUser
        - Accept id and return user object (or undefined)
    2. Create getUsersInRoom
        - Accept room name and return array of users (or empty array)
    3. Test your work by calling the functions!
*/
const getUser = (id) =>
{
    return users.find((user) => user.id === id);;
}

const getUsersInRoom = (room) =>
{
    return users.filter((user) => user.room === room);;
}

console.log(getUser(2))
console.log(getUsersInRoom("atlanta"))

module.exports =
{
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}