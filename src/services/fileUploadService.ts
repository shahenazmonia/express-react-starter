import baseRequest from "../_core/baseRequest";

const FileUploadService = {
  uploadFile: ({ file, name }) => baseRequest.uploadFile("/uploadFile", file, name)
};

export default FileUploadService;
