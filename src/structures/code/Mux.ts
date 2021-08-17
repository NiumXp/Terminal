import Code from "./Code";
import Result from "./Result";
import Adapter from "./adapters/Adapter";
import BaseAdapter from "./adapters/BaseAdapter";

export default class Mux {
    static TestAdapter: Adapter = new BaseAdapter();

    private adapter(lang: string): Adapter {
        lang = lang.toLowerCase();

        if (["python", "py"].includes(lang))
            return Mux.TestAdapter;

        if (["javascript", "js"].includes(lang))
            return Mux.TestAdapter;

        return null;
    }

    public async execute(code: Code): Promise<Result> {
        const adapter = this.adapter(code.language);
        const result  = await adapter.execute(code);

        return result
    };
};
