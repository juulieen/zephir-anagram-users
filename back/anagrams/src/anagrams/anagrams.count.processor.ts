import { createReadStream } from 'fs';
import { createInterface } from 'readline';

const anagramsInFileToAnagramsMapCount = async (
  filename: string,
): Promise<Map<string, number>> => {
  const count = new Map<string, number>();
  const rl = createInterface({
    input: createReadStream(filename),
  });
  for await (const line of rl) {
    const key = line.split('').sort().join('');
    if (count.has(key)) {
      count.set(key, count.get(key) + 1);
    } else {
      count.set(key, 1);
    }
  }
  console.log(count);
  return count;
};

async function toto(job: any, cb) {
  const result = await anagramsInFileToAnagramsMapCount(job.data.fileName);
  console.log('result', JSON.stringify(Object.fromEntries(result)));
  cb(null, JSON.stringify(Object.fromEntries(result)));
}

export default toto;
