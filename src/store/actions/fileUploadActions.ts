import fileUploadService from "../../services/fileUploadService";

export enum ActionTypes {
  UPLOAD_FILE = "UPLOAD_FILE"
}

export function uploadFile({ file, name }) {
  return {
    type: ActionTypes.UPLOAD_FILE,
    payload: fileUploadService.uploadFile({ file, name })
  };
}
