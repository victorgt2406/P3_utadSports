import request from "supertest";
import app from "../app";
// users - user
describe("users", () => {
    var token = "";
    var id = "";

    it("should register a user", async () => {
        const response = await request(app)
            .post("/api/users/register")
            .send({
                name: "userName",
                surname: "userSurname",
                nick: "user",
                email: "user@test.com",
                password: "HolaMundo.01",
            })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.user.password).toEqual(undefined);
        expect(response.body.user.name).toEqual("userName");
        expect(response.body.user.email).toEqual("user@test.com");
        expect(response.body.user.role).toEqual("user");
        expect(response.body.token.hoursExp).toEqual(2);
    });

    it("should login a user", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: "user@test.com", password: "HolaMundo.01" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.user.password).toEqual(undefined);
        expect(response.body.user.name).toEqual("userName");
        expect(response.body.user.email).toEqual("user@test.com");
        expect(response.body.user.role).toEqual("user");
        expect(response.body.token.hoursExp).toEqual(2);

        token = response.body.token.token;
        id = response.body.user._id;
    });

    it("should update a user", async () => {
        const response = await request(app)
            .put("/api/users/" + id)
            .auth(token, { type: "bearer" })
            .send({ nick: "nickUpdated", birthdate: "2002-06-24" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.acknowledged).toEqual(true);
        expect(response.body.modifiedCount).toEqual(1);
    });

    it("should get a user", async () => {
        const response = await request(app)
            .get("/api/users/" + id)
            .auth(token, { type: "bearer" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.nick).toEqual("nickUpdated");
        expect(response.body.birthdate).toEqual(
            new Date("2002-06-24").toISOString()
        );
    });

    it("should delete the user", async () => {
        const response = await request(app)
            .delete("/api/users/" + id)
            .auth(token, { type: "bearer" })
            .expect(200);
        expect(response.body.acknowledged).toEqual(true);
        expect(response.body.deletedCount).toEqual(1);
    });
});

// users - admin
describe("users - admin", () => {
    var adminToken = "";
    var adminId = "";
    var userId = "";
    var userToken = "";

    it("should register a user", async () => {
        const response = await request(app)
            .post("/api/users/register")
            .send({
                name: "userName",
                surname: "userSurname",
                nick: "user",
                email: "user@test.com",
                password: "HolaMundo.01",
            })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.user.password).toEqual(undefined);
        expect(response.body.user.name).toEqual("userName");
        expect(response.body.user.email).toEqual("user@test.com");
        expect(response.body.user.role).toEqual("user");
        expect(response.body.token.hoursExp).toEqual(2);
        userId = response.body.user._id;
        userToken = response.body.token.token;
    });

    it("should login a admin", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: "admin@admin.com", password: "adminadmin" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.user.password).toEqual(undefined);
        expect(response.body.user.role).toEqual("admin");
        expect(response.body.token.hoursExp).toEqual(2);

        adminToken = response.body.token.token;
        adminId = response.body.user._id;
    });

    it("should update a user by a admin", async () => {
        const response = await request(app)
            .put("/api/users/" + userId)
            .auth(adminToken, { type: "bearer" })
            .send({ nick: "nickUpdated", birthdate: "2002-06-24" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.acknowledged).toEqual(true);
        expect(response.body.modifiedCount).toEqual(1);
    });

    it("should get a user by a admin", async () => {
        const response = await request(app)
            .get("/api/users/" + userId)
            .auth(adminToken, { type: "bearer" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.nick).toEqual("nickUpdated");
        expect(response.body.birthdate).toEqual(
            new Date("2002-06-24").toISOString()
        );
    });

    it("should delete a user by a admin", async () => {
        const response = await request(app)
            .delete("/api/users/" + userId)
            .auth(adminToken, { type: "bearer" })
            .expect(200);
        expect(response.body.acknowledged).toEqual(true);
        expect(response.body.deletedCount).toEqual(1);
    });
});

