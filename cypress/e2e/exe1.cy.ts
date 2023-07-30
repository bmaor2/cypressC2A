/// <reference types="cypress" />

//PATHS
const FILE_1_PATH = "files/file1.pdf";
const FILE_2_PATH = "files/file2.pdf";

describe("Exercise 1:", () => {
  it("Should compare and assert between 2 PDF files", async () => {
    cy.readFile(FILE_1_PATH).then((file1) => {
      cy.readFile(FILE_2_PATH).then((file2) => {
        expect(file1).to.equal(file2);
      });
    });
  });
});
