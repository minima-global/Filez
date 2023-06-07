export function promisfy(fn: any, command: string, arg: any = undefined): any {
  return new Promise((resolve, reject) => {
    if (arg) {
      fn(command, arg, function (response: any) {
        if (response.status) {
          return resolve(response.response);
        }

        return resolve(null);
      });
    } else {
      fn(command, function (response: any) {
        if (response.status) {
          return resolve(response.response);
        }

        return resolve(null);
      });
    }
  });
}

export function deleteFile(fileName: string) {
  return promisfy((window as any).MDS.file.delete, fileName);
}

export function loadFile(fileName: string) {
  return promisfy((window as any).MDS.file.load, fileName);
}

export function saveFile(fileName: string, arg: string | object) {
  return promisfy((window as any).MDS.file.save, fileName, arg);
}
