/// <reference types="cypress" />

//PATHS
const FILE_1_PATH = "files/file1.pdf";
const FILE_2_PATH = "files/file2.pdf";
const FILE_3_PATH = "files/file3-notEquals.pdf";

describe("Exercise 1:", async () => {
  it("Should compare between 2 equal PDF files", () => {
    cy.readFile(FILE_1_PATH, "base64").then((file1) => {
      cy.readFile(FILE_2_PATH, "base64").then((file2) => {
        cy.log("Are the files equal?: " + String(file1 === file2));
      });
    });
  });

  it("Should compare between 2 unequal PDF files", () => {
    cy.readFile(FILE_1_PATH, "base64").then((file1) => {
      cy.readFile(FILE_3_PATH, "base64").then((file2) => {
        cy.log("Are the files equal?: " + String(file1 === file2));
      });
    });
  });
});
