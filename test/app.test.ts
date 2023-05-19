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
        expect(response.body.user.name).toEqual("userName");
        expect(response.body.user.email).toEqual("user@test.com");
        expect(response.body.user.role).toEqual("user");
        expect(response.body.token.hoursExp).toEqual(2);

        
        token = response.body.token.token;
        console.log(token);
        id = response.body.user._id;
    });

    it("should delete the user", async () => {
        const response = await request(app)
            .delete("/api/users/" + id)
            .auth(token, { type: "bearer" })
            .expect(200);
        console.log(response.body);
    });
});

// describe("stores and review creation", () => {
//     var token = "";
//     var id = "";
//     var tokenAdmin = "";
//     var idAdmin = "";
//     var idStore = "";
//     var tokenUser = "";
//     var idUser = "";
//     var idReview = "";

//     it("should login a admin", async () => {
//         const response = await request(app)
//             .post("/api/user/login")
//             .send({ email: "admin@e.com", password: "adminadmin" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.user.role).toEqual("admin");

//         tokenAdmin = response.body.token.token;
//         idAdmin = response.body.user._id;
//     });

//     it("should register a user", async () => {
//         const response = await request(app)
//             .post("/api/user/register")
//             .send({
//                 name: "Menganito",
//                 birthdate: "2002-06-24",
//                 email: "meganito@test.com",
//                 password: "HolaMundo.01",
//             })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.user.name).toEqual("Menganito");
//         expect(response.body.user.email).toEqual("meganito@test.com");
//         expect(response.body.user.role).toEqual("user");
//     });

//     it("should login a user", async () => {
//         const response = await request(app)
//             .post("/api/user/login")
//             .send({ email: "meganito@test.com", password: "HolaMundo.01" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.user.name).toEqual("Menganito");
//         expect(response.body.user.email).toEqual("meganito@test.com");
//         expect(response.body.user.role).toEqual("user");

//         token = response.body.token.token;
//         id = response.body.user._id;
//     });

//     it("should change the role to owner", async () => {
//         const response = await request(app)
//             .patch("/api/user/beowner")
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body).toEqual(true);
//     });

//     it("should check that the user is owner", async () => {
//         const response = await request(app)
//             .get("/api/user")
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.role).toEqual("owner");
//     });

//     it("should register a store", async () => {
//         const response = await request(app)
//             .post("/api/store")
//             .send({
//                 name: "store",
//                 cif: "12345",
//                 location: "madrid",
//                 email: "store@email.com",
//                 phone: "123223432",
//                 activity: "sell",
//             })
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.name).toEqual("store");

//         idStore = response.body._id;
//     });

//     it("should not return the store", async () => {
//         const response = await request(app)
//             .get("/api/store/owned/" + idStore)
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body).toEqual({});
//     });

//     it("should authorize a store", async () => {
//         const response = await request(app)
//             .patch("/api/store/authorize/" + idStore)
//             .auth(tokenAdmin, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body).toEqual(true);
//     });

//     it("should return the store", async () => {
//         const response = await request(app)
//             .get("/api/store/owned/" + idStore)
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.name).toEqual("store");
//     });

//     it("should update the webpage", async () => {
//         const response = await request(app)
//             .patch("/api/store/webpage/" + idStore)
//             .send({
//                 webpage: [
//                     { type: "text", col: 2, content: "hola" },
//                     { type: "text", col: 2, content: "que" },
//                     { type: "text", col: 3, content: "pasa" },
//                 ],
//             })
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body).toEqual(true);
//     });

//     it("should update the store", async () => {
//         const response = await request(app)
//             .put("/api/store/owned/" + idStore)
//             .send({ name: "storeUpdate" })
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body).toEqual(true);
//     });

//     it("should return the store with the new changes", async () => {
//         const response = await request(app)
//             .get("/api/store/owned/" + idStore)
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.name).toEqual("storeUpdate");
//     });