// users - exceptions
describe("users - exceptions", () => {
    var adminToken = "";
    var adminId = "";
    var userId = "";
    var userToken = "";

    it("should register a user", async () => {
        const response = await request(app)
            .post("/api/users/register")
            .send({
                name: "userName",
                surname: "userSurname",
                nick: "user",
                email: "user@test.com",
                password: "HolaMundo.01",
            })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.user.password).toEqual(undefined);
        expect(response.body.user.name).toEqual("userName");
        expect(response.body.user.email).toEqual("user@test.com");
        expect(response.body.user.role).toEqual("user");
        expect(response.body.token.hoursExp).toEqual(2);
        userId = response.body.user._id;
        userToken = response.body.token.token;
    });

    it("should login a admin", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: "admin@admin.com", password: "adminadmin" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.user.password).toEqual(undefined);
        expect(response.body.user.role).toEqual("admin");
        expect(response.body.token.hoursExp).toEqual(2);

        adminToken = response.body.token.token;
        adminId = response.body.user._id;
    });

    it("should return NOT registered if not registered", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: "a@a.com", password: "12345678" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("NOT_REGISTERED");
    });

    it("should NOT login with a wrong password", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: "admin@admin.com", password: "12345678" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("PASSWORD_INCORRECT");
    });

    it("should NOT get a user with a bad token", async () => {
        const response = await request(app)
            .get("/api/users/" + userId)
            .auth("thisIsABadToken", { type: "bearer" })
            .set("Accept", "application/json")
            .expect(401);
        expect(response.text).toEqual("BAD_TOKEN");
    });

    it("should NOT update a user with a bad token", async () => {
        const response = await request(app)
            .put("/api/users/" + userId)
            .auth("thisIsABadToken", { type: "bearer" })
            .send({ nick: "nickUpdated", birthdate: "2002-06-24" })
            .set("Accept", "application/json")
            .expect(401);
        expect(response.text).toEqual("BAD_TOKEN");
    });

    it("should NOT delete a user with a bad token", async () => {
        const response = await request(app)
            .delete("/api/users/" + userId)
            .auth("thisIsABadToken", { type: "bearer" })
            .set("Accept", "application/json")
            .expect(401);
        expect(response.text).toEqual("BAD_TOKEN");
    });

    it("should NOT ALLOWED to update a user by another user", async () => {
        const response = await request(app)
            .put("/api/users/" + adminId)
            .auth(userToken, { type: "bearer" })
            .send({ nick: "nickUpdated", birthdate: "2002-06-24" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("NOT_ALLOWED");
    });

    it("should NOT ALLOWED to get a user by another user", async () => {
        const response = await request(app)
            .get("/api/users/" + adminId)
            .auth(userToken, { type: "bearer" })
            .send({ nick: "nickUpdated", birthdate: "2002-06-24" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("NOT_ALLOWED");
    });

    it("should NOT ALLOWED to delete a user by another user", async () => {
        const response = await request(app)
            .delete("/api/users/" + adminId)
            .auth(userToken, { type: "bearer" })
            .send({ nick: "nickUpdated", birthdate: "2002-06-24" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("NOT_ALLOWED");
    });

    it("should delete the user by a admin", async () => {
        const response = await request(app)
            .delete("/api/users/" + userId)
            .auth(adminToken, { type: "bearer" })
            .expect(200);
        expect(response.body.acknowledged).toEqual(true);
        expect(response.body.deletedCount).toEqual(1);
    });
});

// teams - open team
describe("teams", () => {
    var user1token = "";
    var user1id = "";
    var user2token = "";
    var user2id = "";
    var teamId = "";

    it("should register a user (1)", async () => {
        const response = await request(app)
            .post("/api/users/register")
            .send({
                name: "userName",
                surname: "userSurname",
                nick: "user",
                email: "user@test.com",
                password: "HolaMundo.01",
            })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.user.password).toEqual(undefined);
        expect(response.body.user.name).toEqual("userName");
        expect(response.body.user.email).toEqual("user@test.com");
        expect(response.body.user.role).toEqual("user");
        expect(response.body.token.hoursExp).toEqual(2);

        user1token = response.body.token.token;
        user1id = response.body.user._id;
    });

    it("should register a user (2)", async () => {
        const response = await request(app)
            .post("/api/users/register")
            .send({
                name: "userName2",
                surname: "userSurname2",
                nick: "user2",
                email: "user2@test.com",
                password: "HolaMundo.01",
            })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.user.password).toEqual(undefined);
        expect(response.body.user.name).toEqual("userName2");
        expect(response.body.user.email).toEqual("user2@test.com");
        expect(response.body.user.role).toEqual("user");
        expect(response.body.token.hoursExp).toEqual(2);

        user2token = response.body.token.token;
        user2id = response.body.user._id;
    });

    it("should create a team, being the creator the captain and not open", async () => {
        const response = await request(app)
            .post("/api/teams/")
            .auth(user1token, { type: "bearer" })
            .send({
                name: "teamExample",
                description: "description example",
                sport: "football",
                max: 15,
                open: false
            })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.name).toEqual("teamExample");
        expect(response.body.captain._id).toEqual(user1id);
        expect(response.body.captain.name).toEqual("userName");
        expect(response.body.captain.email).toEqual("user@test.com");
    });

    it("should get the team", async () => {
        const response = await request(app)
            .get("/api/teams/" + teamId)
            .set("Accept", "application/json")
            .expect(200);
        expect(response.body.name).toEqual("teamExample");
        expect(response.body.captain._id).toEqual(user1id);
        expect(response.body.captain.name).toEqual("userName");
        expect(response.body.captain.email).toEqual("user@test.com");
    });

    it("should NOT join the user to the team", async () => {
        const response = await request(app)
            .patch("/api/teams/join/" + teamId)
            .auth(user2token, { type: "bearer" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("NOT_ALLOWED");

        user1token = response.body.token.token;
        user1id = response.body.user._id;
    });

    it("should OPEN the team", async () => {
        const response = await request(app)
            .patch("/api/teams/open/" + teamId)
            .auth(user2token, { type: "bearer" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("OPENED");

        user1token = response.body.token.token;
        user1id = response.body.user._id;
    });

    it("should join the user to the team", async () => {
        const response = await request(app)
            .patch("/api/teams/join/" + teamId)
            .auth(user2token, { type: "bearer" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.text).toEqual("JOINED");

        user1token = response.body.token.token;
        user1id = response.body.user._id;
    });

    it("should unjoin the user of the team", async () => {
        const response = await request(app)
            .patch("/api/teams/unjoin/" + teamId)
            .auth(user2token, { type: "bearer" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.text).toEqual("UNJOINED");
    });

    it("should CLOSE (not open) the team", async () => {
        const response = await request(app)
            .patch("/api/teams/close/" + teamId)
            .auth(user2token, { type: "bearer" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("CLOSED");

        user1token = response.body.token.token;
        user1id = response.body.user._id;
    });

    it("should unjoin the user and delete the team if the user is the only member", async () => {
        const response = await request(app)
            .patch("/api/teams/unjoin/" + teamId)
            .auth(user1token, { type: "bearer" })
            .set("Accept", "application/json")
            .expect(200);
        expect(response.text).toEqual("UNJOINED");
    });

    it("should delete the user", async () => {
        const response = await request(app)
            .delete("/api/users/" + user1id)
            .auth(user1token, { type: "bearer" })
            .expect(200);
        expect(response.body.acknowledged).toEqual(true);
        expect(response.body.deletedCount).toEqual(1);
    });
});
