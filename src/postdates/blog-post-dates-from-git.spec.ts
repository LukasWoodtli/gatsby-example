import {getDatesForFile, Timestamps } from "./blog-post-dates-from-git";


describe("Import timestamps from JSON file", () => {
    it("should get the date", () => {
        const filename = "a/b/content/blog_post_1.md"
        const dates: Timestamps | null = getDatesForFile(filename);
        expect(dates).not.toBeNull();
        expect((<Timestamps>dates).created).toEqual(new Date(2022, 2, 22));
    });
}) ;
