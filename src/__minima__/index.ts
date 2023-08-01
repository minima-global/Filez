import { isMinimaBrowser } from "../env";

export function maximaSetName(name: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxima action:setname name:${name}`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxima() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxima`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function getAddress() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`getaddress`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxContactAdd(contact: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxcontacts action:add contact:${contact}`, function (response: any) {
      if (response.response && response.response.maxima.delivered) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxContactRemove(contactId: number) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxcontacts action:remove id:${contactId}`, function (response: any) {
      if (response.response.removed) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function maxContacts() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`maxcontacts`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function sql(query: string, singleResult = true) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.sql(query, function (response: any) {
      if (response.status) {
        if (response.rows && singleResult) {
          return resolve(response.rows[0]);
        } else if (response.rows) {
          return resolve(response.rows);
        }

        return resolve(response.status);
      }

      return reject();
    });
  });
}

const exports = {
  maximaSetName,
};

export function makeFolder(folderName: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.makedir(`${folderName}`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function saveBinary(fileName: string, hexData: any) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.savebinary(fileName, hexData, function (response: any) {
      if (response.status) {
        return resolve(true);
      }

      return reject();
    });
  });
}

export function loadBinary(fileName: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.loadbinary(fileName, function (response: any) {
      if (response.status) {
        const b64 = (window as any).MDS.util.hexToBase64(response.response.load.data);
        const src = 'data:image/*;base64,' + b64;
        return resolve(src);
      }

      return reject();
    });
  });
}

export function downloadFile(path: string, downloadName: string) {
  return new Promise((resolve, reject) => {
    // webview download support
    // do not load binary
    if (isMinimaBrowser) {

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Android.fileDownload(MDS.minidappuid, path);
      return resolve(true);
    }

    MDS.file.loadbinary(path, function (msg: any) {
      try {

        const filedata = msg.response.load.data.substring(2);
        const b64 = MDS.util.hexToBase64(filedata);
        const binaryData = MDS.util.base64ToArrayBuffer(b64);
        const blob = new Blob([binaryData], { type: 'application/octet-stream' });

        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = downloadName;
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        return resolve(true);
      } catch {
        reject();
      }
    });
  });
}

export function deleteFile(fileName: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.delete(fileName, function (response: any) {
      if (response.status) {
        return resolve(true);
      }

      return reject();
    });
  });
}

export function renameFile(fileName: string, newFileName: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.move(fileName, newFileName, function(response: any) {
      if (response.status) {
        return resolve(true);
      }

      return reject();
    });
  });
}

export function moveFile(originalFilePath: string, newFilePath: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.move(originalFilePath, newFilePath, function(response: any) {
      if (response.status) {
        return resolve(true);
      }

      return reject();
    });
  });
}


export function getStatus() {
  return new Promise((resolve, reject) => {
    (window as any).MDS.cmd(`status`, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function copyToWeb(fileLocation: string, newFilePath: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.copytoweb(fileLocation, newFilePath, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function deleteFromWeb(fileLocation: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.deletefromweb(fileLocation, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function getPath(fileName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.getpath(fileName, function (response: any) {
      if (response.response) {
        return resolve(response.response);
      }

      return reject();
    });
  });
}

export function logDownload(filePath: string) {
  return new Promise((resolve) => {
    try {
      (window as any).MDS.sql(`INSERT INTO downloaded (file_path) VALUES ('${filePath}')`, function () {
        return resolve(true);
      });
    } catch (e) {
      console.log(e);
    }
  });
}

export function getDownloads() {
  return new Promise((resolve) => {
    (window as any).MDS.sql(`SELECT * FROM downloaded`, function (response: any) {
      if (response.status) {
        return resolve(response.rows);
      }

      return resolve([]);
    });
  });
}

export function clearDownload(filePath: string) {
  return new Promise((resolve) => {
    (window as any).MDS.sql(`DELETE FROM downloaded WHERE file_path = '${filePath}'`, function () {
      return resolve(true);
    });
  });
}

export default exports;
