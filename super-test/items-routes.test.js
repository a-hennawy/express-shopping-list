process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const Item = require("../itemsClass");
let items = require("../fakeDb");

// let shark = { name: "shark", price: 3.4 };
// let teeth = { name: "teeth", price: 2.55 };

beforeEach(async () => {
  //   items.push(shark);
  new Item("shark", 200);

  //   items.push(teeth);
});

afterEach(async () => {
  items.length = 0;
});

describe("testing the /items route", () => {
  test("Get the list of items in the fakeDB file", async () => {
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items: [{ name: "shark", price: 200 }] });
  });

  test("Post an item to items in fakeDB file", async () => {
    const resp = await request(app)
      .post("/items")
      .send({ name: "teeth", price: 9.23 });

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      added: { name: "teeth", price: 9.23 },
    });
  });
});

describe("testing the /items/:name route", () => {
  test("Get an item from fakeDB", async () => {
    const resp = await request(app).get("/items/shark");

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      item: { name: "shark", price: 200 },
    });
  });

  test("Patch an item from fakeDB", async () => {
    const resp = await request(app).patch("/items/shark").send({
      name: "string",
      price: 3.4,
    });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      newItem: {
        name: "string",
        price: 3.4,
      },
    });
  });

  test("Delete an item from fakeDB", async () => {
    const resp = await request(app).delete("/items/shark");

    // expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      message: "Item shark deleted",
    });
  });
});
