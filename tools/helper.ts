
export function addDatesToFiles(dates: any, files: any) {
    return files.map((file: any) => {
        const d: string | undefined = Object.keys(dates).find(date => file.filepath.endsWith(date));
        if (!d) throw {name:"File not found", message:`No dates found for file '${file.filepath}'. Please update file with dates.`}
        return {
            ...file,
            ...dates[d]
        };
    });
}
