export default class Code {
    readonly language: string;
    readonly source: string;

    inputs?: Array<string>;

    public get safeSource() { return this.source };
    public get safeLanguage() { return this.language }

    public toCodeBlock(): string {
        return "```" + this.safeLanguage + '\n' + this.safeSource + "```";
    }
};
