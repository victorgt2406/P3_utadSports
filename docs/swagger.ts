import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Proyecto Actividades Deportivas U-tad 2022-2023 | U-tadSports",
            version: "0.1.0",
            description:
                "This is a CRUD API application made with Express and documented with Swagger",
            license: {
                name: "U-tadSports",
                url: "http://localhost:3000",
            },
            contact: {
                name: "u-tad",
                url: "https://u-tad.com",
                email: "victor.gutierrez@live.u-tad.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
            schemas: {
                users: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        _id: {
                            type: "string",
                            example: "6074fb9d7e8466001570e7d8",
                        },
                        icon: {
                            type: "string",
                            example: "https://example.com/icon.png",
                        },
                        name: {
                            type: "string",
                            example: "John Doe",
                        },
                        email: {
                            type: "string",
                            example: "johndoe@example.com",
                        },
                        password: {
                            type: "string",
                            example: "password123",
                        },
                        birthdate: {
                            type: "string",
                            format: "date",
                            example: "1990-01-01",
                        },
                        location: {
                            type: "string",
                            example: "New York",
                        },
                        interests: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            example: ["music", "sports"],
                        },
                        offers: {
                            type: "boolean",
                            example: true,
                        },
                        role: {
                            type: "string",
                            enum: ["user", "admin", "owner"],
                            example: "user",
                        },
                    },
                },
                store: {
                    type: "object",
                    required: [
                        "owner",
                        "name",
                        "cif",
                        "location",
                        "email",
                        "phone",
                        "activity",
                    ],
                    properties: {
                        owner: {
                            type: "string",
                            example: "6074fb9d7e8466001570e7d8",
                        },
                        name: {
                            type: "string",
                            example: "Best Store",
                        },
                        cif: {
                            type: "string",
                            example: "A12345678",
                        },
                        location: {
                            type: "string",
                            example: "Madrid",
                        },
                        email: {
                            type: "string",
                            example: "store@example.com",
                        },
                        phone: {
                            type: "string",
                            example: "+34911234567",
                        },
                        activity: {
                            type: "string",
                            example: "Clothing",
                        },
                        interests: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            example: ["fashion", "accessories"],
                        },
                        description: {
                            type: "string",
                            example:
                                "A great store for all your fashion needs.",
                        },
                        authorized: {
                            type: "boolean",
                            example: false,
                        },
                        webpage: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    type: {
                                        type: "string",
                                        enum: ["picture", "text"],
                                    },
                                    col: {
                                        type: "integer",
                                        format: "int32",
                                        minimum: 0,
                                        maximum: 12,
                                    },
                                    content: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
                review: {
                    type: "object",
                    required: ["user", "store", "msg", "points"],
                    properties: {
                        user: {
                            type: "object",
                            required: ["_id", "icon", "name"],
                            properties: {
                                _id: {
                                    type: "string",
                                    example: "6074fb9d7e8466001570e7d8",
                                },
                                icon: {
                                    type: "string",
                                    example: "https://example.com/icon.png",
                                },
                                name: {
                                    type: "string",
                                    example: "John Doe",
                                },
                            },
                        },
                        store: {
                            type: "string",
                            example: "6074fb9d7e8466001570e7d8",
                        },
                        msg: {
                            type: "string",
                            example: "Great store! Loved the products.",
                        },
                        images: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            example: [
                                "https://example.com/image1.jpg",
                                "https://example.com/image2.jpg",
                            ],
                        },
                        points: {
                            type: "integer",
                            format: "int32",
                            minimum: 1,
                            maximum: 5,
                            example: 4,
                        },
                        blocked: {
                            type: "boolean",
                            example: false,
                        },
                    },
                },
                storage: {
                    type: "object",
                    required: ["url", "filename"],
                    properties: {
                        url: {
                            type: "string",
                            example:
                                "http://localhost:3000/storage/randomAvatar/2.png",
                        },
                        filename: {
                            type: "string",
                            example: "2.png",
                        },
                    },
                },
            },
        },
    },
    apis: ["./dist/routes/*.js"],
};

export default swaggerJsdoc(options);
