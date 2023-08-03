//URLS
const MAIN_URL = "https://www.demoblaze.com";
const API_PATH = "https://api.demoblaze.com/bycat";
const ITEM_URL = "https://www.demoblaze.com/prod.html?idp_=";

//SELECTORS
const SELECTORS = {
  HEADER_LOGIN_BUTTON: "[id=login2]",
  HEADER_SHOW_CART_BUTTON: "[id=cartur]",
  USERNAME_INPUT: "[id=loginusername]",
  PASSWORD_INPUT: "[id=loginpassword]",
  LOGIN_SUBMIT_BUTTON: `[onclick="logIn()"]`,
  PHONE_GROUP_SELECTOR: `[onclick="byCat('phone')"]`,
};

const VALID_USER = {
  USERNAME: "automatedUser26@example.com",
  PASSWORD: "4r4nd0mp4ssw0rd",
};

const GET_ALL_PHONES_REQUEST = {
  method: "POST",
  url: API_PATH,
  body: { cat: "phone" },
};

type PhonesArray = {
  id: number;
  cat: string;
  price: number;
}[];

describe("Exercise 2", () => {
  it("Task 1, Should browse 'https://www.demoblaze.com/'", () => {
    cy.visit(MAIN_URL);
  });

  it("Task 2, Should Login", () => {
    cy.visit(MAIN_URL);
    cy.get(SELECTORS.HEADER_LOGIN_BUTTON).click();
    cy.wait(500);
    cy.get(SELECTORS.USERNAME_INPUT).click().type(VALID_USER.USERNAME);
    cy.wait(500);
    cy.get(SELECTORS.PASSWORD_INPUT).click().type(VALID_USER.PASSWORD);
    cy.get(SELECTORS.LOGIN_SUBMIT_BUTTON).click();
  });

  it("Task 3, Should Add the cheapest phone to cart", () => {
    cy.visit(MAIN_URL);
    cy.get(SELECTORS.HEADER_LOGIN_BUTTON).click();
    cy.wait(500);
    cy.get(SELECTORS.USERNAME_INPUT).click().type(VALID_USER.USERNAME);
    cy.wait(500);
    cy.get(SELECTORS.PASSWORD_INPUT).click().type(VALID_USER.PASSWORD);
    cy.get(SELECTORS.LOGIN_SUBMIT_BUTTON).click();
    cy.wait(500);
    cy.get(SELECTORS.PHONE_GROUP_SELECTOR).click(); // To be sure that I'm at the right place
    cy.wait(500);

    cy.request(GET_ALL_PHONES_REQUEST).then((response) => {
      //Destruct the Items Array from the response Object
      const { Items }: { Items: PhonesArray } = response.body;

      let minPrice: number = Infinity; // Just for implement the number to the biggest number

      Items.map((item) => {
        minPrice = Math.min(minPrice, item.price);
        return item;
      }); // Gets the cheapest phone price

      const cheapestPhone = Items.find((item) => item.price === minPrice);
      const { id: cheapestPhoneId } = cheapestPhone!; // Gets the cheapest phone id

      cy.visit(`${ITEM_URL}${cheapestPhoneId}`); // Navigate to the cheapest phone page
      cy.get(`[onClick="addToCart(${cheapestPhoneId})"]`).click(); // Click the Add To Cart button
    });

    cy.get(SELECTORS.HEADER_SHOW_CART_BUTTON).click();
  });
});
