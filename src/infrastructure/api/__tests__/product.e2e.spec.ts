import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Coca-Cola",
        price: 10,
        type: "a",
      });

      console.log(response.error)

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Coca-Cola");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Coca-Cola Zero",
        price: 7.5,
        type: "a",
      });
    expect(response.status).toBe(200);


    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Coca-Cola",
        price: 7.5,
        type: "b",
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product")
    .set("Accept", "application/json")
    .send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Coca-Cola Zero");
    expect(product.price).toBe(7.5);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Coca-Cola");
    expect(product2.price).toBe(15);

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Coca-Cola</name>`);
    expect(listResponseXML.text).toContain(`<price>7.5</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Coca-Cola Zero</name>`);
    expect(listResponseXML.text).toContain(`<price>15</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);

  });
});
