import { FileStream, Service } from "egg";
import * as sharp from "sharp";

const steamToBuffer = (stream: FileStream): Promise<Buffer> => {
  return new Promise((resolve) => {
    const buffers: Buffer[] = [];
    stream.on("data", (buffer) => {
      buffers.push(buffer as Buffer);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
  });
};

export default class Image extends Service {
  public async compress(stream: FileStream): Promise<Buffer> {
    const buffer = await steamToBuffer(stream);
    return sharp(buffer)
      .png({
        quality: 99,
        compressionLevel: 9,
        adaptiveFiltering: true,
        force: true,
      })
      .toBuffer();
  }

}
