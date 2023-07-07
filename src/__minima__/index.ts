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

export function downloadFile(path: string, name: string) {
  return new Promise((resolve, reject) => {
    (window as any).MDS.file.loadbinary(path, function (msg: any) {
      try {
        var filedata = msg.response.load.data.substring(2);
        var b64 = (window as any).MDS.util.hexToBase64(filedata);
        var binaryData = (window as any).MDS.util.base64ToArrayBuffer(b64);
        var blob = new Blob([binaryData], { type: 'application/octet-stream' });

        var url = URL.createObjectURL(blob);

        // webview download support
        if (window.navigator.userAgent.includes("Minima Browser")) {

          // @ts-ignore
          return Android.blobDownload(name, filedata);
        }

        // Create a link element
        var link = document.createElement('a');
        link.href = url;
        link.download = name;
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

export default exports;
