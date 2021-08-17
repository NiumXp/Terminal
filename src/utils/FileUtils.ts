import { readdirSync, statSync } from 'fs';
import { extname, join, parse, resolve } from 'path';

export default class FileUtils {
  static filename = (filepath: string): string => parse(filepath).name;
  
  static async reloadFile<A>(filepath: string, callback: (file: A, dir: string) => Promise<void>): Promise<void> {
    const directory = resolve(filepath);

    delete require.cache[directory];

    await callback((await import(directory)).default, directory);
  }

  static readDirectory<T>(dir: string, callback: (arch: T, pathToArch: string) => void): void {
    FileUtils.readdirRecursive(dir)
      .map(async (filepath: string) => callback((await import(resolve(filepath))).default, filepath));
  }

  static readdirRecursive(dir: string): string[] {
    return readdirSync(dir).reduce<string[]>((p, file) => {
      const filepath = join(dir, file);
      const validExtensions = ['.ts', '.js'];

      if (statSync(filepath).isDirectory()) return [...p, ...FileUtils.readdirRecursive(filepath)];
      if (!validExtensions.includes(extname(filepath))) return p;

      return [...p, filepath];
    }, []);
  }
}
