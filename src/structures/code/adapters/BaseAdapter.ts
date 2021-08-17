import Code from "../Code";
import Result from "../Result";

export default class BaseAdapter {
    private url!: string;
    private method!: string;
    private headers!: Headers;

    public async execute(code: Code): Promise<Result> {
        return null;
    }
};
