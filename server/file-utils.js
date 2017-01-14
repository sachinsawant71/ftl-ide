const Constants = require('./constants');
const Promise = require('promise');
const fs = require('fs');
const path = require('path');

function getFolderContents(folderPath) {
    return new Promise(function (fulfill, reject) {

        var result = {
            type: Constants.FileStructureTypes.FOLDER,
            label: path.parse(folderPath).base,
            children: []
        };

        fs.readdir(folderPath, (err, files) => {
            var numLeft;
            var filePromises = [];
            if (err) {
                reject({
                    message: 'Failed to get folder contents: ' + folderPath,
                    error: err
                });
            }
            else {
                numLeft = files.length;

                // We have an array of files
                files.forEach(function(itemName, idx) {
                    // run stat
                    var itemPath = folderPath + path.sep + itemName;
                    fs.stat(itemPath, (err, stats) => {
                        numLeft--;
                        if (err) {
                            // Just log?
                            console.warn('Could not get stats for ' + itemPath + '. Skipping.');
                        }
                        else {
                            if (stats.isFile()) {
                                // return a resolved promise
                                filePromises.push(Promise.resolve({
                                    type: Constants.FileStructureTypes.ITEM,
                                    label: itemName
                                }));
                            }
                            else {
                                filePromises.push(getFolderContents(itemPath));
                            }
                        }

                        _checkDone();
                    });
                })
            }

            function _checkDone() {
                if (numLeft === 0) {
                    Promise.all(filePromises)
                    .then(function (childItems) {
                        childItems.sort(function (a, b) {
                            if (a.label < b.label) {
                                return -1;
                            }
                            else if (a.label > b.label) {
                                return 1;
                            }
                            return 0;
                        });

                        result.children = childItems;

                        fulfill(result);
                    });
                }
            }
        });
    });
}

function loadFile(path) {
    return new Promise(function (fulfill, reject) {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject({
                    message: 'Failed to load file ' + path,
                    error: err
                });
            }
            else {
                fulfill(data.toString());
            }
        });
    });
}

function saveFile(path, contents) {
    return new Promise((fulfill, reject) => {
        fs.writeFile(path, contents, (err) => {
            if (err) {
                reject({
                    message: 'Failed to save file ' + path,
                    error: err
                });
            }
            else {
                fulfill();
            }
        });
    });
}

module.exports = {
    getWorkspace: function (workspaceName) {
        return getFolderContents(Constants.Paths.WORKSPACE_DIR + path.sep + workspaceName);
    },
    getFolderContents: getFolderContents,
    loadFile: loadFile,
    saveFile: saveFile,
}
