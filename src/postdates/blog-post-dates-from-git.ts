import timestamps from "./timestamps.json";

export class Timestamps {
    created: Date;
    modified: Date;
    constructor(createdTimeStampSeconds: number,
                modifiedTimeStampSeconds: number) {
        this.created = new Date(new Date(createdTimeStampSeconds).toDateString());
        this.modified = new Date(new Date(modifiedTimeStampSeconds).toDateString());
    }

    public getCreationDate(): Date {
        return this.created;
    }
    public getModificationDate(): Date {
            return this.modified;
    }
}

export function getDatesForFile(markdownFilename: string): Timestamps | null {
    const filenameKey = Object.keys(timestamps).find(gitTimestampsFilename => markdownFilename.endsWith(gitTimestampsFilename));
    if (!filenameKey) {
        return null
    }

    // @ts-ignore
    const datesFromGitFile = timestamps[filenameKey];
    return new Timestamps(datesFromGitFile.created * 1000,
                          datesFromGitFile.modified * 1000);

}
