const  { addDatesToFiles } = require( "./gatsby-node");

describe("Combine file information with dates", () => {
    it("successful", () => {
        const dates = {
            "bla/bli": {created: 1, modified: 2}
        }

        const files = [
            {filepath: "/foo/bar/bla/bli"}
        ]
        const enrichedFiles = addDatesToFiles(dates, files);
        expect(enrichedFiles.length).toEqual(1);

    })
    it("unsuccessful", () => {
        const dates = {
            "bla/bla": {created: 1, modified: 2}
        }

        const files = [
            {filepath: "/foo/bar/bla/bli"}
        ]

        expect(() => addDatesToFiles(dates, files))
            .toThrowError("No dates found for file '/foo/bar/bla/bli'. Please update file with dates.");
    })
})
