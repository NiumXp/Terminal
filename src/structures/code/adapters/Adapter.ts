import Code from "../Code";
import Result from "../Result";

export default interface Adapter {
    execute(code: Code): Promise<Result>;
};
