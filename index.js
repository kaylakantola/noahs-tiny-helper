const es = require('event-stream')
const fs = require('fs');
const fse = require('fs-extra')
const {startsWith, replace} = require('ramda')

function lineFilter(line) {
    const startsWithTab = startsWith("\t", line)
    const isFrameSeconds = line === '\tFrame\tseconds'
    const isntUselessHeader = !line.includes('Units') && !line.includes('Source') && !line.includes('Aspect Ratio')
    const isNumber = typeof parseInt(line) === 'number'
    const lineIsOk = startsWithTab && isntUselessHeader && (isFrameSeconds || isNumber)
    return lineIsOk
}

function lineEditor(line) {
    const edited = replace('\t', '', line)
    return edited
}

function readAndWriteFile({inputPath, outputPath}){
    var s = fs.createReadStream(inputPath)
        .pipe(es.split(/(\r?\n)/))
        .pipe(es.filterSync(lineFilter))
        .pipe(es.mapSync(lineEditor))
        .pipe(es.join("\r\n"))
        .pipe(fs.createWriteStream(outputPath))
        .on('error', function (err) {
            console.log('Error while reading file.', err);
        })
        .on('end', function () {
            console.log('Read entire file.');
        })
}

function main() {
    const date = Date.now()
    const outputDir = `./output/${date}`
    fse.ensureDir(outputDir);

    fs.readdir("./input", (err, files) => {
        return files.forEach(file => {
            const inputPath = `./input/${file}`
            const oldFileName = file.split(".")[0]
            const outputPath = `${outputDir}/${oldFileName}_for-c4d.txt`
            return readAndWriteFile({inputPath, outputPath})
        })
    })
    console.log(`Done! Find your results in: ${outputDir}`)
}

main()
