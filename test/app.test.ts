import request from "supertest";
import app from "../app";

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
        expect(response.body.birthdate).toEqual((new Date("2002-06-24")).toISOString());
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

describe("admin and exceptions", () => {
    var adminToken = "";
    var adminId = "";
    var userId = ""
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
        expect(response.body.birthdate).toEqual((new Date("2002-06-24")).toISOString());
    });

    it("should NOT login with a wrong password", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: "admin@admin.com", password: "12345678" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("PASSWORD_INCORRECT");
    });

    it("should return NOT registered if not registered", async () => {
        const response = await request(app)
            .post("/api/users/login")
            .send({ email: "a@a.com", password: "12345678" })
            .set("Accept", "application/json")
            .expect(403);
        expect(response.text).toEqual("NOT_REGISTERED");
    });

    it("should NOT update a user with a bad token", async () => {
        const response = await request(app)
            .put("/api/users/" + userId)
            .auth("userToken", { type: "bearer" })
            .send({ nick: "nickUpdated", birthdate: "2002-06-24" })
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