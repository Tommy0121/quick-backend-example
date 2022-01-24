import { Controller } from "egg";
import * as sendToWormhole from "stream-wormhole";
import { uploadImage } from "../api/image";

type IResultData = {
  errorCode: string;
  message: string;
  results?: {
    id: number;
    url: string;
  };
  success: boolean;
  traceCode: string;
};

type IResponse<T> = {
  success: boolean;
  message: string;
  results: T;
};

export default class ImageController extends Controller {

  public async uploadImage() {
    const { ctx } = this;
    const parts = ctx.multipart();
    let part;
    let compress: boolean = false;
    while ((part = await parts()) != null) {
      if (part.length) {
        // 这里需要确保压缩字段在文件字段前 
        // 正确如下
        //  const formData = new FormData();
        // formData.append("compress", compress ? "1" : "0");
        //   formData.append("image", file, "file.png");
        // 错误如下
        //  const formData = new FormData();
        //  formData.append("image", file, "file.png");
        // formData.append("image", file, "file.png");
        const field = part[0];
        const value = part[1];
        if (field === "compress") {
          compress = value === '1';
        }
      } else {
        if (!part.filename) {
          return;
        }
        // part 是上传的文件流

        if (compress) {
          const buffer = await ctx.service.image.compress(part);
          let result;
          try {
            result = await uploadImage(buffer, part.filename);
          } catch (error) {
            const errorResponse: IResponse<{}> = {
              success: false,
              message: "",
              results: {},
            };
            ctx.body = errorResponse;
            await sendToWormhole(part);
            return;
          }
          const data: IResultData = result.data;
          if (data.success && data.results?.url) {
            const successResponse: IResponse<{ url: string }> = {
              success: true,
              message: "",
              results: {
                url: data.results?.url,
              },
            };
            ctx.body = successResponse;
            return;
          }
        } else {
          let result;
          try {
            result = await uploadImage(part, part.filename);
          } catch (error) {
            const errorResponse: IResponse<{}> = {
              success: false,
              message: "",
              results: {},
            };
            ctx.body = errorResponse;
            await sendToWormhole(part);
            return;
          }
          const data: IResultData = result.data;
          if (data.success && data.results?.url) {
            const successResponse: IResponse<{ url: string }> = {
              success: true,
              message: "",
              results: {
                url: data.results?.url,
              },
            };
            ctx.body = successResponse;
            return;
          }
        }
      }
      await sendToWormhole(part);
    }
    const errorResponse: IResponse<{}> = {
      success: false,
      message: "",
      results: {},
    };
    ctx.body = errorResponse;
  }
  public hello() {
    const { ctx } = this;
    const errorResponse: string = 'hello';
    ctx.body = errorResponse;
  }
}
