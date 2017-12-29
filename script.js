var csv = require('csvtojson');
var fs = require('fs');
var path = require('path');

const convertCSVToJSON = (pathF = 'file.csv') => {

    const renamePath = (inputPath) => {
        console.log('renaming ', inputPath, ' to .json...');
        const ext = path.extname(inputPath);
        if (ext !== '') {
            inputPath = inputPath.slice(0, -ext.length);
        }
        const returnPath = inputPath + '.json';
        console.log('File will be converted to ', returnPath);
        return returnPath;
    }
    const fetchCSV = (path) => {
        let jsonStrArr = '[' + '\n';
        csv().fromFile(filePath)
        .on('data', (data) => {
            const jsonStr = data.toString('utf8');
            jsonStrArr += jsonStr + ',';
        })
        .on('end', () => {
            jsonStrArr = jsonStrArr.slice(jsonStrArr, -1);
            jsonStrArr += ']';
            fs.writeFileSync(renamePath(filePath), jsonStrArr);
        });
    }
    const filePath = path.join(__dirname, pathF);
    fetchCSV(filePath);
}
convertCSVToJSON(process.argv[2]);