//     it("should register a user", async () => {
//         const response = await request(app)
//             .post("/api/user/register")
//             .send({
//                 name: "userreview",
//                 birthdate: "2002-06-24",
//                 email: "userreview@test.com",
//                 password: "HolaMundo.01",
//             })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.user.name).toEqual("userreview");
//         expect(response.body.user.email).toEqual("userreview@test.com");
//         expect(response.body.user.role).toEqual("user");

//         tokenUser = response.body.token.token;
//         idUser = response.body.user._id;
//     });

//     it("should not create a review with bad points 1", async () => {
//         const response = await request(app)
//             .post("/api/review")
//             .send({ store: idStore, msg: "mensaje de ejemplo", points: 6 })
//             .auth(tokenUser, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(403);
//     });

//     it("should not create a review with bad points 2", async () => {
//         const response = await request(app)
//             .post("/api/review")
//             .send({ store: idStore, msg: "mensaje de ejemplo", points: 0 })
//             .auth(tokenUser, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(403);
//     });

//     it("should create a review", async () => {
//         const response = await request(app)
//             .post("/api/review")
//             .send({ store: idStore, msg: "mensaje de ejemplo", points: 3 })
//             .auth(tokenUser, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.msg).toEqual("mensaje de ejemplo");
//         expect(response.body.points).toEqual(3);
//         idReview = response.body._id;
//     });

//     it("should not create another review", async () => {
//         const response = await request(app)
//             .post("/api/review")
//             .send({ store: idStore, msg: "mensaje de ejemplo", points: 3 })
//             .auth(tokenUser, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(403);
//     });

//     it("should update the review", async () => {
//         const response = await request(app)
//             .put("/api/review/" + idReview)
//             .send({ store: idStore, msg: "mensaje de actualizado", points: 5 })
//             .auth(tokenUser, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body).toEqual(true);
//     });

//     it("should get all the reviews and check the update", async () => {
//         const response = await request(app)
//             .get("/api/review/user")
//             .auth(tokenUser, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(
//             response.body.filter((value: any) => value._id === idReview)[0].msg
//         ).toEqual("mensaje de actualizado");
//     });

//     it("should unauthorize a store", async () => {
//         const response = await request(app)
//             .patch("/api/store/unauthorize/" + idStore)
//             .auth(tokenAdmin, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body).toEqual(true);
//     });

//     it("should return nothing", async () => {
//         const response = await request(app)
//             .get("/api/store/owned/" + idStore)
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body).toEqual({});
//     });

//     it("should change the role to user", async () => {
//         const response = await request(app)
//             .patch("/api/user/beuser")
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body).toEqual(true);
//     });

//     it("should return 401 couse i am user", async () => {
//         const response = await request(app)
//             .patch("/api/user/beuser")
//             .auth(token, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(401);
//     });

//     it("should delete a user by admin", async () => {
//         const response = await request(app)
//             .delete("/api/user/" + id)
//             .auth(tokenAdmin, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.acknowledged).toEqual(true);
//     });
//     it("should delete a user by admin", async () => {
//         const response = await request(app)
//             .delete("/api/user/" + idUser)
//             .auth(tokenAdmin, { type: "bearer" })
//             .set("Accept", "application/json")
//             .expect(200);
//         expect(response.body.acknowledged).toEqual(true);
//     });
// });

// //

// describe("storage", () => {
//     const path = require("path");
//     const filePath = path.join(__dirname, "test.txt");

//     var id = "";
//     var url = "";

//     it("should upload a file", async () => {
//         const response = await request(app)
//             .post("/api/storage") // Replace with your API endpoint
//             .attach("file", filePath)
//             .expect(200);
//         id = response.body._id;
//         url = response.body.url;
//     });

//     it("should get uploaded a file", async () => {
//         const response = await request(app)
//             .get("/api/storage/" + id) // Replace with your API endpoint
//             .expect(200);
//         expect(response.body.url).toEqual(url);
//     });

//     it("should delete the file", async () => {
//         await request(app)
//             .delete("/api/storage/" + id) // Replace with your API endpoint
//             .expect(200);
//     });
// });
